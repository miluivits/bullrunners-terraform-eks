import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import "./RegisterForm.css";

export default function RegisterForm() {
  const { register } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register({ username, password });
      navigate("/dashboard"); // sikeres regisztráció után
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <motion.div className="rlogin-box" variants={container} initial="hidden" animate="show">
      <motion.p variants={item}>Create Account</motion.p>
      <form>
        <motion.div className="ruser-box" variants={item}>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </motion.div>
        <motion.div className="ruser-box" variants={item}>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </motion.div>
        <motion.div className="ruser-box" variants={item}>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>Confirm Password</label>
        </motion.div>
        <motion.a
          href="#"
          className="rbtn"
          variants={item}
          onClick={handleSubmit}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Register
        </motion.a>
      </form>
      {error && <motion.p variants={item} style={{ color: "red" }}>{error}</motion.p>}
      <motion.p variants={item}>
        Already have an account? <Link to="/login" className="ra2">Login!</Link>
      </motion.p>
    </motion.div>
  );
}
