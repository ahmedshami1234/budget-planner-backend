const express = require("express");
const router = express.Router();
const { getCategories, addCategory } = require("../controllers/categoriesController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getCategories);
router.post("/", authMiddleware, addCategory);

module.exports = router;
