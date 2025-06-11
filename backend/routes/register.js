const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/adduser', (req, res) => {
  const {
    title,
    firstName,
    lastName,
    email,
    gender,
    nameroleId,
    subroleId,
  } = req.body;

  if (!firstName || !lastName || !email || !gender) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const username = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}.${lastName.slice(0, 2).toLowerCase()}`;
  const nameroleIdFormatted = nameroleId ? nameroleId.toString() : null;
  const subroleIdFormatted = subroleId ? subroleId.toString() : null;

  // Map title to Thai title_name
  let titleName = null;
  if (title) {
    if (title.toLowerCase() === 'mr') titleName = 'นาย';
    else if (title.toLowerCase() === 'ms') titleName = 'นาง';
    else if (title.toLowerCase() === 'mrs') titleName = 'นางสาว';
  }

  const getUserCountSql = `SELECT MAX(user_id) as max_id FROM users;`;

  db.query(getUserCountSql, (err, result) => {
    if (err) {
      console.error('Error fetching user count:', err);
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' });
    }

    const newUserId = (result[0].max_id || 0) + 1;

    const insertUserSql = `
      INSERT INTO users (user_id, username, password, title_name, title_name_en, f_name_en, l_name_en, email, sex, namerole_id, subrole_id, status, progress)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      newUserId,
      username,
      'Depa1234',
      titleName,
      title || null,
      firstName,
      lastName,
      email,
      gender,
      nameroleIdFormatted,
      subroleIdFormatted,
      'T',
      '0',
    ];

    db.query(insertUserSql, values, (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสมัครบัญชี' });
      }

      // เพิ่มข้อมูลในตาราง addresses
      const insertAddressSql = `INSERT INTO addresses (address_id, user_id) VALUES (?, ?)`;
      const insertAddressValues = [newUserId, newUserId]; // ใช้ user_id เดียวกันสำหรับ address_id
      db.query(insertAddressSql, insertAddressValues, (err, result) => {
        if (err) {
          console.error('Error inserting address:', err);
          return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูลที่อยู่' });
        }

        // เพิ่มข้อมูลในตาราง education
        const insertEducationSql = `INSERT INTO education (education_id, user_id) VALUES (?, ?)`;
        const insertEducationValues = [newUserId, newUserId];
        db.query(insertEducationSql, insertEducationValues, (err, result) => {
          if (err) {
            console.error('Error inserting education:', err);
            return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูลการศึกษา' });
          }

          // เพิ่มข้อมูลในตาราง langsp
          const insertLangspSql = `INSERT INTO langsp (langsp_id, user_id) VALUES (?, ?)`;
          const insertLangspValues = [newUserId, newUserId];
          db.query(insertLangspSql, insertLangspValues, (err, result) => {
            if (err) {
              console.error('Error inserting langsp:', err);
              return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูลภาษา' });
            }

            // เพิ่มข้อมูลในตาราง otherfiles
            const insertOtherFilesSql = `INSERT INTO otherfiles (other_files_id, user_id) VALUES (?, ?)`;
            const insertOtherFilesValues = [newUserId, newUserId];
            db.query(insertOtherFilesSql, insertOtherFilesValues, (err, result) => {
              if (err) {
                console.error('Error inserting otherfiles:', err);
                return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูลไฟล์อื่นๆ' });
              }

              // เพิ่มข้อมูลในตาราง relation
              const insertRelationSql = `INSERT INTO relation (relation_id, user_id) VALUES (?, ?)`;
              const insertRelationValues = [newUserId, newUserId];
              db.query(insertRelationSql, insertRelationValues, (err, result) => {
                if (err) {
                  console.error('Error inserting relation:', err);
                  return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูลความสัมพันธ์' });
                }

                // ส่งผลลัพธ์สำเร็จ
                res.status(201).json({
                  message: 'สมัครบัญชีสำเร็จและเพิ่มข้อมูลสำเร็จ!',
                  userId: newUserId,
                  username,
                });
              });
            });
          });
        });
      });
    });
  });
});

module.exports = router;
