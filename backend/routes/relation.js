const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/tasks', (req, res) => {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }
  
    // **Query: ตรวจสอบว่า userId มีอยู่ในตาราง relation หรือไม่**
    const query = `
      SELECT u.user_id, u.f_name, d.depart_name, u.created_at, u.progress , r.mentor , r.evaluate_expired, l.level_levels
      FROM users u
      JOIN relation r ON u.user_id = r.user_id
      JOIN nameroles n ON u.namerole_id = n.namerole_id
      JOIN departments d ON n.depart_id = d.depart_id
      JOIN levels l ON n.level_id = l.level_id
      WHERE r.head = ?;
    `;
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("❌ Error fetching data: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: "No data found for this user" });
      }
  
      res.json(results);
    });
  });

router.get('/getmen', (req, res) => {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }
  
    // **Query: ตรวจสอบว่า userId มีอยู่ในตาราง relation หรือไม่**
    const query = `
      SELECT u.user_id, u.f_name, d.depart_name, u.created_at, u.progress , r.mentor , r.evaluate_expired, l.level_levels
      FROM users u
      JOIN relation r ON u.user_id = r.user_id
      JOIN nameroles n ON u.namerole_id = n.namerole_id
      JOIN departments d ON n.depart_id = d.depart_id
      JOIN levels l ON n.level_id = l.level_id
      WHERE r.mentor = ?;
    `;
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("❌ Error fetching data: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: "No data found for this user" });
      }
  
      res.json(results);
    });
  });
  router.get('/getother', (req, res) => {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }
  
    // ค้นหา user_id ของคนที่มี userId อยู่ใน other
    const query = `
      SELECT u.user_id, u.f_name, d.depart_name, u.created_at, u.progress, r.mentor, r.evaluate_expired, l.level_levels
      FROM users u
      JOIN relation r ON u.user_id = r.user_id
      JOIN nameroles n ON u.namerole_id = n.namerole_id
      JOIN departments d ON n.depart_id = d.depart_id
      JOIN levels l ON n.level_id = l.level_id
      WHERE FIND_IN_SET(?, REPLACE(r.other, '|', ','));
    `;
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("❌ Error fetching data: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: "No data found for this user" });
      }
  
      res.json(results);
    });
  });

  
  router.get("/MentorandHead", (req, res) => {
    const userId = req.query.user_id;

    if (!userId) {
        return res.status(400).json({ error: "user_id is required" });
    }

    const query = `
        SELECT 
            u1.f_name AS mentor_name,
            u2.f_name AS head_name
        FROM relation r
        LEFT JOIN users u1 ON r.mentor = u1.user_id
        LEFT JOIN users u2 ON r.head = u2.user_id
        WHERE r.user_id = ?;
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const result = results[0]; // เอาผลลัพธ์แถวแรก
        return res.status(200).json({
            mentor_name: result.mentor_name || "ยังไม่มี",
            head_name: result.head_name || "ยังไม่มี"
        });
    });
});

  
  router.get("/Mentor", (req, res) => {
    const userId = req.query.user_id;
  
    if (!userId) {
      return res.status(400).json({ error: "user_id is required" });
    }
  
    const query = `
      SELECT f_name FROM users WHERE user_id = ?
    `;
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("❌ Database error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // ส่งค่ากลับไปในรูปแบบที่ frontend ใช้งานง่าย
      return res.status(200).json({ name: results[0].f_name });
    });
  });
  router.put('/updateMentor', (req, res) => {
    const { mentorUserId, user_id } = req.body;
  
  
    const sql = "UPDATE relation SET mentor = ? WHERE user_id = ?";
    const values = [mentorUserId, user_id];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("เกิดข้อผิดพลาดในการอัพเดทข้อมูล mentor:", err);
        return res.status(500).json({ error: "ไม่สามารถอัพเดทข้อมูลได้" });
      }
      res.status(200).json({ message: "อัพเดทข้อมูลสำเร็จ", results });
    });
  });
  router.put('/updateMentor', (req, res) => {
    const { mentorUserId, user_id } = req.body;
  
  
    const sql = "UPDATE relation SET mentor = ? WHERE user_id = ?";
    const values = [mentorUserId, user_id];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("เกิดข้อผิดพลาดในการอัพเดทข้อมูล mentor:", err);
        return res.status(500).json({ error: "ไม่สามารถอัพเดทข้อมูลได้" });
      }
      res.status(200).json({ message: "อัพเดทข้อมูลสำเร็จ", results });
    });
  });
  router.put('/updateHead', (req, res) => {
    const { mentorUserId, user_id } = req.body;
  
  
    const sql = "UPDATE relation SET head = ? WHERE user_id = ?";
    const values = [mentorUserId, user_id];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("เกิดข้อผิดพลาดในการอัพเดทข้อมูล mentor:", err);
        return res.status(500).json({ error: "ไม่สามารถอัพเดทข้อมูลได้" });
      }
      res.status(200).json({ message: "อัพเดทข้อมูลสำเร็จ", results });
    });
  });

  router.get("/other/:id", (req, res) => {
    const relationId = req.params.id;
    const sql = "SELECT other FROM relation WHERE user_id = ?";
    
    db.query(sql, [relationId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      if (result.length === 0) return res.json({ other: null });
  
      res.json(result[0]);
    });
  });
  
  // 📌 2. ดึงชื่อจาก users ตามรหัสที่ได้รับ
  router.get("/othername", (req, res) => {
    const { ids } = req.query;
    if (!ids) return res.json([]);
  
    // แปลง "2,3,4" -> [2,3,4] เพื่อใช้ใน SQL
    const userIds = ids.split(",").map(id => parseInt(id, 10));
    const placeholders = userIds.map(() => "?").join(","); // "?, ?, ?"
  
    const sql = `SELECT user_id, f_name FROM users WHERE user_id IN (${placeholders})`;
  
    db.query(sql, userIds, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
  
      res.json(results);
    });
  });
  router.post("/update-other", (req, res) => {
    let { user_id, other } = req.body;
  
    // 🔹 ถ้า `other` เป็น string เช่น "3|1" → แปลงเป็น array [3, 1]
    if (typeof other === "string") {
      other = other.split("|").map((id) => parseInt(id, 10));
    }
  
    // 🔹 ตรวจสอบว่า `other` เป็น array จริงๆ
    if (!Array.isArray(other)) {
      console.error("❌ Error: other ไม่ใช่ array", other);
      return res.status(400).json({ error: "Invalid data: other ต้องเป็น array" });
    }
  
    // ถ้า other เป็น array ว่างเปล่าให้เก็บเป็น NULL
    const updatedOther = other.length > 0 ? other.join("|") : null;
  
    const sql = `UPDATE relation SET other = ? WHERE user_id = ?`;
  
    db.query(sql, [updatedOther, user_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      res.json({ message: "อัปเดตข้อมูลสำเร็จ", other: updatedOther });
    });
  });
  
  
  
  
  
  
module.exports = router;
