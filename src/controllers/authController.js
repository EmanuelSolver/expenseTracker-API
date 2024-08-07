const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

  db.query(query, [username, hashedPassword], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
};



exports.loginUser = (req, res) => {
    const { username, password } = req.body;
  
    // Check if the user exists
    db.query('SELECT * FROM Users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (results.length === 0) {
        return res.status(400).json({ message: 'Username or password is incorrect' });
      }
  
      const user = results[0];
  
      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Username or password is incorrect' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    });
}