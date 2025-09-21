import React from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm() {
  return (
    <div className="login-box">
      <p>Welcome back!</p>
      <form>
        <div className="user-box">
          <input required type="text" />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input required type="password" />
          <label>Password</label>
        </div>
        <a href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </a>
      </form>
      <p>
        Don't have an account? <Link to="/register" className="a2">Sign up!</Link>
      </p>
    </div>
  );
}
