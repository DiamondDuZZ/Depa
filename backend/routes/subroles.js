const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM subroles';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err);
      res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้' });
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/filter', (req, res) => {
    const { depart_id } = req.query;
  
    if (!depart_id) {
      return res.status(400).json({ error: 'กรุณาส่ง depart_id' });
    }
  
    // Query เพื่อตรวจสอบ level_id จาก nameroles ที่เกี่ยวข้องกับ depart_id
    const queryLevelIds = `
      SELECT DISTINCT level_id
      FROM nameroles
      WHERE depart_id = ?
    `;
  
    db.query(queryLevelIds, [depart_id], (err, levelResults) => {
      if (err) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล level_id:', err);
        return res.status(500).json({ error: 'ไม่สามารถดึงข้อมูล level_id ได้' });
      }
  
      // ถ้าไม่มี level_id ที่เกี่ยวข้อง ให้ส่งกลับข้อมูลว่าง
      if (levelResults.length === 0) {
        return res.status(200).json([]);
      }
  
      // ดึง level_id ทั้งหมดจากผลลัพธ์
      const levelIds = levelResults.map((row) => row.level_id);
  
      // Query เพื่อนำข้อมูลจาก subroles ที่มี level_id ที่ตรงกัน
      const querySubroles = `
        SELECT *
        FROM subroles
        WHERE level_id IN (?)
      `;
  
      db.query(querySubroles, [levelIds], (err, subroleResults) => {
        if (err) {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูล subroles:', err);
          return res.status(500).json({ error: 'ไม่สามารถดึงข้อมูล subroles ได้' });
        }
  
        res.status(200).json(subroleResults);
      });
    });
  });

  router.post('/getSubrole', (req, res) => {
    const { subroleId } = req.body;
  
    // ตรวจสอบว่า nameroleId ถูกส่งมาหรือไม่
    if (!subroleId) {
      return res.status(400).json({ success: false, message: 'กรุณาส่ง subroleId' });
    }
  
    // คำสั่ง SQL สำหรับดึงข้อมูลจากตาราง nameroles
    const sql = 'SELECT * FROM subroles WHERE subrole_id = ?';
  
    db.query(sql, [subroleId], (err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลสำหรับ id ที่ระบุ' });
      }
  
      // ส่งข้อมูลกลับไปยัง client
      res.status(200).json({ success: true, subrole: result[0] });
    });
  });
module.exports = router;
