import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import "./Login.css";

export default function Login() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Reset animation each time component mounts
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50); // kis delay, hogy a transition lefusson
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="login-page">
      <div className={`login-container ${animate ? "animate" : ""}`}>
        <LoginForm key={animate ? "animated" : "static"} />
      </div>
    </div>
  );
}
