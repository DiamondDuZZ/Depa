const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM basiccourse';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err);
      res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
