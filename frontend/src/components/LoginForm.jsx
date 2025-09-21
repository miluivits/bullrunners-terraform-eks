import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./LoginForm.css";

export default function LoginForm() {
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

  return (
    <motion.div className="login-box" variants={container} initial="hidden" animate="show">
      <motion.p variants={item}>Welcome back!</motion.p>
      <form>
        <motion.div className="user-box" variants={item}>
          <input required type="text" />
          <label>Email</label>
        </motion.div>
        <motion.div className="user-box" variants={item}>
          <input required type="password" />
          <label>Password</label>
        </motion.div>
        <motion.a href="#" className="btn" variants={item}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </motion.a>
      </form>
      <motion.p variants={item}>
        Don't have an account? <Link to="/register" className="a2">Sign up!</Link>
      </motion.p>
    </motion.div>
  );
}
