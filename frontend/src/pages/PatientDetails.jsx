import "./PatientDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaHeartbeat,
  FaPills,
  FaAllergies,
  FaNotesMedical,
  FaRobot,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function PatientDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  useEffect(() => {

    fetchPatient();

  }, []);

  const fetchPatient = async () => {

    try {

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/patients/${id}`

      );

      setPatient(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleGenerate = async () => {

    Swal.fire({

      title: "Generating AI Summary...",

      allowOutsideClick: false,

      didOpen: () => Swal.showLoading(),

    });

    try {

      await axios.post(

        `${import.meta.env.VITE_API_URL}/api/patients/${id}/generate-summary`

      );

      Swal.fire({

        icon: "success",

        title: "AI Summary Generated",

        timer: 1500,

        showConfirmButton: false,

      });

      fetchPatient();

    } catch (err) {

      Swal.fire({

        icon: "error",

        title: "Generation Failed",

      });

    }

  };

  const handleDelete = async () => {

    const result = await Swal.fire({

      title: "Delete Patient?",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete",

      confirmButtonColor: "#dc2626",

    });

    if (!result.isConfirmed) return;

    try {

      await axios.delete(

         `${import.meta.env.VITE_API_URL}/api/patients/${id}`

      );

      Swal.fire({

        icon: "success",

        title: "Deleted Successfully",

      });

      navigate("/patients");

    } catch (err) {

      Swal.fire({

        icon: "error",

        title: "Delete Failed",

      });

    }

  };

  if (!patient) {
  
  return <h2>Loading...</h2>;
  }

    return (
  <div className="patientDetails">

    {/* Header */}

    <div className="header">

      <button
        className="backBtn"
        onClick={() => navigate("/patients")}
      >
        <FaArrowLeft />
        Back
      </button>

    </div>

    {/* Profile */}

    <div className="profileCard">

      <div className="avatar">
        {patient.name.charAt(0).toUpperCase()}
      </div>

      <div className="profileInfo">

        <h2>{patient.name}</h2>

        <p>
          {patient.gender} • {patient.age} Years
        </p>

        <span>
          Patient ID : #{patient.id}
        </span>

      </div>

      <div className="status">
        Active
      </div>

    </div>

    {/* Details */}

    <div className="detailsGrid">

      {/* Medical */}

      <div className="card">

        <h3>Medical Summary</h3>

        <div className="row">

          <FaHeartbeat />

          <div>

            <label>Condition</label>

            <p>

              {patient.conditions?.[0]?.condition ||
                "N/A"}

            </p>

          </div>

        </div>

        <div className="row">

          <FaPills />

          <div>

            <label>Medication</label>

            <p>

              {patient.medications?.[0]?.name ||
                "N/A"}

            </p>

          </div>

        </div>

        <div className="row">

          <FaAllergies />

          <div>

            <label>Allergy</label>

            <p>

              {patient.allergies?.[0]?.allergen ||
                "N/A"}

            </p>

          </div>

        </div>

        <div className="row">

          <FaNotesMedical />

          <div>

            <label>Observation</label>

            <p>

              {patient.observations?.[0]?.value ||
                "N/A"}

            </p>

          </div>

        </div>

      </div>

      {/* Actions */}

      <div className="card">

        <h3>Quick Actions</h3>

        <button
          className="blueBtn"
          onClick={handleGenerate}
        >

          <FaRobot />

          Generate AI Summary

        </button>

        <button
          className="orangeBtn"
          onClick={() =>
            navigate(`/edit/${patient.id}`)
          }
        >

          <FaEdit />

          Edit Patient

        </button>

        <button
          className="redBtn"
          onClick={handleDelete}
        >

          <FaTrash />

          Delete Patient

        </button>

      </div>

    </div>

    {/* AI Summary */}

    <div className="activityCard">

      <h3>AI Summary</h3>

      {patient.aiSummary ? (

        <div
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: "1.8",
          }}
        >
          {patient.aiSummary}
        </div>

      ) : (

        <p>No AI Summary Generated.</p>

      )}

    </div>

    {/* Activity */}

    <div className="activityCard">

      <h3>Recent Activity</h3>

      <div className="timeline">

        <div className="item">
          ✔ Patient Record Created
        </div>

        <div className="item">
          ✔ Medical Data Updated
        </div>

        <div className="item">
          ✔ Last Updated Today
        </div>

      </div>

    </div>

  </div>
);
}

  