const mysql = require('mysql2/promise');
require('dotenv').config();

async function setup() {
  try {
    // 1. Connect without database to create it
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log('--- Connecting to MySQL server ---');
    await connection.query('CREATE DATABASE IF NOT EXISTS mindmatrix');
    console.log('✅ Database "mindmatrix" created or already exists.');

    // 2. Connect to the mindmatrix database to create the table
    await connection.changeUser({ database: 'mindmatrix' });

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        age INT,
        goal TEXT,
        password VARCHAR(255) NOT NULL,
        bio TEXT,
        avatar MEDIUMTEXT,
        joinDate VARCHAR(50),
        logs JSON
      )
    `;
    
    await connection.query(createTableQuery);
    console.log('✅ Table "users" created or already exists.');

    // Ensure avatar column exists (for existing tables)
    try {
      await connection.query('ALTER TABLE users ADD COLUMN avatar MEDIUMTEXT');
      console.log('✅ Column "avatar" added to "users" table.');
    } catch (err) {
      if (err.code === 'ER_DUP_COLUMN_NAME' || err.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️ Column "avatar" already exists.');
      } else {
        throw err;
      }
    }

    await connection.end();
    console.log('--- Setup complete ---');
  } catch (err) {
    console.error('❌ Error during database setup:', err);
    process.exit(1);
  }
}

setup();
