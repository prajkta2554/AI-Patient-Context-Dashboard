import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import CreatePatient from "./pages/CreatePatient";
import PatientDetails from "./pages/PatientDetails";
import AIWorkspace from "./pages/AIWorkspace";
import EditPatient from "./pages/EditPatient";

import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/patients" element={<Patients />} />

          <Route path="/create" element={<CreatePatient />} />

          <Route path="/ai-workspace" element={<AIWorkspace />} />
          <Route path="/edit/:id" element={<EditPatient />} />
          


<Route path="/settings" element={<Settings />} />

          <Route
            path="/patients/:id"
            element={<PatientDetails />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;