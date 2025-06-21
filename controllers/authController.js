const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
    console.log('📥 Incoming body:', req.body);
    console.log("📥 Register route hit");
  
    const { name, email, password } = req.body;
  
    try {
      const [existing] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        console.log('❗ Duplicate email found');
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.promise().query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );
  
      console.log('✅ User registered:', email);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('❌ Register Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Login a user and return a JWT token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user's profile (protected route)
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.promise().query('SELECT id, name, email FROM users WHERE id = ?', [userId]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};
