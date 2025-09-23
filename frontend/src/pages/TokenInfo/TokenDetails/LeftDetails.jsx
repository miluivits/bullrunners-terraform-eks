import { useEffect, useState } from "react";
import "./LeftDetails.css";

export default function LeftDetails({ detailedData, portfolio, setPortfolio, user }) {

  const [isAddingToPortfolio, setIsAddingToPortfolio] = useState(false);
  const [amount, setAmount] = useState("");

  function handleAddToPortfolio() {
    setIsAddingToPortfolio(true);
  }

  async function handleConfirmAdd() {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (!user || !user.username) {
      alert("You must be logged in to add tokens.");
      return;
    }
  
    try {
      const newAmount = parseFloat(amount);
      const tokenName = detailedData.id; 
  
      const tokenExists = portfolio.find(token => token.name === tokenName);
  
      let updatedPortfolio;
      if (tokenExists) {
    
        updatedPortfolio = portfolio.map(token =>
          token.name === tokenName
            ? { ...token, amount: token.amount + newAmount, value: (token.amount + newAmount) * token.price }
            : token
        );
      } else {
        const price = detailedData.market_data.current_price.usd;
        const value = price * newAmount;
        const newToken = { name: tokenName, amount: newAmount, price, value };
        updatedPortfolio = [...portfolio, newToken];
      }
  
      setPortfolio(updatedPortfolio);
  
      const response = await fetch("/api/add-token", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          token: { name: tokenName, amount: newAmount },
        }),
      });
  
      if (!response.ok) throw new Error("Failed to update backend");
  
      alert(`${detailedData.name} successfully added with amount: ${amount}`);
      setIsAddingToPortfolio(false);
      setAmount("");
    } catch (error) {
      console.error("Error adding token:", error);
      alert("An error occurred while adding the token.");
    }
  }
  function handleCancelAdd() {
    setIsAddingToPortfolio(false);
    setAmount("");
  }

  return (
    <div className="tokenDetails">
      <div className="token-card">
        <div className="header">
          <img src={detailedData?.image?.small} alt={detailedData?.name} />
          <span>
            {detailedData?.name} ({detailedData?.symbol?.toUpperCase()}) Price
          </span>
        </div>

        <div className="price">
          <h1>${detailedData?.market_data?.current_price?.usd?.toLocaleString()}</h1>
          <h4>{detailedData?.market_data?.current_price?.btc?.toLocaleString()} BTC</h4>
        </div>

        <div className="addToBtn">
          {!isAddingToPortfolio ? (
            <button onClick={handleAddToPortfolio}>Add To Portfolio</button>
          ) : (
            <div className="add-form">
              <span>Amount: </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
              <button onClick={handleConfirmAdd}>Add</button>
              <button type="button" onClick={handleCancelAdd}>Cancel</button>
            </div>
          )}
        </div>

        <div className="market-stats">
          <p>Market Cap: ${detailedData?.market_data?.market_cap?.usd?.toLocaleString()}</p>
          <p>24 Hour Trading Vol: ${detailedData?.market_data?.total_volume?.usd?.toLocaleString()}</p>
          <p>Circulating Supply: {detailedData?.market_data?.circulating_supply?.toLocaleString()}</p>
          <p>Total Supply: {detailedData?.market_data?.total_supply?.toLocaleString()}</p>
          <p>
            Max Supply:{" "}
            {detailedData?.market_data?.max_supply?.toLocaleString()
              ? `${detailedData?.market_data?.max_supply?.toLocaleString()}`
              : "Infinite"}
          </p>
        </div>

        <div className="info">
          <h2>Info</h2>
          <p>
            <strong>Website:</strong> <a href={detailedData?.links?.homepage[0]} target="_blank" rel="noopener noreferrer">{detailedData?.links?.homepage[0]}</a>
          </p>
          <p>
            <strong>Explorers:</strong> <a href={detailedData?.links?.blockchain_site[0]} target="_blank" rel="noopener noreferrer">View on Explorer</a>
          </p>
          <p>
            <strong>Wallets:</strong> <a href="#">Ledger</a>
          </p>
          <p>
            <strong>Community:</strong>
            <a href={detailedData?.links?.twitter_screen_name ? `https://twitter.com/${detailedData.links.twitter_screen_name}` : "#"} target="_blank" rel="noopener noreferrer"> Twitter</a> |
            <a href={detailedData?.links?.telegram_channel_identifier ? `https://t.me/${detailedData.links.telegram_channel_identifier}` : "#"} target="_blank" rel="noopener noreferrer"> Telegram</a>
          </p>
          <p>
            <strong>Source Code:</strong> <a href={detailedData?.links?.repos_url?.github[0]} target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
          <p>
            <strong>API ID:</strong> {detailedData?.id}
          </p>
          <p>
            <strong>Category:</strong> {detailedData?.categories[0]}
          </p>
        </div>

      </div>
    </div>
  );
}



