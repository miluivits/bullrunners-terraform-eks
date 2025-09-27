import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Portfolio.css";

const COLORS = [
  "#4cbb71", // zöld
  "#ff6b6b", // piros
  "#feca57", // sárga
  "#54a0ff", // kék
  "#ff9ff3", // rózsaszín
  "#00d2d3", // türkiz
  "#5f27cd", // lila
  "#01a3a4", // sötét türkiz
  "#ff793f", // narancs
  "#2f3542", // sötét szürke
  "#1e90ff", // világoskék
  "#f368e0", // pink
];


// 🔥 MarketCap formatter (M, B, T)
function formatMarketCap(num) {
    if (num >= 1_000_000_000_000) {
        return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
    } else if (num >= 1_000_000_000) {
        return `$${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
        return `$${(num / 1_000_000).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
}

export default function Portfolio() {
    const { user, loading } = useUser();
    const [tokens, setTokens] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [highestToken, setHighestToken] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await fetch(`/api/portfolio/${user.username}`);
                const portfolioTokens = await res.json();

                if (!portfolioTokens.length) return;

                const ids = portfolioTokens.map((t) => t.name.toLowerCase()).join(",");

                const priceRes = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`
                );
                const priceData = await priceRes.json();

                const enriched = portfolioTokens.map((t) => {
                    const market = priceData.find((m) => m.id === t.name.toLowerCase());
                    const usdValue = market ? t.amount * market.current_price : 0;
                    return {
                        ...t,
                        price: market?.current_price || 0,
                        usdValue,
                        image: market?.image || "",
                        change24h: market?.price_change_percentage_24h || 0,
                        marketCap: market?.market_cap || 0,
                    };
                });

                const total = enriched.reduce((acc, t) => acc + t.usdValue, 0);
                const top = enriched.reduce((a, b) => (a.usdValue > b.usdValue ? a : b));

                setTokens(enriched);
                setTotalValue(total);
                setHighestToken(top);
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            }
        };

        if (user) fetchPortfolio();
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

    return (
        <div className="portfolio-page">
            <h1>{user.username}'s Portfolio</h1>

            {/* 🔥 SECTION 1: SUMMARY */}
            <section className="portfolio-summary">
                <h2>Overview</h2>
                <div className="summary-grid">
                    <div className="summary-card">
                        <h3>Total Portfolio Value</h3>
                        <p className="big-value">${totalValue.toLocaleString()}</p>
                    </div>
                    <div className="summary-card">
                        <h3>Number of Tokens</h3>
                        <p>{tokens.length}</p>
                    </div>
                    <div className="summary-card">
                        <h3>Top Holding</h3>
                        {highestToken ? (
                            <p>
                                {highestToken.name} (${highestToken.usdValue.toLocaleString()})
                            </p>
                        ) : (
                            <p>-</p>
                        )}
                    </div>
                    <div className="summary-card">
                        <h3>Average 24h Change</h3>
                        <p>
                            {tokens.length
                                ? (
                                    tokens.reduce((acc, t) => acc + t.change24h, 0) / tokens.length
                                ).toFixed(2)
                                : 0}
                            %
                        </p>
                    </div>
                </div>
            </section>

            {/* 🔥 SECTION 2: PIE CHART */}
            {/* 🔥 SECTION 2: PIE CHART */}
            <section className="portfolio-chart">
                <h2>Portfolio Distribution</h2>
                <PieChart width={700} height={400}>
                    <Pie
                        data={tokens}
                        dataKey="usdValue"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        // custom label, hogy $-t is mutasson
                        label={({ name, value }) =>
                            `${name}: $${Math.round(value).toLocaleString()}`
                        }
                    >
                        {tokens.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                    />
                    <Legend />
                </PieChart>
            </section>


            {/* 🔥 SECTION 3: TOKEN LIST */}
            <section className="portfolio-list">
                <h2>Your Tokens</h2>
                <div className="token-table">
                    <div className="token-row header">
                        <span>Logo</span>
                        <span>Name</span>
                        <span>Amount</span>
                        <span>Price (USD)</span>
                        <span>Value (USD)</span>
                        <span>24h Change</span>
                        <span>Market Cap</span>
                    </div>
                    {tokens.map((t) => (
                        <div className="token-row" key={t.name}>
                            <span>
                                <img src={t.image} alt={t.name} className="token-img" />
                            </span>
                            <span>{t.name}</span>
                            <span>{t.amount}</span>
                            <span>${t.price.toLocaleString()}</span>
                            <span>${t.usdValue.toLocaleString()}</span>
                            <span className={t.change24h >= 0 ? "green" : "red"}>
                                {t.change24h.toFixed(2)}%
                            </span>
                            <span>{formatMarketCap(t.marketCap)}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
