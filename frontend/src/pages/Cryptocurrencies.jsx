import React, { useEffect, useState } from "react";
import "./Cryptocurrencies.css";

export default function Cryptocurrencies() {
    const [globalData, setGlobalData] = useState(null);
    const [volumeChange, setVolumeChange] = useState(null);
    const [btcChange, setBtcChange] = useState(null);
    const [coins, setCoins] = useState([]); // <-- itt definiáltam

    // Helper a nagy számok rövidítésére
    function formatNumber(num) {
        if (!num && num !== 0) return "-";
        if (num >= 1_000_000_000_000) return (num / 1_000_000_000_000).toFixed(2) + "T";
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(2) + "K";
        return num.toString();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Global data
                const res = await fetch("https://api.coingecko.com/api/v3/global");
                const data = await res.json();
                setGlobalData(data.data);

                // Volume change (2 nap)
                const volRes = await fetch(
                    "https://api.coingecko.com/api/v3/global/market_chart?vs_currency=usd&days=2"
                );
                const volData = await volRes.json();
                if (volData.total_volumes?.length >= 2) {
                    const latest = volData.total_volumes[volData.total_volumes.length - 1][1];
                    const prev = volData.total_volumes[volData.total_volumes.length - 25][1];
                    setVolumeChange(((latest - prev) / prev) * 100);
                }

                // BTC dominance change
                const btcRes = await fetch(
                    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=2"
                );
                const btcData = await btcRes.json();
                if (btcData.market_caps?.length >= 2) {
                    const latest = btcData.market_caps[btcData.market_caps.length - 1][1];
                    const prev = btcData.market_caps[btcData.market_caps.length - 25][1];
                    setBtcChange(((latest - prev) / prev) * 100);
                }

                // Top coins
                const coinsRes = await fetch(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&price_change_percentage=1h,24h,7d"
                );
                const coinsData = await coinsRes.json();
                setCoins(coinsData);
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
                    <strong>${formatNumber(globalData.total_market_cap.usd)}</strong>, seeing a{" "}
                    <strong>{globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%</strong>{" "}
                    movement over the last 24 hours. The total cryptocurrency trading volume in the
                    past day is roughly <strong>${formatNumber(globalData.total_volume.usd)}</strong>.
                    Bitcoin's market dominance is at about{" "}
                    <strong>{globalData.market_cap_percentage.btc.toFixed(1)}%</strong>.
                </p>

                <div className="overview-grid">
                    <div className="overview-card">
                        <h3>Market Cap</h3>
                        <p>
                            ${formatNumber(globalData.total_market_cap.usd)}
                            <span
                                className={`change-badge ${globalData.market_cap_change_percentage_24h_usd >= 0 ? "green" : "red"
                                    }`}
                            >
                                {globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%
                            </span>
                        </p>
                    </div>

                    <div className="overview-card">
                        <h3>Volume 24h</h3>
                        <p>
                            ${formatNumber(globalData.total_volume.usd)}
                            {volumeChange !== null && (
                                <span
                                    className={`change-badge ${volumeChange >= 0 ? "green" : "red"}`}
                                >
                                    {volumeChange.toFixed(2)}%
                                </span>
                            )}
                        </p>
                    </div>

                    <div className="overview-card">
                        <h3>BTC Dominance</h3>
                        <p>
                            {globalData.market_cap_percentage.btc.toFixed(1)}%
                            {btcChange !== null && (
                                <span className={`change-badge ${btcChange >= 0 ? "green" : "red"}`}>
                                    {btcChange.toFixed(2)}%
                                </span>
                            )}
                        </p>
                    </div>
                </div>
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
                                    <img src={coin.image} alt={coin.name} />
                                    <span className="coin-title">{coin.name}</span>
                                    <span className="coin-symbol">· {coin.symbol.toUpperCase()}</span>
                                </td>
                                <td>
                                    <span
                                        className={`change-badge ${coin.price_change_percentage_1h_in_currency >= 0 ? "green" : "red"
                                            }`}
                                    >
                                        {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`change-badge ${coin.price_change_percentage_24h_in_currency >= 0 ? "green" : "red"
                                            }`}
                                    >
                                        {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`change-badge ${coin.price_change_percentage_7d_in_currency >= 0 ? "green" : "red"
                                            }`}
                                    >
                                        {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                                    </span>
                                </td>
                                <td>${coin.current_price.toLocaleString()}</td>
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
