const prisma = require("../prisma");
const generatePatientSummary = require("../services/aiService");

// ================= CREATE PATIENT =================

const createPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      conditions,
      medications,
      allergies,
      observations,
    } = req.body;

    const patient = await prisma.patient.create({
      data: {
        name,
        age: Number(age),
        gender,

        conditions: {
          create: conditions || [],
        },

        medications: {
          create: medications || [],
        },

        allergies: {
          create: allergies || [],
        },

        observations: {
          create: observations || [],
        },
      },

      include: {
        conditions: true,
        medications: true,
        allergies: true,
        observations: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Patient Created Successfully",
      patient,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to create patient",
    });
  }
};

// ================= GET ALL PATIENTS =================

const getPatients = async (req, res) => {
  try {
   const patients = await prisma.patient.findMany({

  include:{

    conditions:true,

  },

  orderBy:{

    createdAt:"desc",

  },

});

    res.json(patients);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching patients",
    });
  }
};

// ================= GET PATIENT BY ID =================

const getPatientById = async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: Number(req.params.id),
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
        message: "Patient not found",
      });
    }

    res.json(patient);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= PATIENT CONTEXT =================

const getPatientContext = async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: Number(req.params.id),
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
        message: "Patient not found",
      });
    }

    res.json(patient);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= GENERATE AI SUMMARY =================

const generateSummary = async (req, res) => {
  try {

    const patient = await prisma.patient.findUnique({
      where: {
        id: Number(req.params.id),
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
        message: "Patient not found",
      });
    }

    const summary = await generatePatientSummary(patient);

    await prisma.patient.update({
      where: {
        id: patient.id,
      },

      data: {
        aiSummary: summary,
      },
    });

    res.json({
      success: true,
      message: "AI Summary Generated Successfully",
      summary,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to generate AI Summary",
    });
  }
};

// ================= UPDATE PATIENT =================

const updatePatient = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      age,
      gender,
      conditions,
      medications,
      allergies,
      observations,
    } = req.body;

    const patient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // Delete old child records

    await prisma.condition.deleteMany({
      where: { patientId: id },
    });

    await prisma.medication.deleteMany({
      where: { patientId: id },
    });

    await prisma.allergy.deleteMany({
      where: { patientId: id },
    });

    await prisma.observation.deleteMany({
      where: { patientId: id },
    });

    // Update patient

    const updatedPatient = await prisma.patient.update({
      where: { id },

      data: {
        name,
        age: Number(age),
        gender,

        conditions: {
          create: conditions || [],
        },

        medications: {
          create: medications || [],
        },

        allergies: {
          create: allergies || [],
        },

        observations: {
          create: observations || [],
        },
      },

      include: {
        conditions: true,
        medications: true,
        allergies: true,
        observations: true,
      },
    });

    res.json({
      success: true,
      message: "Patient Updated Successfully",
      patient: updatedPatient,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to update patient",
    });

  }
};



// ================= DELETE PATIENT =================

const deletePatient = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const patient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {

      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });

    }

    await prisma.condition.deleteMany({
      where: { patientId: id },
    });

    await prisma.medication.deleteMany({
      where: { patientId: id },
    });

    await prisma.allergy.deleteMany({
      where: { patientId: id },
    });

    await prisma.observation.deleteMany({
      where: { patientId: id },
    });

    await prisma.patient.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Patient Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to delete patient",
    });

  }

};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  getPatientContext,
  generateSummary,
   updatePatient,
  deletePatient,
};