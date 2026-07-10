import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import "./Layout.css";

export default function Layout() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="layout">

      <Sidebar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <div className="layoutMain">

        <Navbar
          setMenuOpen={setMenuOpen}
        />

        <div className="layoutContent">
          <Outlet />
        </div>

      </div>

    </div>
  );
}