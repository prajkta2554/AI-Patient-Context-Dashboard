import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  FaUserInjured,
  FaRobot,
  FaClipboardList,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowRight,
  FaHeartbeat,
  FaUserMd,
} from "react-icons/fa";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/patients"
      );

      setPatients(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const totalPatients = patients.length;

  // Future API
  const aiDrafts = patients.filter(
  (patient) => patient.aiSummary
).length;
;

  const pendingReviews = patients.filter(
  (patient) => !patient.aiSummary
).length;

const criticalPatients = patients.filter((patient) => {

  const condition = patient.conditions?.[0]?.condition;

  return (
    condition === "Heart Disease" ||
    condition === "Kidney Disease"
  );

}).length;

  

  const recentPatients = [...patients]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 3);

  return (
    <div className="dashboard">

      {/* Welcome */}

      <div className="welcomeCard">

        <div>

          <h1>Welcome Back 👋</h1>

          <p>
            Monitor patients, generate AI summaries and
            manage medical records from one place.
          </p>

          <button>

            View Reports

            <FaArrowRight />

          </button>

        </div>

        <div className="welcomeIcon">

          <FaHeartbeat />

        </div>

      </div>

      {/* Statistics */}

      <div className="dashboardStats">

        <div className="dashboardCard blue">

          <div className="statTop">

            <FaUserInjured />

            <span>Total</span>

          </div>

          <h2>{totalPatients}</h2>

          <p>Total Patients</p>

        </div>

        <div className="dashboardCard green">

          <div className="statTop">

            <FaRobot />

            <span>AI</span>

          </div>

          <h2>{aiDrafts}</h2>

          <p>AI Summaries</p>

        </div>

        <div className="dashboardCard orange">

          <div className="statTop">

            <FaClipboardList />

            <span>Pending</span>

          </div>

          <h2>{pendingReviews}</h2>

          <p>Pending Reviews</p>

        </div>

        <div className="dashboardCard red">

          <div className="statTop">

            <FaExclamationTriangle />

            <span>Critical</span>

          </div>

          <h2>{criticalPatients}</h2>

          <p>Critical Cases</p>

        </div>

      </div>

      {/* Bottom */}

      <div className="dashboardGrid">

        {/* Recent Patients */}

        <div className="tableCard">

          <div className="cardHeader">

            <h2>Recent Patients</h2>

            <Link
              to="/patients"
              className="viewAllBtn"
            >
              View All
            </Link>

          </div>

          <table>

            <thead>

              <tr>

                <th>Patient</th>

                <th>Age</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {recentPatients.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No Patients Found
                  </td>

                </tr>

              ) : (

                recentPatients.map((patient) => (

                  <tr key={patient.id}>

                    <td>

                      <div className="patient">

                        <div className="patientAvatar">

                          {patient.name
                            .charAt(0)
                            .toUpperCase()}

                        </div>

                        <span className="patientName">
      {patient.name}
    </span>

                      </div>

                    </td>

                    <td>{patient.age}</td>

                    <td>

                      <span className="badge active">

                        Active

                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Activity */}

        <div className="activityCard">

          <h2>Today's Activity</h2>

          <div className="activityItem">

            <FaUserMd />

            <div>

              <h4>
                {totalPatients} Patients Registered
              </h4>

              <p>Database Updated</p>

            </div>

          </div>

          <div className="activityItem">

            <FaRobot />

            <div>

              <h4>
                {aiDrafts} AI Drafts Generated
              </h4>

              <p>Today's Count</p>

            </div>

          </div>

          <div className="activityItem">

            <FaClipboardList />

            <div>

              <h4>
                {pendingReviews} Pending Reviews
              </h4>

              <p>AI Summary Yet to be Generated</p>

            </div>

          </div>

          <div className="activityItem">

            <FaArrowUp />

            <div>

              <h4>
                {criticalPatients} Critical Patients
              </h4>

              <p>Need Immediate Attention</p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}