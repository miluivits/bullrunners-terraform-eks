import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Portfolio.css";

export default function Portfolio() {
  const { user, loading } = useUser();
  const [tokens, setTokens] = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!user) return;
      try {
        setLoadingPortfolio(true);
        const res = await fetch(`/api/portfolio/${user.username}`);
        if (!res.ok) throw new Error("Failed to fetch portfolio");
        const data = await res.json(); // data: array of { name, amount }
        // Ha nincs token, üres
        if (data.length === 0) {
          setTokens([]);
          return;
        }

        // Lekérdezzük az árakat CoinGecko-tól
        // A token.name-okat át kell alakítani a CoinGecko API id-kre
        // Tegyük fel, hogy token.name már megegyezik a CoinGecko id-val (pl. "bitcoin", "ethereum")
        const ids = data.map((t) => t.name.toLowerCase()).join(",");
        const priceRes = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        );
        const priceJson = await priceRes.json();

        // Készítsük el az új tokens tömböt, amely tartalmazza az USD értéket is
        const enriched = data.map((t) => {
          const lc = t.name.toLowerCase();
          const priceObj = priceJson[lc];
          const price = priceObj?.usd ?? 0;
          const usdValue = price * t.amount;
          return {
            name: t.name,
            amount: t.amount,
            price,
            usdValue,
          };
        });

        setTokens(enriched);
      } catch (err) {
        console.error("Error fetching portfolio or prices:", err);
        setError("Could not load portfolio data.");
      } finally {
        setLoadingPortfolio(false);
      }
    };

    fetchPortfolio();
  }, [user]);

  if (loading) return <p className="loading-text">Loading...</p>;

  if (!user) {
    return (
      <div className="marketing-page">
        <h1>Welcome!</h1>
        <p>Track your tokens, monitor your gains, and level up your crypto game!</p>
        <Link to="/register" className="cta-button">
          Register Now
        </Link>
      </div>
    );
  }

  const COLORS = [
    "#4cbb71",
    "#00c49f",
    "#0088fe",
    "#ffbb28",
    "#ff8042",
    "#a020f0",
    "#ff4d4d",
    "#3aa15a",
    "#cccc00",
    "#1e90ff",
  ];

  const totalUsd = tokens.reduce((sum, t) => sum + (t.usdValue || 0), 0);

  return (
    <div className="portfolio-page">
      <h1>{user.username}'s Portfolio</h1>

      {loadingPortfolio ? (
        <p className="loading-text">Loading your portfolio...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : tokens.length === 0 ? (
        <p className="empty-text">Your portfolio is empty. Start adding tokens!</p>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={tokens}
                dataKey="usdValue"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={(entry) =>
                  `${entry.name}: ${((entry.usdValue / totalUsd) * 100).toFixed(1)}%`
                }
              >
                {tokens.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `$${value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                  name,
                ]}
                contentStyle={{
                  backgroundColor: "#e6e6e6ff",
                  border: "1px solid #4cbb71",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
              />
              <Legend
                wrapperStyle={{
                  color: "#ffffff",
                  fontSize: "0.9rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="portfolio-summary">
            <p>Total Portfolio Value: <strong>${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}
