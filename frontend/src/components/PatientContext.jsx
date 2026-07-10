function PatientContext({ context }) {
  if (!context) return null;

  return (
    <div
      style={{
        marginTop: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        background: "#f9fafb",
      }}
    >
      <h2>🩺 Derived Patient Context</h2>

      <p>
        <strong>One-Liner:</strong> {context.oneLiner}
      </p>

      <h3>Active Problems</h3>
      <ul>
        {context.activeProblems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Current Medications</h3>
      <ul>
        {context.currentMedications.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Risk Flags</h3>
      <ul>
        {context.riskFlags.length === 0 ? (
          <li>No risk flags</li>
        ) : (
          context.riskFlags.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        )}
      </ul>

      <h3>Missing Information</h3>
      <ul>
        {context.missingInformation.length === 0 ? (
          <li>None</li>
        ) : (
          context.missingInformation.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        )}
      </ul>

      <h3>Evidence</h3>
      <ul>
        {context.evidence.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientContext;