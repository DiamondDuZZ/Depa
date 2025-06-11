const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/getAll", (req, res) => {
  const sql =
    "SELECT * FROM users JOIN nameroles ON users.namerole_id = nameroles.namerole_id JOIN departments ON nameroles.depart_id = departments.depart_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    } else {
      res.status(200).json(results);
    }
  });
});
router.get("/gethname", (req, res) => {
  const sql =
    "SELECT * FROM users JOIN nameroles ON users.namerole_id = nameroles.namerole_id JOIN departments ON nameroles.depart_id = departments.depart_id WHERE status = 'L'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    } else {
      res.status(200).json(results);
    }
  });
});
router.get("/gethorm", (req, res) => {
  const sql =
    "SELECT * FROM users JOIN nameroles ON users.namerole_id = nameroles.namerole_id JOIN departments ON nameroles.depart_id = departments.depart_id WHERE status = 'L'or status = 'M'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    } else {
      res.status(200).json(results);
    }
  });
});
router.get("/getHr", (req, res) => {
  const sql =
    "SELECT * FROM users JOIN nameroles ON users.namerole_id = nameroles.namerole_id JOIN departments ON nameroles.depart_id = departments.depart_id JOIN relation ON users.user_id = relation.user_id WHERE status = 'T'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    } else {
      res.status(200).json(results);
    }
  });
});
// 🔹 API ดึงข้อมูลผู้ใช้ + ที่อยู่ + การศึกษา + ภาษา
router.post("/getUser", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "กรุณาส่ง userId" });
  }

  const userSql = "SELECT * FROM users WHERE user_id = ?";
  db.query(userSql, [userId], (err, userResult) => {
    if (err) {
      console.error("Error querying user:", err);
      return res
        .status(500)
        .json({
          success: false,
          message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
        });
    }

    if (userResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "ไม่พบข้อมูลสำหรับ id ที่ระบุ" });
    }

    const user = userResult[0];
    const addressSql = "SELECT * FROM addresses WHERE user_id = ?";

    db.query(addressSql, [userId], (err, addressResult) => {
      if (err) {
        console.error("Error querying addresses:", err);
        return res
          .status(500)
          .json({
            success: false,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลที่อยู่",
          });
      }

      const permanentAddress =
        addressResult.find((addr) => addr.address_type === "permanent") || {};
      const currentAddress =
        addressResult.find((addr) => addr.address_type === "current") || {};
      const educationSql = "SELECT * FROM education WHERE user_id = ?";

      db.query(educationSql, [userId], (err, educationResult) => {
        if (err) {
          console.error("Error querying education:", err);
          return res
            .status(500)
            .json({
              success: false,
              message: "เกิดข้อผิดพลาดในการดึงข้อมูลการศึกษา",
            });
        }

        const langspSql = "SELECT * FROM langsp WHERE user_id = ?";

        db.query(langspSql, [userId], (err, langspResult) => {
          if (err) {
            console.error("Error querying languages:", err);
            return res
              .status(500)
              .json({
                success: false,
                message: "เกิดข้อผิดพลาดในการดึงข้อมูลภาษา",
              });
          }

          res.status(200).json({
            success: true,
            user,

            addresses: {
              permanent: permanentAddress,
              current: currentAddress,
            },
            education: educationResult,
            languages: langspResult,
          });
        });
      });
    });
  });
});

// 🔹 API อัปเดตข้อมูลผู้ใช้
router.post("/updateUser", (req, res) => {
  const {
    l_name,
    user_id,
    title_name,
    title_name_en,
    f_name,
    f_name_en,
    l_name_en,
    sex,
    nickname,
    birthday,
    nationality,
    id_card_no,
    id_card_expired,
    email,
  } = req.body;

  if (!user_id || !f_name || !l_name) {
    return res.status(400).json({
      success: false,
      message: "กรุณากรอกข้อมูลที่จำเป็น (user_id, f_name, l_name)",
    });
  }

  const sql = `
    UPDATE users
    SET 
      title_name = ?, 
      title_name_en = ?, 
      f_name = ?, 
      l_name = ?, 
      f_name_en = ?, 
      l_name_en = ?, 
      sex = ?, 
      nickname = ?, 
      birthday = ?, 
      nationality = ?, 
      id_card_no = ?, 
      id_card_expired = ?, 
      email = ?, 
      updated_at = NOW()
    WHERE user_id = ?
  `;

  const values = [
    title_name,
    title_name_en,
    f_name,
    l_name,
    f_name_en,
    l_name_en,
    sex,
    nickname,
    birthday,
    nationality,
    id_card_no,
    id_card_expired,
    email,
    user_id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({
        success: false,
        message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบผู้ใช้ที่ต้องการอัปเดต",
      });
    }
    res.status(200).json({
      success: true,
      message: "อัปเดตข้อมูลสำเร็จ!",
    });
  });
});

// 🔹 API อัปเดตหรือเพิ่มที่อยู่ของผู้ใช้
router.post("/updateAddress", (req, res) => {
  const {
    user_id,
    address_type,
    address_line,
    province,
    amphure,
    tambon,
    zip_code,
    phone_number,
  } = req.body;

  if (!user_id || !address_type) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุ user_id และ address_type",
    });
  }

  const checkSql = `SELECT * FROM addresses WHERE user_id = ? AND address_type = ?`;
  console.log("Phone Number:", phone_number);
  db.query(checkSql, [user_id, address_type], (err, result) => {
    if (err) {
      console.error("Error checking address:", err);
      return res.status(500).json({
        success: false,
        message: "เกิดข้อผิดพลาดในการตรวจสอบที่อยู่",
      });
    }

    if (result.length > 0) {
      const updateSql = `
        UPDATE addresses
        SET 
          address_line = ?, 
          province = ?, 
          amphure = ?, 
          tambon = ?, 
          zip_code = ?, 
          phone_number = ?, 
          updated_at = NOW()
        WHERE user_id = ? AND address_type = ?`;

      const values = [
        address_line,
        province,
        amphure,
        tambon,
        zip_code,
        phone_number,
        user_id,
        address_type,
      ];

      db.query(updateSql, values, (err) => {
        if (err) {
          console.error("Error updating address:", err);
          return res.status(500).json({
            success: false,
            message: "เกิดข้อผิดพลาดในการอัปเดตที่อยู่",
          });
        }

        res.status(200).json({
          success: true,
          message: `อัปเดตที่อยู่ (${address_type}) สำเร็จ!`,
        });
      });
    } else {
      const insertSql = `
        INSERT INTO addresses (user_id, address_type, address_line, province, amphure, tambon, zip_code, phone_number, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;

      const values = [
        user_id,
        address_type,
        address_line,
        province,
        amphure,
        tambon,
        zip_code,
        phone_number,
      ];

      db.query(insertSql, values, (err) => {
        if (err) {
          console.error("Error inserting address:", err);
          return res.status(500).json({
            success: false,
            message: "เกิดข้อผิดพลาดในการเพิ่มที่อยู่",
          });
        }

        res.status(201).json({
          success: true,
          message: `เพิ่มที่อยู่ (${address_type}) สำเร็จ!`,
        });
      });
    }
  });
});

module.exports = router;
