const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/form1", (req, res) => {
  const sql = "SELECT * FROM criteria WHERE form = 1";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    } else {
      res.status(200).json(results);
    }
  });
});
router.get("/form2", (req, res) => {
  const sql = "SELECT * FROM criteria WHERE form = 2";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    } else {
      res.status(200).json(results);
    }
  });
});

// 📌 ดึงคะแนน commentscore ตาม user_id และ user_probation_id
router.get("/commentscore", (req, res) => {
  const { user_id, user_probation_id } = req.query;
  const sql = `
      SELECT * FROM commentscore WHERE user_id = ? AND user_probation_id = ?
    `;

  db.query(sql, [user_id, user_probation_id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching commentscore:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

// 📌 ดึงคอมเมนต์จากตาราง commentoverall ตาม user_id และ user_probation_id
router.get("/commentoverall", (req, res) => {
  const { user_id, user_probation_id } = req.query;
  const sql = `
      SELECT * FROM commentoverall WHERE user_id = ? AND user_probation_id = ?
    `;

  db.query(sql, [user_id, user_probation_id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching commentoverall:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results.length > 0 ? results[0] : { comment_detail: "" });
  });
});

// 📌 บันทึก/อัปเดตคะแนน commentscore และ commentoverall
router.post("/commentscore", (req, res) => {
  const { user_id, user_probation_id, scores, comment } = req.body;

  const sqlSelect = `
      SELECT * FROM commentscore WHERE user_id = ? AND user_probation_id = ? AND criteria_id = ?
    `;

  const sqlInsert = `
      INSERT INTO commentscore (user_id, user_probation_id, criteria_id, score, created_at, updated_at) 
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

  const sqlUpdate = `
      UPDATE commentscore SET score = ?, updated_at = NOW() 
      WHERE user_id = ? AND user_probation_id = ? AND criteria_id = ?
    `;

  const sqlCommentSelect = `
      SELECT * FROM commentoverall WHERE user_id = ? AND user_probation_id = ?
    `;

  const sqlCommentInsert = `
      INSERT INTO commentoverall (comment_detail, user_id, user_probation_id) 
      VALUES (?, ?, ?)
    `;

  const sqlCommentUpdate = `
      UPDATE commentoverall SET comment_detail = ? WHERE user_id = ? AND user_probation_id = ?
    `;

  // ใช้ Promise.all() เพื่ออัปเดตคะแนนของ commentscore
  const updateScores = scores.map((s) => {
    return new Promise((resolve, reject) => {
      db.query(
        sqlSelect,
        [user_id, user_probation_id, s.id],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }

          if (results.length > 0) {
            // ถ้ามีข้อมูลอยู่แล้ว => อัปเดต
            db.query(
              sqlUpdate,
              [s.score, user_id, user_probation_id, s.id],
              (err) => {
                if (err) reject(err);
                else resolve();
              }
            );
          } else {
            // ถ้ายังไม่มี => เพิ่มใหม่
            db.query(
              sqlInsert,
              [user_id, user_probation_id, s.id, s.score],
              (err) => {
                if (err) reject(err);
                else resolve();
              }
            );
          }
        }
      );
    });
  });

  // อัปเดตหรือเพิ่ม commentoverall
  const updateComment = new Promise((resolve, reject) => {
    db.query(sqlCommentSelect, [user_id, user_probation_id], (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      if (results.length > 0) {
        // ถ้ามีความคิดเห็นอยู่แล้ว อัปเดต
        db.query(
          sqlCommentUpdate,
          [comment, user_id, user_probation_id],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      } else {
        // ถ้ายังไม่มี เพิ่มใหม่
        db.query(
          sqlCommentInsert,
          [comment, user_id, user_probation_id],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      }
    });
  });

  // ทำ Promise.all() รอให้คะแนนและความคิดเห็นอัปเดตเสร็จ
  Promise.all([...updateScores, updateComment])
    .then(() => {
      res.json({ message: "✅ บันทึกข้อมูลสำเร็จ" });
    })
    .catch((error) => {
      console.error("❌ Error updating commentscore or commentoverall:", error);
      res.status(500).json({ error: "Database error" });
    });
});

router.get("/commentscoreall", (req, res) => {
    const { user_id, user_probation_id } = req.query;

    if (!user_id || !user_probation_id) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    // ✅ แปลง user_probation_id เป็น Array (ตรวจสอบให้แน่ใจว่ามันเป็น array จริงๆ)
    const probationIds = user_probation_id.split(',').map(id => parseInt(id));

    if (probationIds.length === 0) {
        return res.status(400).json({ error: "Invalid user_probation_id values" });
    }

    // ✅ สร้าง Query ให้รับค่าทุกตัวโดยใช้ `IN (?, ?, ?, ?)`
    const sql = `
      SELECT commentscore_id, user_id, user_probation_id, criteria_id, score, created_at, updated_at
      FROM commentscore
      WHERE user_id = ? AND user_probation_id IN (${probationIds.map(() => "?").join(",")});
    `;

    console.log("📌 Final SQL Query:", sql); // ✅ Debug ตรวจสอบ Query

    // ✅ ใช้ Spread Operator เพื่อให้ MySQL ใช้ค่า Array ทั้งหมด
    db.query(sql, [user_id, ...probationIds], (err, results) => {
        if (err) {
            console.error("❌ Error fetching commentscore:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        res.json(results);
    });
});

// ✅ ดึงความคิดเห็นของแต่ละคน (หลาย user_probation_id)
router.get("/comment_overall", (req, res) => {
    const { user_id, user_probation_id } = req.query;
  
    if (!user_id || !user_probation_id) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
  
    const probationIds = user_probation_id.split(",").map((id) => parseInt(id.trim()));
  
    // ✅ ใช้ `JOIN users` เพื่อดึง f_name, l_name ของผู้ให้ความคิดเห็น
    const sql = `
      SELECT co.commentoverall_id, co.comment_detail, co.user_id, co.user_probation_id, 
             u.f_name, u.l_name
      FROM commentoverall co
      JOIN users u ON co.user_id = u.user_id
      WHERE co.user_id = ? AND co.user_probation_id IN (${probationIds.map(() => '?').join(',')});
    `;
  
    db.query(sql, [user_id, ...probationIds], (err, results) => {
      if (err) {
        console.error("❌ Error fetching commentoverall:", err);
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(results);
    });
  });
  

module.exports = router;
