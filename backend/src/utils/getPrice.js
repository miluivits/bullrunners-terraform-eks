import { config } from "../config/config.js";

export async function getUsdPrice(coinId) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(
      coinId
    )}&vs_currencies=usd`,
    { headers: { "x-cg-demo-api-key": config.coinGeckoKey } }
  );
  if (!response.ok)
    throw new Error(`Price request failed with status: ${response.status}`);
  const data = await response.json();
  const price = data?.[coinId]?.usd;
  if (typeof price !== "number")
    throw new Error(`Error fetching price of ${coinId}`);
  return price;
}

export async function getUsdPrices(coinIds) {
  const ids = [
    ...new Set((coinIds || []).filter(Boolean).map((id) => id.toLowerCase())),
  ];

  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids
      .map(encodeURIComponent)
      .join(",")}&vs_currencies=usd`,
    { headers: { "x-cg-demo-api-key": config.coinGeckoKey } }
  );
  if (!response.ok)
    throw new Error(`Price request failed with status: ${response.status}`);
  const data = await response.json();
  const prices = {};
  for (const id of ids) {
    const price = data?.[id]?.usd;
    if (typeof price === "number") {
      prices[id] = price;
    } else {
      throw new Error(`Error fetching price of ${id}`);
    }
  }
  return prices;
}
