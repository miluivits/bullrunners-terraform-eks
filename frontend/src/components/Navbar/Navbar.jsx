import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import LoginRegisterPopup from "./LoginRegisterPopup";
import Banner from "../Banner"; // <-- Banner import
import "./Navbar.css";
import logo from "../../images/onlyBULL.png";

function Navbar() {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="Navbar" ref={navRef}>
      <nav className="navbar-elements">
        {/* Logo bal oldalt */}
        <Link to="/" className="logo" onClick={handleLinkClick}>
          <img src={logo} alt="BullRunners logo" />
        </Link>

        {/* Banner középen */}
        <div className="navbar-banner">
          <Banner />
        </div>

        {/* Jobb oldali gombok */}
        <div className={`navbar-buttons ${isOpen ? "active" : ""}`}>
          {user ? (
            <>
              <button
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
                className="btn"
              >
                Logout
              </button>
              <Link to="/profile" className="btn" onClick={handleLinkClick}>
                My profile
              </Link>
            </>
          ) : (
            <>
              <LoginRegisterPopup />
            </>
          )}
        </div>

        {/* Hamburger ikon */}
        <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
