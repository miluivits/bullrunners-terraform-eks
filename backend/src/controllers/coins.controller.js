import { config } from "../config/config.js";

export async function Global(_req, res) {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global", {
      headers: { "x-cg-demo-api-key": config.coinGeckoKey },
    });
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    res.json(data.data);
  } catch (err) {
    console.error("Error fetching global data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function Markets(req, res) {
  try {
    let perPage = parseInt(req.query.per_page, 10) || 10;
    if (perPage > 250) perPage = 250;
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1`,
      { headers: { "x-cg-demo-api-key": config.coinGeckoKey } }
    );
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching market data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function Coin(req, res) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${req.params.id}`,
      {
        headers: { "x-cg-demo-api-key": config.coinGeckoKey },
      }
    );
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching coin:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
