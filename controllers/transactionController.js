const db = require("../models/db");

// Create Transaction
exports.createTransaction = async (req, res) => {
  const { title, amount, type, category } = req.body;
  const userId = req.user.id;

  if (!title || !amount || !type || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.query(
      "INSERT INTO transactions (user_id, title, amount, type, category) VALUES (?, ?, ?, ?, ?)",
      [userId, title, amount, type, category]
    );
    res.status(201).json({ message: "Transaction created" });
  } catch (err) {
    console.error("❌ Create Transaction Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Transactions
exports.getTransactions = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.query(
      "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Get Transactions Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM transactions WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found or unauthorized" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Transaction
exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount, type, category } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE transactions SET title = ?, amount = ?, type = ?, category = ? WHERE id = ? AND user_id = ?",
      [title, amount, type, category, id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found or unauthorized" });
    }

    res.json({ message: "Transaction updated successfully" });
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
