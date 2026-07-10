function buildPatientContext(patient) {
  return `
Patient Information

Name: ${patient.name}
Age: ${patient.age}
Gender: ${patient.gender}

Medical Conditions:
${patient.conditions
  .map(
    (c) =>
      `- ${c.condition} (${c.status})`
  )
  .join("\n")}

Medications:
${patient.medications
  .map(
    (m) =>
      `- ${m.name} (${m.dosage}, ${m.frequency})`
  )
  .join("\n")}

Allergies:
${patient.allergies
  .map(
    (a) =>
      `- ${a.allergen} (${a.reaction})`
  )
  .join("\n")}

Clinical Observations:
${patient.observations
  .map(
    (o) =>
      `- ${o.type}: ${o.value}`
  )
  .join("\n")}
`;
}

module.exports = buildPatientContext;