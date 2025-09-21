import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Searchbar from "../Searchbar"; // <-- import Searchbar
import Banner from "../Banner";
import logo from "../../images/onlyBULL.png";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar-container" ref={navRef}>
      <div className="navbar">
        {/* Bal oldali logó */}
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        {/* Középső navigáció */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><Link to="/portfolio">Portfolio Tracker</Link></li>
          <li><Link to="/cryptocurrencies">Cryptocurrencies</Link></li>
        </ul>

        {/* Jobb oldali elemek */}
        <div className="nav-right">
          <Searchbar /> {/* <-- Searchbar komponens használata */}
          {user ? (
            <>
              <Link to="/profile" className="btn">Profile</Link>
              <button className="btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn login">Login</Link> {/* <-- Login gomb */}
              <Link to="/register" className="btn get-started">Get Started</Link> {/* <-- Get Started link */}
            </>
          )}
        </div>

        {/* Hamburger ikon mobilra */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}
