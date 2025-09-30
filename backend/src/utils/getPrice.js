import { config } from "../config/config";

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
