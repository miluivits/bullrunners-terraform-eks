import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Portfolio.css";

const COLORS = [
    "#4cbb71", "#ff6b6b", "#feca57", "#54a0ff", "#ff9ff3",
    "#00d2d3", "#5f27cd", "#01a3a4", "#ff793f", "#2f3542", "#1e90ff", "#f368e0",
];

function formatMarketCap(num) {
    if (num >= 1_000_000_000_000) return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
    if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`;
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
}

export default function Portfolio() {
    const { user, loading } = useUser();
    const [tokens, setTokens] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [highestToken, setHighestToken] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            if (!user?.username) return;

            try {
                const res = await fetch(`/api/portfolio/${user.username}`, {
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Failed to fetch portfolio");
                const data = await res.json();

                if (!data.holdings || !data.holdings.length) return;

                setTokens(data.holdings);
                setTotalValue(data.totals.value || 0);

                const top = data.holdings.reduce(
                    (a, b) => (a.currentValue > b.currentValue ? a : b),
                    data.holdings[0]
                );
                setHighestToken(top);
            } catch (err) {
                console.error("Error fetching portfolio:", err);
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
                <Link to="/register" className="cta-button">Register Now</Link>
            </div>
        );
    }

    return (
        <div className="portfolio-page">
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
                            <p>{highestToken.name} (${highestToken.currentValue.toLocaleString()})</p>
                        ) : (<p>-</p>)}
                    </div>
                    <div className="summary-card">
                        <h3>Average 24h Change</h3>
                        {(() => {
                            const avgChange = tokens.length
                                ? tokens.reduce((acc, t) => acc + (t.change24h || 0), 0) / tokens.length
                                : 0;
                            return <p className={avgChange >= 0 ? "green" : "red"}>{avgChange.toFixed(2)}%</p>;
                        })()}
                    </div>
                </div>
            </section>

            <section className="portfolio-chart">
                <h2>Portfolio Distribution</h2>
                <PieChart width={700} height={400}>
                    <Pie
                        data={tokens}
                        dataKey="currentValue"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        label={({ name, value }) => `${name}: $${Math.round(value).toLocaleString()}`}
                    >
                        {tokens.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name]} />
                    <Legend />
                </PieChart>
            </section>

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
                            <span><img src={t.image} alt={t.name} className="token-img" /></span>
                            <span>{t.name}</span>
                            <span>{t.amount}</span>
                            <span>${t.currentPrice?.toLocaleString()}</span>
                            <span>${t.currentValue?.toLocaleString()}</span>
                            <span className={t.change24h >= 0 ? "green" : "red"}>{(t.change24h || 0).toFixed(2)}%</span>
                            <span>{formatMarketCap(t.marketCap || 0)}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
