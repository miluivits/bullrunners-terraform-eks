import React, { useEffect, useRef } from "react";
import "./TradingViewChart.css";

const TradingViewChart = ({ tokenSymbol }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!tokenSymbol) return;

    const container = chartRef.current;
    container.innerHTML = ""; // tisztítás, ha újratöltődik

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: tokenSymbol.toUpperCase() + "USD",
          interval: "D",
          container_id: container.id,
          locale: "en",
          theme: "Dark",
          toolbar_bg: "#000000", // header teljes háttér fekete
          allow_symbol_change: false,
          hide_top_toolbar: true, // header teljes elrejtése
          hide_legend: true,
          hide_side_toolbar: false,
          details: false,
          hotlist: false,
          news: [],
          enabled_features: ["study_templates"],
          disabled_features: [
            "header_widget",
            "use_localstorage_for_settings",
            "header_compare",
            "header_symbol_search",
            "timeframes_toolbar",
            "show_logo_on_all_charts",
          ],
          overrides: {
            "paneProperties.background": "#000000",
            "paneProperties.vertGridProperties.color": "#222222",
            "paneProperties.horzGridProperties.color": "#222222",
            "scalesProperties.backgroundColor": "#000000",
            "scalesProperties.textColor": "#AAA",
            "symbolWatermarkProperties.transparency": 90,
            "mainSeriesProperties.candleStyle.upColor": "#2ecc71",
            "mainSeriesProperties.candleStyle.downColor": "#e74c3c",
            "mainSeriesProperties.candleStyle.borderUpColor": "#2ecc71",
            "mainSeriesProperties.candleStyle.borderDownColor": "#e74c3c",
            "mainSeriesProperties.candleStyle.wickUpColor": "#2ecc71",
            "mainSeriesProperties.candleStyle.wickDownColor": "#e74c3c",
          },
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (chartRef.current) chartRef.current.innerHTML = "";
    };
  }, [tokenSymbol]);

  return <div ref={chartRef} id={`tradingview_${tokenSymbol}`} className="tradingview-chart" />;
};

export default TradingViewChart;
