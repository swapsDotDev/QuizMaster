// db.js (E:\Swappy\Projects\Task Based\QuizMaster\backend\src\db.js)
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dbPath = path.join(__dirname, "../quiz.db");
console.log("Database path:", dbPath);

const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  console.log(`Directory ${dbDir} does not exist. Creating it...`);
  fs.mkdirSync(dbDir, { recursive: true });
}

try {
  if (fs.existsSync(dbPath)) {
    fs.accessSync(dbPath, fs.constants.W_OK);
    console.log("Database file exists and is writable.");
  } else {
    console.error("Database file does not exist. Please ensure the database is created and populated.");
    process.exit(1);
  }
} catch (err) {
  console.error("Error checking database file permissions:", err.message);
  process.exit(1);
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    process.exit(1);
  }
  console.log("Connected to SQLite database.");
});

function getQuestions(callback) {
  db.all("SELECT id, text, options FROM questions", (err, rows) => {
    if (err) {
      console.error("Error fetching questions:", err.message);
      callback(err, null);
      return;
    }
    const questions = rows.map((row) => ({
      id: row.id,
      text: row.text,
      options: JSON.parse(row.options),
    }));
    callback(null, questions);
  });
}

module.exports = { db, getQuestions };