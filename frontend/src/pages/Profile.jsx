// Profile.js
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { user, loading } = useUser();
  const [tokens, setTokens] = useState([]);
  const [tokenLoading, setTokenLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    async function fetchPortfolio() {
      try {
        setTokenLoading(true);
        const res = await fetch(`/api/portfolio/${user.username}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setTokens(data);
        } else {
          setTokens([]);
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setTokens([]);
      } finally {
        setTokenLoading(false);
      }
    }

    fetchPortfolio();
  }, [user]);

  if (loading) return <p className="loading-text">Loading profile...</p>;
  if (!user) return <p className="loading-text">No user logged in.</p>;

  async function handleTerminate() {
    const confirmDelete = window.confirm(
      "Biztos vagy benne, hogy törlöd az accountodat? Ez nem visszavonható."
    );

    if (confirmDelete) {
      try {
        const res = await fetch(`/api/users/${user.username}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (res.ok) {
          alert("Account sikeresen törölve.");
          navigate("/"); // visszadob a főoldalra
        } else {
          alert("Hiba történt az account törlése közben.");
        }
      } catch (err) {
        console.error("Delete error:", err);
        alert("Nem sikerült törölni az accountot.");
      }
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-section">
        <h2 className="profile-username">{user.username}</h2>

        <div className="profile-buttons">
          <Link to="/browse-coins" className="profile-btn">
            Browse Coins
          </Link>
          <Link to="/portfolio-manager" className="profile-btn">
            Portfolio Manager
          </Link>
          <button onClick={handleTerminate} className="profile-btn danger">
            Terminate Account
          </button>
        </div>

        <h3 className="section-title">Your Portfolio</h3>
        {tokenLoading ? (
          <p className="loading-text">Loading portfolio...</p>
        ) : tokens.length === 0 ? (
          <p className="loading-text">No tokens yet.</p>
        ) : (
          <div className="portfolio-grid">
            {tokens.map((token) => (
              <div key={token.name} className="token-card">
                <p className="token-value">
                  {token.amount} {token.name}
                </p>
                <p className="token-label">{token.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
