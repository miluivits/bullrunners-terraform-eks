import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Searchbar from "../Searchbar";
import "./Navbar.css";
import "../Logoutbtn.css";
import "../MyProfileButton.css";
import logo from "../../images/logo.png";

function Navbar() {
  const { user, logout } = useUser();

  return (
    <header className="Navbar">
      <nav className="navbar-elements">
        {/* Logo always on the left */}
        <Link to="/" className="logo">
          <img src={logo} alt="BullRunners logo" />
        </Link>

        {/* Search bar in the center */}
        <div className="grow">
          <Searchbar />
        </div>

        {/* Right side buttons */}
        <div className="navbar-buttons">
          {user ? (
            <>
              <button onClick={logout} className="logoutButton">
                Logout
              </button>
              <Link to="/profile" className="myProfileButton">
                My profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="registerButton">
                Register
              </Link>
              <Link to="/login" className="loginButton">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
