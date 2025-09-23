import React, { useState, useEffect, useCallback } from "react";
import "./MarketOverview.css";

export default function MarketOverview() {
  const [tokens, setTokens] = useState([]);

  const fetchTokens = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1",
        {
          headers: {
            "x-cg-demo-api-key": "CG-uBfevfq9VNo4mH54FXXjS4vK"
          }
        }
      );
      const data = await response.json();
      setTokens(data);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  }, []);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return (
    <div className="market-overview-container">
      <h2>Market Overview</h2>
      <p>Check out the latest crypto market trends here.</p>

      <div className="market-cards">
        {tokens.map((token) => (
          <div key={token.id} className="market-card">
            <img src={token.image} alt={token.name} className="token-logo" />
            <p className="token-name">{token.name}</p>
            <p className="token-price">${token.current_price.toLocaleString()}</p>
            <p className={`token-change ${token.price_change_percentage_24h >= 0 ? "up" : "down"}`}>
              {token.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
