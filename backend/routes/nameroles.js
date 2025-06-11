const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/namerolesfilter', (req, res) => {
    const { depart_id, subrole_id } = req.query; // รับ depart_id และ subrole_id จาก query parameters
  
    if (!depart_id || !subrole_id) {
      return res.status(400).json({ error: 'Missing depart_id or subrole_id' });
    }
  
    const query = `
      SELECT 
        nameroles.namerole_id, 
        nameroles.namerole_name, 
        jobroles.job_id, 
        jobroles.job_name
      FROM 
        nameroles
      JOIN 
        jobroles ON nameroles.job_id = jobroles.job_id
      WHERE 
        nameroles.depart_id = ? 
        AND nameroles.level_id = (
          SELECT level_id 
          FROM subroles 
          WHERE subrole_id = ?
        )
    `;
  
    db.query(query, [depart_id, subrole_id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      res.json(results);
    });
  });

  router.post('/getNamerole', (req, res) => {
    const { nameroleId } = req.body;
  
    // ตรวจสอบว่า nameroleId ถูกส่งมาหรือไม่
    if (!nameroleId) {
      return res.status(400).json({ success: false, message: 'กรุณาส่ง nameroleId' });
    }
  
    // คำสั่ง SQL สำหรับดึงข้อมูลจากตาราง nameroles
    const sql = 'SELECT nameroles.namerole_name, departments.depart_name FROM nameroles JOIN departments ON nameroles.depart_id = departments.depart_id WHERE nameroles.namerole_id = ?';
  
    db.query(sql, [nameroleId], (err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลสำหรับ id ที่ระบุ' });
      }
  
      // ส่งข้อมูลกลับไปยัง client
      res.status(200).json({ success: true, namerole: result[0] });
    });
  });

module.exports = router;
