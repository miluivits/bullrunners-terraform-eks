import React from "react";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer/Footer";
import "./Main.css";

export default function Main() {
  return (
    <div className="main-page">
      <section className="section welcome-section">
        <Welcome />
      </section>

      <section className="section second-section">
        <div className="content-container">
          <h2>Market Overview</h2>
          <p>Check out the latest crypto market trends here.</p>
        </div>
      </section>

      {/* Third section: placeholder */}
      <section className="section third-section">
        <div className="content-container">
          <h2>Your Portfolio</h2>
          <p>Track all your crypto assets in one place.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
