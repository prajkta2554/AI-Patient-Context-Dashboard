const prisma = require("../prisma");
const buildPatientContext = require("../services/contextBuilder");
const generateAgentResponse = require("../services/agentService");

const agentChat = async (req, res) => {
  try {
    const { patientId, task } = req.body;

    if (!patientId || !task) {
      return res.status(400).json({
        success: false,
        message: "patientId and task are required.",
      });
    }

    // Get patient with related data
    const patient = await prisma.patient.findUnique({
      where: {
        id: Number(patientId),
      },
      include: {
        conditions: true,
        medications: true,
        allergies: true,
        observations: true,
      },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    // Build context
    const patientContext = buildPatientContext(patient);

    // Generate agent response
    const result = generateAgentResponse(patientContext, task);

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  agentChat,
};