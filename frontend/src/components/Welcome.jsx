import React, { useEffect, useState } from "react";
import "./Welcome.css";

export default function Welcome() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on mount
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
    </div>
  );
}
