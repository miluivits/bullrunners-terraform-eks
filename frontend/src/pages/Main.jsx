import React from "react";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer/Footer";
import MarketOverview from "../components/MarketOverview"; // <-- import
import "./Main.css";

export default function Main() {
  return (
    <div className="main-page">
      {/* First section: Welcome */}
      <section className="section welcome-section">
        <Welcome />
      </section>

      {/* Second section: Market Overview */}
      <section className="section second-section">
        <MarketOverview /> {/* <-- itt használjuk */}
      </section>

      {/* Third section: Your Portfolio */}
      <section className="section third-section">
        <div className="content-container">
          <h2>Your Portfolio</h2>
          <p>Track all your crypto assets in one place.</p>
        </div>
      </section>
    </div>
  );
}
