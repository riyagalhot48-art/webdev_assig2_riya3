const express = require("express");

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Management REST API is running"
  });
});

app.use("/students", studentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
