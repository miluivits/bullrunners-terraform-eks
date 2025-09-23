import { Router } from "express";

const router = Router();

router.get("/global", async (_req, res) => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global", {
      headers: { "x-cg-demo-api-key": process.env.COINGECKO_KEY },
    });
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    console.error("Error fetching global data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/markets", async (_req, res) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1",
      { headers: { "x-cg-demo-api-key": process.env.COINGECKO_KEY } }
    );
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching market data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/coins/:id", async (req, res) => {
  try {
    const r = await fetch(
      `https://api.coingecko.com/api/v3/coins/${req.params.id}`,
      {
        headers: { "x-cg-demo-api-key": process.env.COINGECKO_KEY },
      }
    );
    if (!r.ok) throw new Error(`Status ${r.status}`);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching coin:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
