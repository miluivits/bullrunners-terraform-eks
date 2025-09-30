import User from "../model/User.js";
import { getUsdPrice, getUsdPrices } from "../utils/getPrice.js";

export async function AddToken(req, res) {
  try {
    const { username, token } = req.body;
    const coinId = token?.name?.toLowerCase();
    const amount = Number(token?.amount);

    if (!username || !coinId || !Number.isFinite(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ error: "username, token.name, token.amount required" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const price = await getUsdPrice(coinId);

    const existing = user.tokens.find((t) => t.name === coinId);
    if (!existing) {
      user.tokens.push({
        name: coinId,
        amount: amount,
        avgBuyPrice: price,
        lastBuyPrice: price,
        firstBuyAt: new Date(),
        lastBuyAt: new Date(),
      });
    } else {
      const prevAmount = existing.amount;
      const prevPrice = existing.avgBuyPrice * prevAmount;
      const newAmount = prevAmount + amount;
      const newAvg = (prevPrice + price * amount) / newAmount;
      existing.amount = newAmount;
      existing.avgBuyPrice = newAvg;
      existing.lastBuyPrice = price;
      existing.firstBuyAt = existing.firstBuyAt || new Date();
      existing.lastBuyAt = new Date();
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error adding token:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function UserPortfolio(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const tokens = user.tokens || [];
    const ids = tokens.map((token) => token.name.toLowerCase());
    const prices = await getUsdPrices(ids);

    const holdings = tokens.map((token) => {
      const name = token.name.toLowerCase();
      const amount = Number(token.amount) || 0;
      const avg = Number(token.avgBuyPrice) || 0;

      const costs = avg * amount;
      const currentPrice = prices[name] ?? null;
      const currentValue = currentPrice !== null ? currentPrice * amount : null;
      const profit = currentValue !== null ? currentValue - costs : null;
      const returnOnInvestment =
        currentValue !== null ? (profit / costs) * 100 : null;

      return {
        name: token.name,
        symbol: token.symbol ?? null,
        amount,
        avgBuyPrice: avg,
        lastBuyPrice: token.lastBuyPrice ?? null,
        firstBuyAt: token.firstBuyAt ?? null,
        lastBuyAt: token.lastBuyAt ?? null,
        currentPrice,
        currentValue,
        costs,
        unrealizedProfit: profit,
        returnOnInvestment,
      };
    });

    const totals = holdings.reduce(
      (acc, holding) => {
        acc.costs += holding.costs || 0;
        acc.value += holding.currentValue || 0;
        return acc;
      },
      { costs: 0, value: 0 }
    );

    const totalProfit = totals.value - totals.costs;
    const totalReturnOnInvestment =
      totals.costs > 0 ? (totalProfit / totals.costs) * 100 : null;

    return res.json({
      username: user.username,
      holdings,
      totals: {
        costs: totals.costs,
        value: totals.value,
        unrealizedProfit: totalProfit,
        returnOnInvestment: totalReturnOnInvestment,
      },
    });
  } catch (err) {
    console.error("Error fetching user portfolio:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
