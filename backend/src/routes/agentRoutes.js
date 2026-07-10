const express = require("express");
const router = express.Router();

const { agentChat } = require("../controllers/agentController");

router.post("/chat", agentChat);

module.exports = router;