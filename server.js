const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('./db'); // Our new MySQL pool
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from the 'mindmatrix' directory
app.use(express.static(path.join(__dirname, 'mindmatrix')));

// Root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'mindmatrix', 'index.html'));
});

// --- API ROUTES ---

// 1. Register a new user
app.post('/register', async (req, res) => {
  try {
    const { name, email, age, goal, password } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    const lowerEmail = email.toLowerCase();
    
    // Check if user already exists
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [lowerEmail]);
    console.log('existingUsers from query:', existingUsers);
    if (existingUsers.length > 0) {
      console.log('Registration blocked: Email already exists');
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Use standard YYYY-MM-DD format for MySQL DATE columns
    const joinDate = new Date().toISOString().split('T')[0];
    const emptyLogs = JSON.stringify([]);

    await db.query(
      'INSERT INTO users (name, email, age, goal, password, joinDate, logs, bio, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, lowerEmail, age, goal, hashedPassword, joinDate, emptyLogs, '', '']
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 2. Login user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase();

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [lowerEmail]);
    
    if (users.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Remove password before sending back
    delete user.password;
    
    // Ensure logs is an object (mysql2 might return JSON column as a string or object depending on version/config)
    if (typeof user.logs === 'string') {
        user.logs = JSON.parse(user.logs);
    }
    
    res.json(user);
  } catch (error) {
    console.error('API Error in route:', req.path, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 3. Save a daily log
app.post('/log/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { scores, mood, mhScores } = req.body;
    const today = new Date().toLocaleDateString('en-GB');
    const lowerEmail = email.toLowerCase();

    const [users] = await db.query('SELECT logs FROM users WHERE email = ?', [lowerEmail]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });

    let logs = users[0].logs;
    if (typeof logs === 'string') logs = JSON.parse(logs);

    // Update log if it exists for today, else push new log
    const logIdx = logs.findIndex(l => l.date === today);
    const logEntry = { date: today, scores, mood, mhScores, ts: Date.now() };

    if (logIdx >= 0) {
      logs[logIdx] = logEntry;
    } else {
      logs.push(logEntry);
    }

    // Sort logs by timestamp
    logs.sort((a, b) => a.ts - b.ts);

    await db.query('UPDATE users SET logs = ? WHERE email = ?', [JSON.stringify(logs), lowerEmail]);
    
    res.json({ message: 'Log saved successfully', logs: logs });
  } catch (error) {
    console.error('API Error in route:', req.path, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 4. Get user data
app.get('/user/:email', async (req, res) => {
  try {
    const lowerEmail = req.params.email.toLowerCase();
    const [users] = await db.query('SELECT id, name, email, age, goal, bio, avatar, joinDate, logs FROM users WHERE email = ?', [lowerEmail]);
    
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });
    
    const user = users[0];
    if (typeof user.logs === 'string') user.logs = JSON.parse(user.logs);
    
    res.json(user);
  } catch (error) {
    console.error('API Error in route:', req.path, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 5. Update user profile
app.put('/user/:email', async (req, res) => {
  try {
    const { bio, age, goal, name, avatar } = req.body;
    const lowerEmail = req.params.email.toLowerCase();

    console.log(`Update user ${lowerEmail}: avatar length = ${avatar ? avatar.length : 0}`);

    await db.query(
      'UPDATE users SET bio = ?, age = ?, goal = ?, name = ?, avatar = ? WHERE email = ?',
      [bio, age, goal, name, avatar, lowerEmail]
    );

    // Get updated user data
    const [users] = await db.query('SELECT id, name, email, age, goal, bio, avatar, joinDate, logs FROM users WHERE email = ?', [lowerEmail]);
    
    const user = users[0];
    if (typeof user.logs === 'string') user.logs = JSON.parse(user.logs);
    
    console.log(`User ${lowerEmail} updated successfully: avatar in DB length = ${user.avatar ? user.avatar.length : 0}`);
    res.json(user);
  } catch (error) {
    console.error('API Error in route:', req.path, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
