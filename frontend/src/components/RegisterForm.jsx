import React from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css";

export default function RegisterForm() {
  return (
    <div className="rlogin-box">
      <p>Create Account</p>
      <form>
        <div className="ruser-box">
          <input required type="text" />
          <label>Email</label>
        </div>
        <div className="ruser-box">
          <input required type="password" />
          <label>Password</label>
        </div>
        <div className="ruser-box">
          <input required type="password" />
          <label>Confirm Password</label>
        </div>
        <a href="#" className="rbtn">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Register
        </a>
      </form>
      <p>
        Already have an account? <Link to="/login" className="ra2">Login!</Link>
      </p>
    </div>
  );
}
