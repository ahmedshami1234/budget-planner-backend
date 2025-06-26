// ✅ Compatible approach with CommonJS
const mysql = require("mysql2/promise");
require("dotenv").config();

let db;

(async () => {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("✅ Connected to MySQL");
})();

module.exports = {
  query: (...args) => db.query(...args),
};
