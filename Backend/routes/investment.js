const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const InvestmentPlan = require("../models/InvestmentPlan");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// @route GET /api/investments
// @desc Get all investment plans
router.get("/", async (req, res) => {
  try {
    const plans = await InvestmentPlan.find();
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/investments
// @desc Create a new investment plan
router.post("/", auth, async (req, res) => {
  const { name, unitPrice, dailyEarnings, totalRevenue, duration } = req.body;

  try {
    const newPlan = new InvestmentPlan({
      name,
      unitPrice,
      dailyEarnings,
      totalRevenue,
      duration,
    });
    const plan = await newPlan.save();
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/investments/invest
// @desc Invest in a plan
router.post("/invest", auth, async (req, res) => {
  const { planId } = req.body;

  try {
    const plan = await InvestmentPlan.findById(planId);
    if (!plan) return res.status(404).json({ msg: "Plan not found" });

    const user = await User.findById(req.user.id);
    if (user.wallet1 < plan.unitPrice)
      return res.status(400).json({ msg: "Insufficient funds" });

    user.wallet1 -= plan.unitPrice;
    await user.save();

    const newTransaction = new Transaction({
      userId: req.user.id,
      amount: plan.unitPrice,
      type: "investment",
    });
    await newTransaction.save();

    res.json({ msg: "Investment successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
