import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ username, password });
      navigate("/dashboard"); // átirányítás sikeres login után
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <motion.div className="login-box" variants={container} initial="hidden" animate="show">
      <motion.p variants={item}>Welcome back!</motion.p>
      <form onSubmit={handleSubmit}>
        <motion.div className="user-box" variants={item}>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </motion.div>
        <motion.div className="user-box" variants={item}>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </motion.div>
          <motion.a href="#" className="btn" variants={item} onClick={handleSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </motion.a>
      </form>
      {error && <motion.p variants={item} style={{ color: "red" }}>{error}</motion.p>}
      <motion.p variants={item}>
        Don't have an account? <Link to="/register" className="a2">Sign up!</Link>
      </motion.p>
    </motion.div>
  );
}
