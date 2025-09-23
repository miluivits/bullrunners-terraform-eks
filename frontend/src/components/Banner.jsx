import { useEffect, useState } from "react";
import "./Banner.css";

export default function Banner() {
  const [globalCryptoData, setGlobalCryptoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/global");
        const data = await response.json();
        setGlobalCryptoData(data);
      } catch (error) {
        console.error("Error fetching global crypto data:", error);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60_000); // frissítjük percenként
    return () => clearInterval(interval);
  }, []);

  if (!globalCryptoData) {
    return (
      <div className="banner">
        <div className="banner-elements">⏳ Loading crypto data...</div>
      </div>
    );
  }

  return (
    <div className="banner">
      <div className="banner-elements">
        <span>🪙 {globalCryptoData.active_cryptocurrencies} Cryptos</span>
        <span>🔄 {globalCryptoData.markets} Markets</span>
        <span>
          🌎 MCap: ${(globalCryptoData.total_market_cap.usd / 1e12).toFixed(2)}T
        </span>
        <span>
          📈 Vol (24h): $
          {(globalCryptoData.total_volume.usd / 1e11).toFixed(2)}T
        </span>
        <span>₿ BTC.D {globalCryptoData.market_cap_percentage.btc.toFixed(2)}%</span>
      </div>
    </div>
  );
}
