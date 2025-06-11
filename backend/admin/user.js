const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getuser', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err);
      res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้' });
    } else {
      res.status(200).json(results);
    }
  });
});
router.put('/update/:user_id', (req, res) => {
    const { user_id } = req.params;
    const updatedData = req.body;
  
    const sql = 'UPDATE users SET ? WHERE user_id = ?';
    db.query(sql, [updatedData, user_id], (err, results) => {
      if (err) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', err);
        res.status(500).json({ error: 'ไม่สามารถอัปเดตข้อมูลได้' });
      } else {
        res.status(200).json({ message: 'อัปเดตข้อมูลสำเร็จ' });
      }
    });
  });
  
module.exports = router;
