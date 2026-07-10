import { useState, useEffect } from "react";

import "./AIWorkspace.css";

import {
  FaRobot,
  FaSearch,
  FaMagic,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

export default function AIWorkspace() {

  const [patients, setPatients] = useState([]);
const [search, setSearch] = useState("");
useEffect(() => {
  fetchPatients();
}, []);

const fetchPatients = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/patients");
    setPatients(res.data);
  } catch (err) {
    console.log(err);
  }
};

const filteredPatients = patients.filter((patient) =>
  patient.name.toLowerCase().includes(search.toLowerCase())
);

const handleGenerate = async (patientId, patientName) => {

  Swal.fire({
    title: "Generating AI Summary...",
    text: `Generating summary for ${patientName}`,
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  try {

    const res = await axios.post(
      `http://localhost:5000/api/patients/${patientId}/generate-summary`
    );

    await fetchPatients();

    Swal.fire({
      icon: "success",
      title: "AI Summary Generated",
      html: `
        <div style="text-align:left;max-height:300px;overflow:auto;">
          <b>Patient:</b> ${patientName}<br><br>
          ${res.data.summary}
        </div>
      `,
      width: 700,
    });

  } catch (err) {

    Swal.fire({
      icon: "error",
      title: "Unable to Generate Summary",
    });

  }
};
  return (
    <div className="workspace">

      {/* Header */}

      <div className="workspaceHeader">

        <div>
          <h1>AI Workspace</h1>
          <p>
            Generate AI-powered summaries and reports.
          </p>
        </div>

        <button className="generateBtn">
          <FaMagic />
          Generate Summary
        </button>

      </div>

      {/* Search */}

      <div className="searchBox">

        <FaSearch />

        <input
  type="text"
  placeholder="Search patient..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

      </div>

      {/* Patients */}

      <div className="workspaceTable">

        <table>

          <thead>

            <tr>

              <th>Patient</th>

              <th>Disease</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>
           <tbody>

  {filteredPatients.map((patient) => (

    <tr key={patient.id}>

      <td>{patient.name}</td>

      <td>
        {patient.conditions?.length > 0
          ? patient.conditions[0].condition
          : "N/A"}
      </td>

      <td>
        <span className="activeBadge">
          Active
        </span>
      </td>

      <td>

        <button
          className="generateSmall"
          onClick={() =>
  handleGenerate(patient.id, patient.name)
}
        >
          <FaRobot />
          Generate
        </button>

      </td>

    </tr>

  ))}

</tbody>
        

        </table>

      </div>

      {/* Bottom */}

      <div className="workspaceBottom">

        <div className="summaryCard">

          <h2>Recent AI Summaries</h2>
{patients
  .filter((patient) => patient.aiSummary)
  .slice(0, 5)
  .map((patient) => (

    <div
      className="summaryItem"
      key={patient.id}
    >
      <FaFileAlt />

      <div>

        <b>{patient.name}</b>

        <p>
          {patient.aiSummary.substring(0, 60)}...
        </p>

      </div>

    </div>

))}
          

        </div>

        <div className="summaryCard">

          <h2>AI Statistics</h2>

          <div className="statRow">

            <span>Total AI Summaries</span>

<b>
{
patients.filter(
(p)=>p.aiSummary
).length
}
</b>

          </div>

          <div className="statRow">

            <span>Patients</span>

<b>{patients.length}</b>

          </div>

          <div className="statRow">

            <span>Completed</span>

<b>
{
patients.filter(
(p)=>p.aiSummary
).length
}
</b>

          </div>

          <div className="statRow">

            <span>Pending</span>

<b>
{
patients.filter(
(p)=>!p.aiSummary
).length
}
</b>

          </div>

        </div>

      </div>

    </div>
  );
}