const generateAgentResponse = (patientContext, task) => {
  const lowerTask = task.toLowerCase();

  // 🚫 Unsafe requests
  const blockedKeywords = [
    "diagnosis",
    "diagnose",
    "treatment",
    "prescribe",
    "medication change",
    "medicine",
    "drug",
    "dosage",
  ];

  const isBlocked = blockedKeywords.some((word) =>
    lowerTask.includes(word)
  );

  if (isBlocked) {
    return {
      success: false,
      message:
        "Unsupported request. This system cannot provide diagnoses or treatment recommendations.",
      reviewRequired: true,
    };
  }

  // Supported tasks
  let draft = "";

  if (
    lowerTask.includes("handover") ||
    lowerTask.includes("summary")
  ) {
    draft = `
Patient Summary

${patientContext.oneLiner}

Active Problems:
${patientContext.activeProblems.join(", ") || "None"}

Current Medications:
${patientContext.currentMedications.join(", ") || "None"}

Allergies:
${patientContext.allergies.join(", ") || "None"}

Risk Flags:
${patientContext.riskFlags.join(", ") || "None"}

Missing Information:
${patientContext.missingInformation.join(", ") || "None"}

This summary is intended for clinician review only.
`;
  } else if (lowerTask.includes("risk")) {
    draft =
      patientContext.riskFlags.length > 0
        ? patientContext.riskFlags.join(", ")
        : "No major risk flags identified.";
  } else if (lowerTask.includes("missing")) {
    draft =
      patientContext.missingInformation.length > 0
        ? patientContext.missingInformation.join(", ")
        : "No missing information.";
  } else {
    draft =
      "Supported tasks include: handover summary, patient summary, risk flags, and missing information.";
  }

  return {
    success: true,

    task,

    patientContext,

    steps: [
      "Loaded patient",
      "Built patient context",
      "Generated clinician draft",
    ],

    draft,

    evidence: patientContext.evidence,

    uncertainty: patientContext.missingInformation,

    reviewRequired: true,
  };
};

module.exports = generateAgentResponse;