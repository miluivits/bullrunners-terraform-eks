import React, { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import "./Register.css";

export default function Register() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="login-page">
      <div className={`login-container ${animate ? "animate" : ""}`}>
        <RegisterForm key={animate ? "animated" : "static"} />
      </div>
    </div>
  );
}
