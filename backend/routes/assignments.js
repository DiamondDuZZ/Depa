const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../db");

const router = express.Router();

// ✅ กำหนดโฟลเดอร์เก็บไฟล์
const uploadDir = path.join(__dirname, "../public/uploads/assignments");


// ✅ ตรวจสอบว่ามีโฟลเดอร์หรือไม่ ถ้าไม่มีให้สร้างขึ้น
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ ตั้งค่า `multer` สำหรับอัปโหลดไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์เป็น timestamp
  },
});
const upload = multer({ storage });

router.get('/', (req, res) => {
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({ error: "user_id is required" });
  }

  const query = `
      SELECT * FROM assignment
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

router.put("/update", (req, res) => {
  console.log("Request Body:", req.body); // ✅ Debug เช็คค่าที่ส่งมา
  let { assignment_id, name, type, description, dateStart, dateEnd, expectedOutcome, actualOutcome, status } = req.body;

  if (!assignment_id) {
    return res.status(400).json({ error: "assignment_id is required" });
  }
  if (type === "workload") {
    dateStart = null;
    dateEnd = null;
  }
  // ✅ ตรวจสอบว่า dateStart และ dateEnd ได้ค่ามาจริงหรือไม่
  console.log("dateStart:", dateStart);
  console.log("dateEnd:", dateEnd);

  const query = `
      UPDATE assignment
      SET name = ?, type = ?, description = ?, date_start = ?, date_end = ?, 
          result_expected = ?, result = ?, updated_at = NOW(), status = ?
      WHERE assignment_id = ?
  `;

  db.query(query, [name, type, description, dateStart, dateEnd, expectedOutcome, actualOutcome, status, assignment_id], (err, result) => {
    if (err) {
      console.error("Error updating assignment:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    return res.status(200).json({ message: "Assignment updated successfully" });
  });
});


router.put("/update-comment", (req, res) => {
  const { assignment_id, user_comment } = req.body;

  if (!assignment_id) {
    return res.status(400).json({ error: "assignment_id is required" });
  }

  const query = `
    UPDATE assignment
    SET user_comment = ?, updated_at = NOW()
    WHERE assignment_id = ?
  `;

  db.query(query, [user_comment, assignment_id], (err, result) => {
    if (err) {
      console.error("Error updating comment:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    return res.status(200).json({ message: "Comment updated successfully" });
  });
});

router.put("/update-comment2", (req, res) => {
  const { assignment_id, user_comment } = req.body;

  if (!assignment_id) {
    return res.status(400).json({ error: "assignment_id is required" });
  }

  const query = `
    UPDATE assignment
    SET comment = ?, updated_at = NOW()
    WHERE assignment_id = ?
  `;

  db.query(query, [user_comment, assignment_id], (err, result) => {
    if (err) {
      console.error("Error updating comment:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    return res.status(200).json({ message: "Comment updated successfully" });
  });
});

// ✅ API สำหรับเพิ่ม Assignment พร้อมอัปโหลดไฟล์
router.post("/add", upload.array("files", 4), (req, res) => {
  const { user_id, name, type, description, dateStart, dateEnd, expectedOutcome, actualOutcome } = req.body;
  const uploadedFiles = req.files.map(file => file.filename); // ✅ ดึงชื่อไฟล์ที่อัปโหลด

  if (!user_id || !name || !type || !description) {
    return res.status(400).json({ error: "user_id, name, type, and description are required" });
  }

  const countQuery = `SELECT COUNT(*) AS total FROM assignment`;
  db.query(countQuery, (err, result) => {
    if (err) {
      console.error("Error counting assignments:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const assignment_id = result[0].total + 1; 

    const insertQuery = `
      INSERT INTO assignment (assignment_id, user_id, name, type, description, date_start, date_end, result_expected, result, file_path, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(insertQuery, [assignment_id, user_id, name, type, description, dateStart, dateEnd, expectedOutcome, actualOutcome, uploadedFiles.join(",")], (err) => {
      if (err) {
        console.error("Error inserting assignment:", err);
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(200).json({ message: "Assignment added successfully", assignment_id, uploadedFiles });
    });
  });
});



router.delete("/delete/:assignment_id", (req, res) => {
  const { assignment_id } = req.params;

  if (!assignment_id) {
    return res.status(400).json({ error: "assignment_id is required" });
  }

  // ✅ 1. ลบ Assignment ที่เลือก
  const deleteQuery = `DELETE FROM assignment WHERE assignment_id = ?`;

  db.query(deleteQuery, [assignment_id], (err, result) => {
    if (err) {
      console.error("Error deleting assignment:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    console.log(`Deleted assignment_id: ${assignment_id}`);

    // ✅ 2. รีเซ็ตค่า assignment_id ให้เรียงกันใหม่
    const getAssignmentsQuery = `SELECT assignment_id FROM assignment ORDER BY assignment_id`;

    db.query(getAssignmentsQuery, (err, rows) => {
      if (err) {
        console.error("Error fetching assignments:", err);
        return res.status(500).json({ error: "Error fetching assignments" });
      }

      // ✅ 2.1 อัปเดต assignment_id ใหม่ให้เรียงกัน (Loop ผ่านข้อมูล)
      let updateQueries = rows.map((row, index) => {
        return new Promise((resolve, reject) => {
          const updateQuery = `UPDATE assignment SET assignment_id = ? WHERE assignment_id = ?`;
          db.query(updateQuery, [index + 1, row.assignment_id], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      });

      Promise.all(updateQueries)
        .then(() => {
          // ✅ 3. รีเซ็ตค่า AUTO_INCREMENT ให้เริ่มจากค่าที่มากที่สุด +1
          const resetAutoIncrementQuery = `
            SELECT MAX(assignment_id) AS max_id FROM assignment;
          `;

          db.query(resetAutoIncrementQuery, (err, result) => {
            if (err) {
              console.error("Error getting max assignment_id:", err);
              return res.status(500).json({ error: "Error getting max assignment_id" });
            }

            const maxId = result[0].max_id || 0; // ถ้าไม่มีข้อมูลให้เป็น 0
            const newAutoIncrement = maxId + 1;

            const alterAutoIncrementQuery = `ALTER TABLE assignment AUTO_INCREMENT = ${newAutoIncrement}`;

            db.query(alterAutoIncrementQuery, (err) => {
              if (err) {
                console.error("Error resetting AUTO_INCREMENT:", err);
                return res.status(500).json({ error: "Error resetting AUTO_INCREMENT" });
              }

              return res.status(200).json({ message: "Assignment deleted and IDs reset successfully" });
            });
          });
        })
        .catch((err) => {
          console.error("Error updating assignment_id:", err);
          return res.status(500).json({ error: "Error updating assignment_id" });
        });
    });
  });
});

router.put('/updateTaskStatus', (req, res) => {
  const { taskId, status } = req.body;

  // ตรวจสอบว่าข้อมูลถูกต้องหรือไม่
  if (taskId === undefined || status === undefined) {
    return res.status(400).json({ error: "ข้อมูลไม่ครบถ้วน" });
  }

  const sql = "UPDATE assignment SET status = ? WHERE assignment_id = ?";
  const values = [status, taskId];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตสถานะของงาน:", err);
      return res.status(500).json({ error: "ไม่สามารถอัปเดตสถานะได้" });
    }
    res.status(200).json({ message: "อัปเดตสถานะสำเร็จ", results });
  });
});


module.exports = router;


