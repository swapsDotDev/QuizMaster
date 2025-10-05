const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/questions", (req, res) => {
  db.all("SELECT id, text, options FROM questions", (err, rows) => {
    if (err) {
      console.error("Error fetching questions:", err.message);
      return res.status(500).json({ error: "Failed to fetch questions" });
    }
    try {
      const questions = rows.map((row) => ({
        id: row.id,
        text: row.text,
        options: JSON.parse(row.options),
      }));
      res.json(questions);
    } catch (err) {
      console.error("Error parsing options:", err.message);
      res.status(500).json({ error: "Failed to parse question options" });
    }
  });
});

router.post("/submit", (req, res) => {
  const userAnswers = req.body.answers || {};
  console.log("Received answers:", userAnswers);

  if (typeof userAnswers !== "object" || userAnswers === null) {
    console.error("Invalid answers format:", userAnswers);
    return res.status(400).json({ error: "Invalid answers format" });
  }

  db.all("SELECT id, correctAnswer FROM questions", (err, rows) => {
    if (err) {
      console.error("Error fetching questions for scoring:", err.message);
      return res.status(500).json({ error: "Failed to fetch questions" });
    }

    if (!rows || rows.length === 0) {
      console.error("No questions found in database");
      return res.status(500).json({ error: "No questions available" });
    }

    try {
      const results = rows.map((q) => {
        const userAnswer = userAnswers[q.id];
        return {
          id: q.id,
          isCorrect: userAnswer !== undefined && userAnswer === q.correctAnswer,
          userAnswer: userAnswer !== undefined ? userAnswer : null,
          correctAnswer: q.correctAnswer,
        };
      });

      const score = results.filter((r) => r.isCorrect).length;
      const total = rows.length;

      console.log("Submission results:", { score, total, results });
      res.json({
        score,
        total,
        results,
      });
    } catch (err) {
      console.error("Error processing submission:", err.message);
      res.status(500).json({ error: "Failed to process submission" });
    }
  });
});

module.exports = router;