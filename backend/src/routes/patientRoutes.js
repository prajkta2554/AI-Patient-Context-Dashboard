const express = require("express");
const router = express.Router();

const {
  createPatient,
  getPatients,
  getPatientById,
  getPatientContext,
  generateSummary,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

router.post("/", createPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);
router.get("/:id/context", getPatientContext);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);
router.post("/:id/generate-summary", generateSummary);

module.exports = router;