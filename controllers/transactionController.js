const db = require("../models/db");

exports.createTransaction = async (req, res) => {
  const { title, amount, type } = req.body;
  const userId = req.user.id;

  if (!title || !amount || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.promise().query(
      "INSERT INTO transactions (user_id, title, amount, type) VALUES (?, ?, ?, ?)",
      [userId, title, amount, type]
    );
    res.status(201).json({ message: "Transaction created" });
  } catch (err) {
    console.error("Create Transaction Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTransactions = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Get Transactions Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
