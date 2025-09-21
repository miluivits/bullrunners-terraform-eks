import React, { useEffect, useState } from "react";
import "./Welcome.css";

export default function Welcome() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`header-container ${animate ? "animate" : ""}`}>
      <h1 className="header-title">
        <span className="gradient-text">The Ultimate</span> Crypto Portfolio Tracker
      </h1>
      <p className="header-subtitle">
        Start effectively managing your entire portfolio with our portfolio tracker!
      </p>

      {/* Smooth scroll nyíl */}
      <div className="scroll-down">↓</div>
    </div>
  );
}
