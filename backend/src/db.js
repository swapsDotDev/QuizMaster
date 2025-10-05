// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database(":memory:"); // in-memory for simplicity

// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS questions (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       text TEXT NOT NULL,
//       options TEXT NOT NULL,
//       correctOption INTEGER NOT NULL
//   )`);

//   // Insert sample data (only if empty)
//   db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
//     if (row.count === 0) {
//       const stmt = db.prepare("INSERT INTO questions (text, options, correctOption) VALUES (?, ?, ?)");
//       stmt.run(
//         "What is the capital of France?",
//         JSON.stringify(["Paris", "London", "Rome", "Berlin"]),
//         0
//       );
//       stmt.run(
//         "Which language runs in a web browser?",
//         JSON.stringify(["Python", "C++", "JavaScript", "Java"]),
//         2
//       );
//       stmt.run(
//         "What is 2 + 2?",
//         JSON.stringify(["3", "4", "5", "6"]),
//         1
//       );
//       stmt.finalize();
//       console.log("Sample questions inserted ✅");
//     }
//   });
// });

// module.exports = db;

const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dbPath = path.join(__dirname, "../quiz.db");
console.log("Database path:", dbPath);

// Ensure the directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  console.log(`Directory ${dbDir} does not exist. Creating it...`);
  fs.mkdirSync(dbDir, { recursive: true });
}

// Check if the database file is writable
try {
  if (fs.existsSync(dbPath)) {
    fs.accessSync(dbPath, fs.constants.W_OK);
    console.log("Database file exists and is writable.");
  } else {
    console.log("Database file does not exist. It will be created.");
  }
} catch (err) {
  console.error("Error checking database file permissions:", err.message);
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    return;
  }
  console.log("Connected to SQLite database.");
});

// Initialize the database schema and seed data
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      options TEXT NOT NULL,
      correctAnswer INTEGER NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error("Error creating questions table:", err.message);
    }
  });

  db.get("SELECT COUNT(*) AS count FROM questions", (err, row) => {
    if (err) {
      console.error("Error checking questions table:", err.message);
      return;
    }
    if (row.count === 0) {
      const questions = [
        {
          text: "What is the capital of France?",
          options: JSON.stringify(["London", "Berlin", "Paris", "Madrid"]),
          correctAnswer: 2,
        },
        {
          text: "Which planet is known as the Red Planet?",
          options: JSON.stringify(["Venus", "Mars", "Jupiter", "Saturn"]),
          correctAnswer: 1,
        },
        {
          text: "What is 2 + 2?",
          options: JSON.stringify(["3", "4", "5", "6"]),
          correctAnswer: 1,
        },
        {
          text: "Who painted the Mona Lisa?",
          options: JSON.stringify([
            "Vincent van Gogh",
            "Pablo Picasso",
            "Leonardo da Vinci",
            "Michelangelo",
          ]),
          correctAnswer: 2,
        },
        {
          text: "What is the largest ocean on Earth?",
          options: JSON.stringify([
            "Atlantic Ocean",
            "Indian Ocean",
            "Arctic Ocean",
            "Pacific Ocean",
          ]),
          correctAnswer: 3,
        },
      ];

      const stmt = db.prepare(
        "INSERT INTO questions (text, options, correctAnswer) VALUES (?, ?, ?)"
      );
      questions.forEach((q) => {
        stmt.run(q.text, q.options, q.correctAnswer, (err) => {
          if (err) {
            console.error("Error seeding question:", err.message);
          }
        });
      });
      stmt.finalize((err) => {
        if (err) {
          console.error("Error finalizing statement:", err.message);
        } else {
          console.log("Seeded questions into database.");
        }
      });
    } else {
      console.log("Questions table already contains data.");
    }
  });
});

module.exports = db;