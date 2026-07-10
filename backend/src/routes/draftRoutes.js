const express = require("express");
const router = express.Router();

const {
  saveDraft,
  getDrafts,
} = require("../controllers/draftController");

router.post("/", saveDraft);

router.get("/:patientId", getDrafts);

module.exports = router;