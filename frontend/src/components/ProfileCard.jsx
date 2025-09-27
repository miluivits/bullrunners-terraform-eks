// ProfileCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProfileCard.css"; 
import profileicon from "../images/profileicon.png";

export default function ProfileCard({ user, onTerminate }) {
  const [randomRole, setRandomRole] = useState("");

  useEffect(() => {
    const cryptoRoles = [
      "HODLer Supreme",
      "DeFi Explorer",
      "Whale Watcher",
      "Moon Chaser",
      "Bitcoin Believer",
      "Altcoin Adventurer",
      "Token Collector",
      "Staking Guru",
      "Yield Farmer",
      "NFT Enthusiast",
      "Crypto Maverick",
      "Blockchain Pioneer",
    ];
    const randomIndex = Math.floor(Math.random() * cryptoRoles.length);
    setRandomRole(cryptoRoles[randomIndex]);
  }, []);

  return (
    <div className="card">
      <div 
        className="image" 
        style={{ backgroundImage: `url(${profileicon})`, backgroundSize: "cover", backgroundPosition: "center" }}
      ></div>
      <div className="card-info">
        <span>{user.username}</span>
        <p>{randomRole}</p>
      </div>
      <div className="button-wrapper">
        <Link to="/portfolio" className="button">
          Portfolio
        </Link>
        <button onClick={onTerminate} className="button-terminate">
          Terminate Account
        </button>
      </div>
    </div>
  );
}
