import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import "./TokenDetails.css";

export default function TokenDetails() {
  const { tokenId } = useParams(); 
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTokenData = useCallback(async () => {
    setLoading(true);
    try {
      const cached = sessionStorage.getItem(`token-${tokenId}`);
      if (cached) {
        setTokenData(JSON.parse(cached));
      } else {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${tokenId}`, {
          headers: {
            "x-cg-demo-api-key": "CG-uBfevfq9VNo4mH54FXXjS4vK"
          }
        });
        if (!response.ok) throw new Error("Token not found");
        const data = await response.json();
        sessionStorage.setItem(`token-${tokenId}`, JSON.stringify(data)); // cache
        setTokenData(data);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tokenId]);

  useEffect(() => {
    fetchTokenData();
  }, [fetchTokenData]);

  if (loading) return <div className="token-details-loading">Loading...</div>;
  if (error) return <div className="token-details-error">{error}</div>;

  return (
    <div className="token-details-container">
      <Link to="/" className="back-button">← Back</Link>
      <div className="token-header">
        <img src={tokenData.image.large} alt={tokenData.name} className="token-image" />
        <h1>{tokenData.name} ({tokenData.symbol.toUpperCase()})</h1>
        <p>Rank: #{tokenData.market_cap_rank}</p>
      </div>

      <div className="token-stats">
        <div className="stat">
          <h3>Price</h3>
          <p>${tokenData.market_data.current_price.usd.toLocaleString()}</p>
        </div>
        <div className="stat">
          <h3>Market Cap</h3>
          <p>${tokenData.market_data.market_cap.usd.toLocaleString()}</p>
        </div>
        <div className="stat">
          <h3>24h Change</h3>
          <p className={tokenData.market_data.price_change_percentage_24h >= 0 ? "positive" : "negative"}>
            {tokenData.market_data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
        <div className="stat">
          <h3>Circulating Supply</h3>
          <p>{tokenData.market_data.circulating_supply.toLocaleString()}</p>
        </div>
      </div>

      <div className="token-description" dangerouslySetInnerHTML={{ __html: tokenData.description.en }} />

      <a href={tokenData.links.homepage[0]} target="_blank" rel="noopener noreferrer" className="token-website">
        Visit Official Website
      </a>
    </div>
  );
}
