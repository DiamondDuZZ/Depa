const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost', // ใช้แค่ IP Address ไม่มีพอร์ต
    user: 'root',
    password: '',
    database: 'depa'
  });
  
db.connect(err => {
  if (err) {
    console.error('ไม่สามารถเชื่อมต่อฐานข้อมูลได้:', err);
  } else {
    console.log('เชื่อมต่อฐานข้อมูลสำเร็จ');
  }
});

module.exports = db;
