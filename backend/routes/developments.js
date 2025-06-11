const express = require("express");
const router = express.Router();
const db = require("../db");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// 🔥 ตั้งค่าพาธใหม่โดยอ้างอิงจากตำแหน่งโฟลเดอร์ปัจจุบัน
const uploadDir = path.join(__dirname, "../../public/assets/images/acticourse");

// ตรวจสอบว่ามีโฟลเดอร์หรือไม่ ถ้าไม่มีให้สร้างขึ้นมา
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ใช้ timestamp + นามสกุลไฟล์เดิม
  }
});

const upload = multer({ storage });


router.get('/getStatus', (req, res) => {
  const userId = req.query.user_id;
  
  if (!userId) {
    return res.status(400).json({ error: "user_id is required" });
  }

  const query = `
    SELECT course_id, activity_id 
    FROM development 
    WHERE user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching development data:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(200).json(results);
  });
});

router.post('/updateStatus', (req, res) => {
  const { user_id, course_id, activity_id } = req.body;

  console.log("📌 เพิ่มข้อมูล:", { user_id, course_id, activity_id });

  if (!user_id || (!course_id && !activity_id)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const insertSql = `
    INSERT INTO development (user_id, course_id, activity_id, created_at, updated_at) 
    VALUES (?, ?, ?, NOW(), NOW())
  `;
  db.query(insertSql, [user_id, course_id || null, activity_id || null], (err) => {
    if (err) {
      console.error("❌ Error inserting data:", err);
      return res.status(500).send(err);
    }
    console.log("✅ เพิ่มข้อมูลสำเร็จ!");
    return res.json({ message: "Status updated successfully" });
  });
});

// ✅ API สำหรับลบข้อมูล (DELETE)
router.delete('/updateStatus', (req, res) => {
  const { user_id, course_id, activity_id } = req.body;

  console.log("📌 ลบข้อมูล:", { user_id, course_id, activity_id });

  if (!user_id || (!course_id && !activity_id)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let deleteSql, deleteParams;
  if (course_id) {
    deleteSql = `DELETE FROM development WHERE user_id = ? AND course_id = ?`;
    deleteParams = [user_id, course_id];
  } else if (activity_id) {
    deleteSql = `DELETE FROM development WHERE user_id = ? AND activity_id = ?`;
    deleteParams = [user_id, activity_id];
  }

  db.query(deleteSql, deleteParams, (err, result) => {
    if (err) {
      console.error("❌ Error deleting data:", err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Data not found" });
    }
    console.log("✅ ลบข้อมูลสำเร็จ!");
    return res.json({ message: "Status removed successfully" });
  });
});


// ✅ API เพิ่ม Basic Course (อัปโหลดไฟล์)
router.post("/basiccourses", upload.single("image"), (req, res) => {
  console.log("📌 รับคำขอ POST /basiccourses");
  console.log("📦 req.body:", req.body);
  console.log("📂 req.file:", req.file);

  const { name } = req.body;
  const image_url = req.file ? req.file.filename : null; // เก็บเฉพาะชื่อไฟล์

  if (!name) {
    console.error("❌ ขาดข้อมูล course_name");
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = "INSERT INTO basiccourse (course_name, image_url) VALUES (?, ?)";
  db.query(sql, [name, image_url], (err) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.status(201).json({ message: "Course added successfully" });
  });
});


// ✅ API อัปเดต Basic Course
router.put("/basiccourses/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const image_url = req.file ? req.file.filename : null;

  if (!name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let sql, params;
  if (image_url) {
    sql = "UPDATE basiccourse SET course_name = ?, image_url = ? WHERE course_id = ?";
    params = [name, image_url, id];
  } else {
    sql = "UPDATE basiccourse SET course_name = ? WHERE course_id = ?";
    params = [name, id];
  }

  db.query(sql, params, (err) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.status(200).json({ message: "Course updated successfully" });
  });
});

// ✅ 4. ลบ Basic Course
router.delete("/basiccourses/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM basiccourse WHERE course_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  });
});

// ✅ API เพิ่ม Activity
router.post("/activities", upload.single("image"), (req, res) => {
  const { name } = req.body;
  const image_url = req.file ? req.file.filename : null;

  if (!name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = "INSERT INTO activity (activity_name, image_url) VALUES (?, ?)";
  db.query(sql, [name, image_url], (err) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.status(201).json({ message: "Activity added successfully" });
  });
});

// ✅ API อัปเดต Activity
router.put("/activities/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const image_url = req.file ? req.file.filename : null;

  if (!name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let sql, params;
  if (image_url) {
    sql = "UPDATE activity SET activity_name = ?, image_url = ? WHERE activity_id = ?";
    params = [name, image_url, id];
  } else {
    sql = "UPDATE activity SET activity_name = ? WHERE activity_id = ?";
    params = [name, id];
  }

  db.query(sql, params, (err) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.status(200).json({ message: "Activity updated successfully" });
  });
});

// ✅ 8. ลบ Activity
router.delete("/activities/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM activity WHERE activity_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  });
});

module.exports = router;
