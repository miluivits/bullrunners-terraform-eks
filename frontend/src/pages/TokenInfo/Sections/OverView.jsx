import React from "react";
import "./OverView.css"

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
    return <div>Loading data...</div>
  }

  return (
    <div>
  
      <div className="about-section">
        <h3>About {detailedData.name}</h3>
        <p>{detailedData?.description?.en || "No description available."}</p>
      </div>

      <div className="performance-table">
        <h3>Performance</h3>
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
              <td>{price_change_percentage_1h.toFixed(2)}%</td>
              <td>{price_change_percentage_24h.toFixed(2)}%</td>
              <td>{price_change_percentage_7d.toFixed(2)}%</td>
              <td>{price_change_percentage_14d.toFixed(2)}%</td>
              <td>{price_change_percentage_30d.toFixed(2)}%</td>
              <td>{price_change_percentage_1y.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;
