const prisma = require("../prisma");

const saveDraft = async (req, res) => {
  try {
    const { patientId, title, task, content, evidence } = req.body;

    if (!patientId || !title || !task || !content) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    const draft = await prisma.draft.create({
      data: {
        patientId: Number(patientId),
        title,
        task,
        content,
        evidence: JSON.stringify(evidence || []),
      },
    });

    res.status(201).json({
      success: true,
      message: "Draft saved successfully.",
      draft,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to save draft.",
    });
  }
};

const getDrafts = async (req, res) => {
  try {
    const drafts = await prisma.draft.findMany({
      where: {
        patientId: Number(req.params.patientId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(drafts);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  saveDraft,
  getDrafts,
};