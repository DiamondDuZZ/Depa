const express = require('express');
const router = express.Router();
const db = require('../db');

// Login Route
router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
  }

  const sql = 'SELECT user_id, username, password, status, namerole_id, subrole_id, img FROM users WHERE username = ?';

  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', err);
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const user = results[0];

    if (password !== user.password) {
      return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    // ส่งข้อมูลที่ต้องการกลับ
    return res.status(200).json({
      message: 'เข้าสู่ระบบสำเร็จ!',
      user: {
        userId: user.user_id,
        username: user.username,
        status: user.status,
        nameroleId: user.namerole_id,
        subroleId: user.subrole_id,
        img: user.img
      },
    });
  });
});

module.exports = router;
