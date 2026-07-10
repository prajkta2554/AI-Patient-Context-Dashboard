import "./Settings.css";
import { useState } from "react";
import Swal from "sweetalert2";

import {
  FaUserCog,
  FaRobot,
  FaBell,
  FaLock,
  FaPalette,
  FaDatabase,
  FaInfoCircle,
  FaSave,
} from "react-icons/fa";

export default function Settings() {
  const [settings, setSettings] = useState({
    name: "Admin User",
    email: "admin@datacontext.ai",
    hospital: "City Hospital",
    role: "Administrator",

    aiEnabled: true,
    autoGenerate: true,
    smartSuggestion: false,

    emailNotification: true,
    criticalAlert: true,
    dailyReport: true,
    weeklyAnalytics: false,

    theme: "Light",
    model: "Mock AI",
    summary: "Medium",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    Swal.fire({
      icon: "success",
      title: "Settings Saved",
      text: "Your settings have been updated successfully.",
      confirmButtonColor: "#2563eb",
    });
  };

  return (
    <div className="settingsPage">

      <div className="pageHeader">
        <h1>Settings</h1>
        <p>Manage your application preferences.</p>
      </div>

      {/* Profile */}

      <div className="settingsCard">

        <h2>
          <FaUserCog />
          Profile Settings
        </h2>

        <div className="settingsGrid">

          <input
            name="name"
            value={settings.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <input
            name="email"
            value={settings.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            name="hospital"
            value={settings.hospital}
            onChange={handleChange}
            placeholder="Hospital"
          />

          <input
            name="role"
            value={settings.role}
            onChange={handleChange}
            placeholder="Role"
          />

        </div>

      </div>

      {/* AI */}

      <div className="settingsCard">

        <h2>
          <FaRobot />
          AI Settings
        </h2>

        <div className="checkboxGroup">

          <label>
            <input
              type="checkbox"
              name="aiEnabled"
              checked={settings.aiEnabled}
              onChange={handleChange}
            />
            Enable AI Summary
          </label>

          <label>
            <input
              type="checkbox"
              name="autoGenerate"
              checked={settings.autoGenerate}
              onChange={handleChange}
            />
            Auto Generate Summary
          </label>

          <label>
            <input
              type="checkbox"
              name="smartSuggestion"
              checked={settings.smartSuggestion}
              onChange={handleChange}
            />
            Smart Suggestions
          </label>

        </div>

      </div>

      {/* Notifications */}

      <div className="settingsCard">

        <h2>
          <FaBell />
          Notifications
        </h2>

        <div className="checkboxGroup">

          <label>
            <input
              type="checkbox"
              name="emailNotification"
              checked={settings.emailNotification}
              onChange={handleChange}
            />
            Email Notifications
          </label>

          <label>
            <input
              type="checkbox"
              name="criticalAlert"
              checked={settings.criticalAlert}
              onChange={handleChange}
            />
            Critical Patient Alerts
          </label>

          <label>
            <input
              type="checkbox"
              name="dailyReport"
              checked={settings.dailyReport}
              onChange={handleChange}
            />
            Daily Reports
          </label>

          <label>
            <input
              type="checkbox"
              name="weeklyAnalytics"
              checked={settings.weeklyAnalytics}
              onChange={handleChange}
            />
            Weekly Analytics
          </label>

        </div>

      </div>

      {/* Security */}

      <div className="settingsCard">

        <h2>
          <FaLock />
          Security
        </h2>

        <div className="settingsGrid">

          <input
            type="password"
            placeholder="Current Password"
          />

          <input
            type="password"
            placeholder="New Password"
          />

          <input
            type="password"
            placeholder="Confirm Password"
          />

        </div>

      </div>

      {/* Appearance */}

      <div className="settingsCard">

        <h2>
          <FaPalette />
          Appearance
        </h2>

        <select
          name="theme"
          value={settings.theme}
          onChange={handleChange}
        >
          <option>Light</option>
          <option>Dark</option>
        </select>

      </div>

      {/* Database */}

      <div className="settingsCard">

        <h2>
          <FaDatabase />
          Database
        </h2>

        <p>
          <b>Status:</b> Connected
        </p>

        <p>
          <b>Storage Used:</b> 72%
        </p>

        <p>
          <b>Last Backup:</b> Today
        </p>

      </div>

      {/* System */}

      <div className="settingsCard">

        <h2>
          <FaInfoCircle />
          System Information
        </h2>

        <p>Version : 1.0.0</p>

        <p>Backend : Node.js + Express</p>

        <p>Database : SQLite</p>

        <p>AI Engine : Mock AI</p>

      </div>

      <button
        className="saveSettingsBtn"
        onClick={handleSave}
      >
        <FaSave />
        Save All Settings
      </button>

    </div>
  );
}