import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaEye,
  FaTrash,
  FaEdit,
  FaUserPlus,
  FaUserInjured,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaFileMedical,
} from "react-icons/fa";

import "./Patients.css";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/patients`);

      setPatients(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const aiSummaryCount = patients.filter(
    (patient) => patient.aiSummary
  ).length;

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Patient?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/patients/${id}`
      );

      Swal.fire({
        icon: "success",
        title: "Patient Deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchPatients();

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unable to Delete",
      });
    }
  };

  const criticalPatients = patients.filter((patient) => {
  const condition = patient.conditions?.[0]?.condition;

  return (
    condition === "Heart Disease" ||
    condition === "Kidney Disease"
  );
});
  return (
    <div className="patientsPage">

      {/* Header */}

      <div className="patientsHeader">

        <div>

          <h2>Patients</h2>

          <p>Manage all patient records</p>

        </div>

        <Link
          to="/create"
          className="createBtn"
        >
          <FaUserPlus />
          Create Patient
        </Link>

      </div>

      {/* Stats */}

      <div className="statsGrid">

        <div className="statCard blue">

          <div className="statTop">
            <FaUserInjured />
            <span>Total</span>
          </div>

          <h2>{patients.length}</h2>

          <p>Total Patients</p>

        </div>

        <div className="statCard green">

          <div className="statTop">
            <FaClipboardCheck />
            <span>Active</span>
          </div>

          <h2>{patients.length}</h2>

          <p>Active Cases</p>

        </div>

        <div className="statCard orange">

          <div className="statTop">
            <FaExclamationTriangle />
            <span>Critical</span>
          </div>

          <h2>{criticalPatients.length}</h2>

<p>Critical Cases</p>

        </div>

        <div className="statCard purple">

          <div className="statTop">
            <FaFileMedical />
            <span>AI</span>
          </div>

          <h2>{aiSummaryCount}</h2>

          <p>AI Summaries</p>

        </div>

      </div>

      {/* Search */}

      <div className="searchBox">

        <FaSearch />

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Table */}

      <div className="tableCard">

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Age</th>

              <th>Gender</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredPatients.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="empty"
                >
                  No Patients Found
                </td>

              </tr>

            ) : (

              filteredPatients.map((patient) => (

                <tr key={patient.id}>

                  <td>

                    <div className="patientInfo">

                      <div className="Avatar">

                        {patient.name
                          .charAt(0)
                          .toUpperCase()}

                      </div>

                      <span>
                        {patient.name}
                      </span>

                    </div>

                  </td>

                  <td>{patient.age}</td>

                  <td>{patient.gender}</td>

                  <td>

                    <span className="badge">

                      Active

                    </span>

                  </td>

                  <td>

                    <div className="actionButtons">

                      <Link
                        to={`/patients/${patient.id}`}
                        className="viewBtn"
                      >
                        <FaEye />
                      </Link>

                      <button
  className="editBtn"
  onClick={() => navigate(`/edit/${patient.id}`)}
>
  <FaEdit />
</button>

                      <button
                        className="deleteBtn"
                        onClick={() =>
                          handleDelete(patient.id)
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}