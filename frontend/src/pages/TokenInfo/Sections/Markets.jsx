import React from 'react';
import "./Markets.css";

export default function Markets({ detailedData }) {
    if (!detailedData || !detailedData.tickers) {
        return <div>Loading market data...</div>;
    }

    console.log(detailedData);

    const { tickers } = detailedData;

    const top10Tickers = tickers.slice(0, 10);

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-3">Market Listings</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="px-6 py-3 text-left">Exchange</th>
                            <th className="px-6 py-3 text-left">Pair</th>
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-left">Volume (24h)</th>
                            <th className="px-6 py-3 text-left" >Trust Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top10Tickers.map((ticker, index) => (
                            <tr onClick={() => {
                                if (ticker.trade_url) {
                                    window.open(ticker.trade_url, "_blank");
                                }
                            }} key={index} className="border-b hover:bg-gray-100 transition">
                                <td className="px-6 py-4">{ticker.market.name.split(" ")[0]}</td>
                                <td className="px-6 py-4">{ticker.base}/{ticker.target}</td>
                                <td className="px-6 py-4 font-semibold">
                                    {ticker.last ? `$${ticker.last.toLocaleString()}` : 'N/A'}
                                </td>
                                <td className="px-6 py-4">
                                    {ticker.volume ? `$${ticker.volume.toLocaleString()}` : 'N/A'}
                                </td>
                                <td style = {{textAlign: 'center'}} className='px-6 py-4'>{ticker.trust_score === "green" ? "🟢" : "🔴"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
