import React from "react";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer/Footer";
import MarketOverview from "../components/MarketOverview";
import "./Main.css";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Main() {
  const { user } = useUser();

  return (
    <div className="main-page">
      {/* First section: Welcome */}
      <section className="section welcome-section">
        <Welcome />
      </section>

      {/* Second section: Market Overview */}
      <section className="section second-section">
        <MarketOverview />
      </section>

      {/* Third section: Your Portfolio */}
      <section className="section third-section">
        <div className="content-container">
          {user ? (
            <>
              <h2>Your Portfolio Overview</h2>
              <p>See all your crypto assets and manage them easily.</p>
              <Link to="/portfolio" className="portfolio-btn">
                View Portfolio
              </Link>
            </>
          ) : (
            <>
              <h2>Do not hesitate!</h2>
              <p>Track all your crypto assets in one place.</p>
              <Link to="/register" className="register-btn">
                Register Now
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
