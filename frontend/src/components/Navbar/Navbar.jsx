import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Searchbar from "../Searchbar";
import "./Navbar.css";
import "../Logoutbtn.css";
import "../MyProfileButton.css";

function Navbar() {
  const { user, logout } = useUser();

  return (
    <header className="Navbar">
      <nav className="navbar-elements">
        {/* Logo */}
        {user ? (
          <Link to="/" className="logo">
            <img src="../images/logo.png" alt="BullRunners logo" />
          </Link>
        ) : (
          <Link to="/" className="logo">
            BullRunners
          </Link>
        )}

        {/* Középen search bar */}
        <div className="grow">
          <Searchbar />
        </div>

        {/* Jobb oldal */}
        {user ? (
          <div className="navbar-buttons">
            <button onClick={logout} className="logoutButton">
              Logout
            </button>
            <Link to="/profile" className="myProfileButton">
              My profile
            </Link>
          </div>
        ) : (
          <div className="navbar-buttons">
            <Link to="/register" className="registerButton">
              Register
            </Link>
            <Link to="/login" className="loginButton">
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
