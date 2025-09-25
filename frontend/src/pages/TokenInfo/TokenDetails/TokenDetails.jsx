import LeftDetails from "./LeftDetails.jsx";
import RightDetails from "./RightDetails.jsx";

import "./TokenDetails.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

export default function TokenDetails() {
  const { tokenId } = useParams();
  const { user } = useUser(); // bejelentkezett user a contextből
  const [detailedData, setDetailedData] = useState(null);
  const [portfolio, setPortfolio] = useState([]); // <- hozzáadva

  useEffect(() => {
    if (!tokenId) return;

    async function fetchDetailedData() {
      try {
        const cached = sessionStorage.getItem(`token-${tokenId}`);
        if (cached) {
          setDetailedData(JSON.parse(cached));
        } else {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${tokenId}`,
            {
              headers: { "x-cg-demo-api-key": "CG-uBfevfq9VNo4mH54FXXjS4vK" },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch token");
          const data = await response.json();
          sessionStorage.setItem(`token-${tokenId}`, JSON.stringify(data));
          setDetailedData(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchDetailedData();
  }, [tokenId]);

  useEffect(() => {
    if (!user?.username) return;

    async function fetchPortfolio() {
      try {
        const res = await fetch(`/api/portfolio/${user.username}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setPortfolio(data || []);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPortfolio();
  }, [user]);

  if (!tokenId) return <p>Token ID missing...</p>;
  if (!detailedData) return <p>Loading token details...</p>;

  return (
    <div className="chosen-token">
      <div className="left-section">
        <LeftDetails
          detailedData={detailedData}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
        />
      </div>
      <div className="right-section">
        <RightDetails detailedData={detailedData} />
      </div>
    </div>
  );
}
