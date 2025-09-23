import React from 'react';
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import "./Markets.css";

export default function Markets({ detailedData }) {
    if (!detailedData || !detailedData.tickers) {
        return (
            <div className="markets-loading">
                <span className="loader"></span> Betöltés...
            </div>
        );
    }

    const { tickers } = detailedData;
    const top10Tickers = tickers.slice(0, 10);

    return (
        <div className="markets-container">
            <h2 className="markets-title">🌐 Market Listings</h2>
            <div className="markets-table-wrapper">
                <table className="markets-table">
                    <thead>
                        <tr>
                            <th>Exchange</th>
                            <th>Pair</th>
                            <th>Price</th>
                            <th>Volume (24h)</th>
                            <th>Trust Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top10Tickers.map((ticker, index) => {
                            const priceUp = Math.random() > 0.5; // DEMO
                            return (
                                <tr
                                    key={index}
                                    onClick={() => {
                                        if (ticker.trade_url) {
                                            window.open(ticker.trade_url, "_blank");
                                        }
                                    }}
                                >
                                    <td>{ticker.market.name.split(" ")[0]}</td>
                                    <td className="pair">{ticker.base}/{ticker.target}</td>
                                    <td className={`price ${priceUp ? "up" : "down"}`}>
                                        {ticker.last ? `$${ticker.last.toLocaleString()}` : 'N/A'}
                                        {priceUp ? (
                                            <ArrowUpRight className="icon up-icon" />
                                        ) : (
                                            <ArrowDownRight className="icon down-icon" />
                                        )}
                                    </td>
                                    <td className="volume">
                                        {ticker.volume ? `$${ticker.volume.toLocaleString()}` : 'N/A'}
                                    </td>
                                    <td className="trust">
                                        {ticker.trust_score === "green" ? "🟢" : "🔴"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
