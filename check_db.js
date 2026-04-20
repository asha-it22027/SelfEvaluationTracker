const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [rows] = await connection.query('DESCRIBE users');
    console.log(JSON.stringify(rows, null, 2));
    await connection.end();
  } catch (err) {
    console.error(err);
  }
}
check();
