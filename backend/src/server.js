const express = require("express");
const cors = require("cors");
require("dotenv").config();

const patientRoutes = require("./routes/patientRoutes");
const agentRoutes = require("./routes/agentRoutes");
const draftRoutes = require("./routes/draftRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/drafts", draftRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Patient Context API Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});