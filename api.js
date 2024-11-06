const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;
app.use(express.json());
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

// สร้าง user
app.post('/adduser', (req, res) => {
  const { email, password, name, weight, height } = req.body; 
  const sqlQuery = 'INSERT INTO `User` (`email`, `password`, `name`, `weight`, `height`) VALUES (?, ?, ?, ?, ?)'; 

  db.query(sqlQuery, [email, password, name, weight, height], (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูล:', err.message);
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' });
    }
    res.json({ data: results });
  });
});


app.put('/updateuser', (req, res) => {
  const { email, password, name, weight, height, uid } = req.body; // Include 'uid' in the body to specify the user to update

  // Correct the SQL query
  const sqlQuery = `
    UPDATE \`User\` 
    SET \`email\` = ?, \`password\` = ?, \`name\` = ?, \`weight\` = ?, \`height\` = ? 
    WHERE \`Uid\` = ?;
  `;

  // Run the query with the provided values
  db.query(sqlQuery, [email, password, name, weight, height, uid], (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการอัพเดตข้อมูล:', err.message); // Corrected the message
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัพเดตข้อมูล' }); // Corrected error message
    }
    // Respond with the results from the query
    res.json({ data: results });
  });
});



app.post('/getbook', (req, res) => {
  
  const uid = req.body.uid;
  const sqlQuery = 'SELECT * FROM Book WHERE uid = ?'; 
  db.query(sqlQuery, [uid], (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err.message);
      return res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
    res.json(results);
  });
});


app.post('/getbyid', (req, res) => {
  
  const uid = req.body.uid;
  const Bid = req.body.Bid;
  const sqlQuery = 'SELECT * FROM Book WHERE uid = ? and Bid = ?'; 
  db.query(sqlQuery, [uid,Bid], (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err.message);
      return res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
    res.json(results);
  });
});


app.delete('/book', (req, res) => {
  const { bid } = req.body; // Destructure 'bid' from the request body

  // Corrected SQL query
  const sqlQuery = 'DELETE FROM Book WHERE bid = ?'; 

  // Execute the query
  db.query(sqlQuery, [bid], (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการลบข้อมูล:', err.message); // Corrected the error message
      return res.status(500).send('เกิดข้อผิดพลาดในการลบข้อมูล'); // Corrected the error message
    }
    // Return the results of the deletion
    res.json(results);
  });
});



app.post('/addbook', (req, res) => {
  const { name, description, url, create,uid } = req.body; 
  const sqlQuery = 'INSERT INTO `Book` (`name`, `description`, `url`, `create`, `uid`) VALUES (?, ?, ?, ? ,?)'; 

  db.query(sqlQuery, [name, description, url, create, uid], (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูล:', err.message);
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' });
    }
    res.json({ data: results });
  });
});

//ดึง Login
app.post('/user', (req, res) => {
  const email = req.body.email;
  const sqlQuery = 'SELECT * FROM User WHERE email = ?';

  db.query(sqlQuery, [email], (err, results) => {
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
