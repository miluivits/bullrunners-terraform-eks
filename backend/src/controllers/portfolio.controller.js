import User from "../model/User.js";
import { getUsdPrice } from "../utils/getPrice.js";

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
    res.json(user.tokens || []);
  } catch (err) {
    console.error("Error fetching user portfolio:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
