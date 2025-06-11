// Login Route
const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/getcomments", (req, res) => {
  const { assignment_id, userIds } = req.query;
  if (!assignment_id || !userIds) {
      return res.status(400).json({ error: "ต้องระบุ assignment_id และ userIds" });
  }

  // แปลง userIds จาก string เป็น array ของตัวเลข
  const userIdsArray = userIds.split(',').map(id => parseInt(id));

  let query = `
    SELECT u.user_id, u.f_name, c.comment_id, c.comment_detail, c.assignment_id
    FROM users u
    LEFT JOIN comment c 
    ON u.user_id = c.user_id AND c.assignment_id = ?
    WHERE u.user_id IN (${userIdsArray.map(() => '?').join(',')})
    ORDER BY FIELD(u.user_id, ${userIdsArray.map(() => '?').join(',')})
  `;

  const queryParams = [assignment_id, ...userIdsArray, ...userIdsArray];

  db.query(query, queryParams, (err, results) => {
      if (err) {
          console.error("❌ Error fetching comments:", err);
          return res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
      }
      res.json(results);
  });
});

router.put("/add", (req, res) => {
  const { user_id, assignment_id, new_comment } = req.body;

  if (!user_id || !assignment_id || !new_comment) {
      return res.status(400).json({ error: "ต้องระบุ user_id, assignment_id และ new_comment" });
  }

  const query = `
    INSERT INTO comment (user_id, assignment_id, comment_detail, created_at, updated_at)
    VALUES (?, ?, ?, NOW(), NOW())
  `;

  db.query(query, [user_id, assignment_id, new_comment], (err, results) => {
      if (err) {
          console.error("❌ Error adding comment:", err);
          return res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มคอมเมนต์" });
      }
      res.json({ success: true, comment_id: results.insertId });
  });
});


router.post("/update", (req, res) => {
  const { comment_id, new_comment } = req.body;

  if (!comment_id || !new_comment) {
      return res.status(400).json({ error: "ต้องระบุ comment_id และ new_comment" });
  }

  const query = `
    UPDATE comment
    SET comment_detail = ?, updated_at = NOW()
    WHERE comment_id = ?
  `;

  db.query(query, [new_comment, comment_id], (err, results) => {
      if (err) {
          console.error("❌ Error updating comment:", err);
          return res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตคอมเมนต์" });
      }
      res.json({ success: true });
  });
});




module.exports = router;
