import React from "react";
import TradingViewChart from "../TradingViewChart";
import "./OverView.css";

const Overview = ({ detailedData }) => {
  const market_data = detailedData?.market_data || {};
  const {
    price_change_percentage_1h = 0,
    price_change_percentage_24h = 0,
    price_change_percentage_7d = 0,
    price_change_percentage_14d = 0,
    price_change_percentage_30d = 0,
    price_change_percentage_1y = 0,
  } = market_data;

  if (!detailedData) {
    return <div>Loading data...</div>;
  }

  const tokenSymbol = detailedData?.symbol || detailedData?.id;

  const formatChange = (val) => {
    const fixed = val.toFixed(2);
    return (
      <span className={val >= 0 ? "positive" : "negative"}>
        {fixed}%
      </span>
    );
  };

  return (
    <div className="overview-container">
      {/* About Section */}

            {/* TradingView Chart Section */}
      <div className="chart-card">
        <TradingViewChart tokenSymbol={tokenSymbol} />
        <p className="chart-info">
          This chart shows the daily price of {detailedData.name} in USD. You can monitor trends and performance over time.
        </p>
      </div>
      <div className="performance-table">
        <h3>📊 Performance</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>14d</th>
                <th>30d</th>
                <th>1y</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formatChange(price_change_percentage_1h)}</td>
                <td>{formatChange(price_change_percentage_24h)}</td>
                <td>{formatChange(price_change_percentage_7d)}</td>
                <td>{formatChange(price_change_percentage_14d)}</td>
                <td>{formatChange(price_change_percentage_30d)}</td>
                <td>{formatChange(price_change_percentage_1y)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="about-section">
        <h3>About {detailedData.name}</h3>
        <p>{detailedData?.description?.en || "No description available."}</p>
      </div>

    </div>
  );
};

export default Overview;
