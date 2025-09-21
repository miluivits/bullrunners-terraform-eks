import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Searchbar from "../Searchbar";
import "./Navbar.css";
import "../Logoutbtn.css";
import "../MyProfileButton.css";
import logo from "../../images/onlyBULL.png";

function Navbar() {
  const { user, logout } = useUser();

  return (
    <header className="Navbar">
      <nav className="navbar-elements">
        <Link to="/" className="logo">
          <img src={logo} alt="BullRunners logo" />
        </Link>

        <div className="navbar-buttons">
          {user ? (
            <>
              <button onClick={logout} className="btn">
                Logout
              </button>
              <Link to="/profile" className="btn">
                My profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="btn">
                Register
              </Link>
              <Link to="/login" className="lgnbtn">
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
