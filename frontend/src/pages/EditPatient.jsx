import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import "./CreatePatient.css";

export default function EditPatient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    condition: "",
    medication: "",
    allergy: "",
    observation: "",
  });

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/patients/${id}`
      );

      const patient = res.data;

      setFormData({
        name: patient.name || "",
        age: patient.age || "",
        gender: patient.gender || "Male",
        condition: patient.conditions?.[0]?.condition || "",
        medication: patient.medications?.[0]?.name || "",
        allergy: patient.allergies?.[0]?.allergen || "",
        observation: patient.observations?.[0]?.value || "",
      });
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Patient not found",
      });

      navigate("/patients");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      age: Number(formData.age),
      gender: formData.gender,

      conditions: formData.condition
        ? [
            {
              condition: formData.condition,
              status: "Active",
              onsetDate: "2024",
            },
          ]
        : [],

      medications: formData.medication
        ? [
            {
              name: formData.medication,
              dosage: "1 Tablet",
              frequency: "Daily",
            },
          ]
        : [],

      allergies: formData.allergy
        ? [
            {
              allergen: formData.allergy,
              reaction: "Unknown",
            },
          ]
        : [],

      observations: formData.observation
        ? [
            {
              type: "Clinical Note",
              value: formData.observation,
              unit: "",
            },
          ]
        : [],
    };

    try {
      await axios.put(
       `${import.meta.env.VITE_API_URL}/api/patients/${id}`,
        payload
      );

      Swal.fire({
        icon: "success",
        title: "Patient Updated Successfully",
        confirmButtonColor: "#2563eb",
      });

      navigate(`/patients/${id}`);
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Unable to Update Patient",
      });
    }
  };
    return (
    <div className="createPatient">

      <div className="pageHeader">
        <h2>Edit Patient</h2>
        <p>Update patient information.</p>
      </div>

      <form
        className="patientForm"
        onSubmit={handleSubmit}
      >

        <div className="grid">

          <div className="formGroup">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="formGroup">

            <label>Age</label>

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />

          </div>

          <div className="formGroup">

            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >

              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>

            </select>

          </div>

          <div className="formGroup">

            <label>Condition</label>

            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            >

              <option value="">Select Condition</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Hypertension">Hypertension</option>
              <option value="Asthma">Asthma</option>
              <option value="Heart Disease">Heart Disease</option>
              <option value="Kidney Disease">Kidney Disease</option>

            </select>

          </div>

          <div className="formGroup">

            <label>Medication</label>

            <select
              name="medication"
              value={formData.medication}
              onChange={handleChange}
            >

              <option value="">Select Medication</option>
              <option value="Metformin">Metformin</option>
              <option value="Insulin">Insulin</option>
              <option value="Paracetamol">Paracetamol</option>
              <option value="Aspirin">Aspirin</option>

            </select>

          </div>

          <div className="formGroup">

            <label>Allergy</label>

            <select
              name="allergy"
              value={formData.allergy}
              onChange={handleChange}
            >

              <option value="">Select Allergy</option>
              <option value="Penicillin">Penicillin</option>
              <option value="Dust">Dust</option>
              <option value="Milk">Milk</option>
              <option value="Peanuts">Peanuts</option>

            </select>

          </div>

        </div>

        <div className="formGroup">

          <label>Observation</label>

          <textarea
            rows="5"
            name="observation"
            placeholder="Doctor observation..."
            value={formData.observation}
            onChange={handleChange}
          />

        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
          }}
        >

          <button
            className="saveBtn"
            type="submit"
          >
            Update Patient
          </button>

          <button
            type="button"
            className="saveBtn"
            style={{
              background: "#6b7280",
            }}
            onClick={() => navigate(`/patients/${id}`)}
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}