const express = require("express");
const router = express.Router();
const { createTransaction, getTransactions } = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/transactions
router.post("/", authMiddleware, createTransaction);

// GET /api/transactions
router.get("/", authMiddleware, getTransactions);

module.exports = router;
