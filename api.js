const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล
const db = mysql.createConnection({
  host: '119.59.96.110',
  user: 'aemandko_Tinchai',
  password: 'Tinchai',
  database: 'aemandko_Tinchai'
});

// เปิดการเชื่อมต่อกับฐานข้อมูล
db.connect((err) => {
  if (err) {
    console.error('เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล:', err.message);
  } else {
    console.log('เชื่อมต่อกับฐานข้อมูลสำเร็จ');
  }
});

// สร้าง API เพื่อดึงข้อมูล
app.get('/user', (req, res) => {
  const sqlQuery = 'SELECT * FROM User'; 

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err.message);
      return res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
    res.json(results);
  });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
