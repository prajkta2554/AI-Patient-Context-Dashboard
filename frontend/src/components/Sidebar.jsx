import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaRobot,
  FaCog,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";

export default function Sidebar({
  menuOpen,
  setMenuOpen,
}) {

  const menu = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/",
    },
    {
      title: "Patients",
      icon: <FaUsers />,
      path: "/patients",
    },
    {
      title: "Create Patient",
      icon: <FaUserPlus />,
      path: "/create",
    },
    {
      title: "AI Workspace",
      icon: <FaRobot />,
      path: "/ai-workspace",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Overlay */}

      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={menuOpen ? "sidebar active" : "sidebar"}
      >

        <div className="logo">

          <div className="logoIcon">
            DX
          </div>

          <div>
            <h2>DataX</h2>
            <p>Patient Context</p>
          </div>

        </div>

        <nav className="menu">

          {menu.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}

              onClick={() => setMenuOpen(false)}

              className={({ isActive }) =>
                isActive
                  ? "menuItem active"
                  : "menuItem"
              }
            >

              <span className="menuIcon">
                {item.icon}
              </span>

              <span>
                {item.title}
              </span>

            </NavLink>

          ))}

        </nav>

        <div className="sidebarBottom">

          <div className="storage">

            <p>Storage</p>

            <div className="progress">
              <div className="progressFill"></div>
            </div>

            <small>72% Used</small>

          </div>

        </div>

      </aside>
    </>
  );
}