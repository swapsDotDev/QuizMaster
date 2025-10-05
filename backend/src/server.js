// const express = require("express");
// const cors = require("cors");
// const quizRoutes = require("./routes/quizRoutes");

// const app = express();
// const PORT = 4000;

// app.use(cors());
// app.use(express.json());

// app.use("/api", quizRoutes);

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", quizRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});