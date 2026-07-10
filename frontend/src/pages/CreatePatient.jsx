import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./CreatePatient.css";

export default function CreatePatient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    condition: "",
    medication: "",
    allergy: "",
    observation: "",
  });

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
      console.log(payload);

      await axios.post(
        "http://localhost:5000/api/patients",
        payload
      );

      Swal.fire({
        icon: "success",
        title: "Patient Created Successfully",
        text: "Patient has been saved.",
        confirmButtonColor: "#2563eb",
      });

      setFormData({
        name: "",
        age: "",
        gender: "Male",
        condition: "",
        medication: "",
        allergy: "",
        observation: "",
      });

    } catch (err) {
      console.log(err.response?.data);
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Unable to Save Patient",
        text:
          err.response?.data?.message ||
          "Internal Server Error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="createPatient">

      <div className="pageHeader">
        <h2>Create Patient</h2>
        <p>Add a synthetic patient record.</p>
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
              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          <div className="formGroup">

            <label>Condition</label>

            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            >

              <option value="">
                Select Condition
              </option>

              <option value="Diabetes">
                Diabetes
              </option>

              <option value="Hypertension">
                Hypertension
              </option>

              <option value="Asthma">
                Asthma
              </option>

              <option value="Heart Disease">
                Heart Disease
              </option>

              <option value="Kidney Disease">
                Kidney Disease
              </option>

            </select>

          </div>

          <div className="formGroup">

            <label>Medication</label>

            <select
              name="medication"
              value={formData.medication}
              onChange={handleChange}
            >

              <option value="">
                Select Medication
              </option>

              <option value="Metformin">
                Metformin
              </option>

              <option value="Insulin">
                Insulin
              </option>

              <option value="Paracetamol">
                Paracetamol
              </option>

              <option value="Aspirin">
                Aspirin
              </option>

            </select>

          </div>

          <div className="formGroup">

            <label>Allergy</label>

            <select
              name="allergy"
              value={formData.allergy}
              onChange={handleChange}
            >

              <option value="">
                Select Allergy
              </option>

              <option value="Penicillin">
                Penicillin
              </option>

              <option value="Dust">
                Dust
              </option>

              <option value="Milk">
                Milk
              </option>

              <option value="Peanuts">
                Peanuts
              </option>

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

        <button
          className="saveBtn"
          type="submit"
        >
          Save Patient
        </button>

      </form>

    </div>
  );
}