const express = require('express');
const path = require("path");
const cors = require('cors'); // เพิ่มการ import cors
const app = express();
const port = 3000; //3306

// เพิ่ม CORS Middleware
app.use(cors({
  origin: 'http://localhost:5173', // อนุญาตเฉพาะ frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // กำหนด Methods ที่อนุญาต
  allowedHeaders: ['Content-Type', 'Authorization'], // เพิ่ม Header ที่อนุญาต (กรณีต้องใช้ Token)
  credentials: true // หากต้องการให้ Cookie หรือ Token ส่งระหว่าง Client-Server
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // สำหรับ URL-encoded data (ถ้าใช้ฟอร์ม)
// Import Routes
const departmentRoutes = require('./routes/departments');
const jobrolesRoutes = require('./routes/jobroles');    
const levelsRoutes = require('./routes/levels');
const subrolesRoutes = require('./routes/subroles');
const namerolesRoutes = require('./routes/nameroles');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const usersRoutes = require('./routes/users');
const activitysRoutes = require('./routes/activitys');
const basiccoursesRoutes = require('./routes/basiccourses');
const developmentsRoutes = require('./routes/developments');
const assignmentsRoutes = require('./routes/assignments');
const relationRoutes = require('./routes/relation');
const commentsRoutes = require('./routes/comment');
const criteriasRoutes = require('./routes/criteria');
const user = require('./admin/user');

// Use Routes
app.use('/api/departments', departmentRoutes);
app.use('/api/subroles', subrolesRoutes);
app.use('/api/jobroles', jobrolesRoutes);
app.use('/api/levels', levelsRoutes);
app.use('/api/nameroles', namerolesRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/activitys', activitysRoutes);
app.use('/api/basiccourses', basiccoursesRoutes);
app.use('/api/developments', developmentsRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/relations', relationRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/criterias', criteriasRoutes);
app.use('/admin/user', user);

const uploadPath = path.join(__dirname, "public/uploads/assignments");
console.log("📂 Serving files from:", uploadPath);

app.use("/uploads", express.static(uploadPath));

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
