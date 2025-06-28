const db = require("../models/db");

exports.getCategories = async (req, res) => {
    try {
      const [categories] = await db.query(
        "SELECT * FROM categories WHERE user_id = ?",
        [req.user.id]
      );
      res.json(categories);
    } catch (err) {
      console.error("Get categories error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  exports.addCategory = async (req, res) => {
    const { name, color } = req.body;
    if (!name || !color) {
      return res.status(400).json({ message: "Missing name or color" });
    }
  
    try {
      await db.query(
        "INSERT INTO categories (name, color, user_id) VALUES (?, ?, ?)",
        [name, color, req.user.id]
      );
      res.status(201).json({ message: "Category created" });
    } catch (err) {
      console.error("Add category error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  