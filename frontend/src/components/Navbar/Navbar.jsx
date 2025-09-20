import React from "react";
import Searchbar from "../Searchbar";
import Loginbtn from "../Loginbtn";
import Registerbtn from "../Registerbtn";
import Banner from "../Banner";
import "./Navbar.css";
import "../Logoutbtn.css";
import "../MyProfileButton.css";

function Navbar() {
  return (
    <header className="Navbar">
      <Banner />

      <nav className="navbar-elements">
        {/* Logo */}
        <span className="logo">BullRunners</span>

        {/* Search bar */}
        <div className="grow">
          <Searchbar />
        </div>

        {/* Buttons */}
        <div className="navbar-buttons">
          <Registerbtn />
          <Loginbtn />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
