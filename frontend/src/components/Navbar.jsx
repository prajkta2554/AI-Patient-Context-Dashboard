import { useLocation } from "react-router-dom";
import "./Navbar.css";
import {
 FaBars ,
} from "react-icons/fa";

export default function Navbar({ setMenuOpen }) {

  const location = useLocation();

  let title = "Dashboard";
  let path = "Home / Dashboard";

  if (location.pathname === "/patients") {
    title = "Patients";
    path = "Home / Patients";
  }

  if (location.pathname === "/create") {
    title = "Create Patient";
    path = "Home / Patients / Create Patient";
  }

  if (location.pathname.includes("/patients/")) {
    title = "Patient Details";
    path = "Home / Patients / Patient Details";
  }


  return (
    <div className="navbar">

    <div className="navbarLeft">

        <button
            className="menuBtn"
            onClick={() => setMenuOpen(true)}
        >
            <FaBars />
        </button>

        <div>
            <h2>{title}</h2>
            <p>{path}</p>
        </div>

    </div>

    <div className="profile">
        👨‍⚕️ Admin
    </div>

</div>
  );
}