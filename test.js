const db = require('./db');

console.log("Connecting to MySQL...");

db.query('SELECT 1 + 1 AS solution')
  .then(([rows]) => {
    console.log('✅ SUCCESS! Connected to MySQL. 1 + 1 =', rows[0].solution);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ FAILED to connect to MySQL:', err.message);
    process.exit(1);
  });
