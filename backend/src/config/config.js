import localConfig from "./config.local.js";

function parsePort(value, fallback) {
  const parsed = parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const config = {
  port: parsePort(process.env.PORT || localConfig.PORT || 3005),
  mongoUri:
    process.env.MONGO_URI ||
    localConfig.MONGO_URI ||
    "mongodb://127.0.0.1:27017/bullrunners",
  coinGeckoKey: process.env.COINGECKO_KEY || localConfig.COINGECKO_KEY || "",
  jwtSecret: process.env.JWT_SECRET || localConfig.JWT_SECRET || "",
};
