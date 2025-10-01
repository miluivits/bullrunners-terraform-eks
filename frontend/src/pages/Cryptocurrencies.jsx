import React, { useEffect, useState } from "react";
import "./Cryptocurrencies.css";
import { Link } from "react-router-dom";

export default function Cryptocurrencies() {
  const [globalData, setGlobalData] = useState(null);
  const [coins, setCoins] = useState([]);

  function formatNumber(num) {
    if (num === undefined || num === null) return "-";
    if (num >= 1_000_000_000_000) return (num / 1_000_000_000_000).toFixed(2) + "T";
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(2) + "K";
    return num.toString();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resGlobal = await fetch("/api/global");
        if (!resGlobal.ok) throw new Error(`Status ${resGlobal.status}`);
        const dataGlobal = await resGlobal.json();
        setGlobalData(dataGlobal);

        const resCoins = await fetch("/api/markets?per_page=100");
        if (!resCoins.ok) throw new Error(`Status ${resCoins.status}`);
        const dataCoins = await resCoins.json();
        setCoins(dataCoins);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchData();
  }, []);

  if (!globalData) return <p className="loading-text">Loading Crypto Overview...</p>;

  return (
    <div className="cryptocurrencies-page">
      <section className="cryptooverview">
        <h2>Today's Crypto Prices by Market Cap</h2>
        <p>
          The worldwide cryptocurrency market capitalization today stands at{" "}
          <strong>${formatNumber(globalData.total_market_cap?.usd)}</strong>, seeing a{" "}
          <strong>{globalData.market_cap_change_percentage_24h_usd?.toFixed(2) ?? "-"}%</strong>{" "}
          movement over the last 24 hours. Total 24h trading volume:{" "}
          <strong>${formatNumber(globalData.total_volume?.usd)}</strong>. Bitcoin dominance:{" "}
          <strong>{globalData.market_cap_percentage?.btc?.toFixed(1) ?? "-"}%</strong>.
        </p>
      </section>

      <section className="cryptotable">
        <h2>Top Cryptocurrencies</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>1h %</th>
              <th>24h %</th>
              <th>7d %</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>Volume 24h</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id}>
                <td>{index + 1}</td>
                <td className="coin-name">
                  <Link to={`/tokendetails/${coin.id}`} className="coin-link">
                    <img src={coin.image ?? ""} alt={coin.name ?? ""} />
                    <span className="coin-title">{coin.name ?? "-"}</span>
                    <span className="coin-symbol">· {coin.symbol?.toUpperCase() ?? "-"}</span>
                  </Link>
                </td>
                <td>
                  <span className={`change-badge ${coin.price_change_percentage_1h_in_currency >= 0 ? "green" : "red"}`}>
                    {coin.price_change_percentage_1h_in_currency?.toFixed(2) ?? "-"}%
                  </span>
                </td>
                <td>
                  <span className={`change-badge ${coin.price_change_percentage_24h_in_currency >= 0 ? "green" : "red"}`}>
                    {coin.price_change_percentage_24h_in_currency?.toFixed(2) ?? "-"}%
                  </span>
                </td>
                <td>
                  <span className={`change-badge ${coin.price_change_percentage_7d_in_currency >= 0 ? "green" : "red"}`}>
                    {coin.price_change_percentage_7d_in_currency?.toFixed(2) ?? "-"}%
                  </span>
                </td>
                <td>${coin.current_price?.toLocaleString() ?? "-"}</td>
                <td>${formatNumber(coin.market_cap)}</td>
                <td>${formatNumber(coin.total_volume)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
