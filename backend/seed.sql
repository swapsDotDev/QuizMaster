-- SQL seed file for QuizMaster
-- Run with: sqlite3 quiz.db < seed.sql

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  options TEXT NOT NULL,
  correctAnswer INTEGER NOT NULL
);

DELETE FROM questions;

INSERT INTO questions (text, options, correctAnswer) VALUES
('What is the capital of France?', '["London","Berlin","Paris","Madrid"]', 2),
('Which planet is known as the Red Planet?', '["Venus","Mars","Jupiter","Saturn"]', 1),
('What is 2 + 2?', '["3","4","5","6"]', 1),
('Who painted the Mona Lisa?', '["Vincent van Gogh","Pablo Picasso","Leonardo da Vinci","Michelangelo"]', 2),
('What is the largest ocean on Earth?', '["Atlantic Ocean","Indian Ocean","Arctic Ocean","Pacific Ocean"]', 3);

COMMIT;

-- End of seed.sql
