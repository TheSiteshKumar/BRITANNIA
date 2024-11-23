const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// @route GET /api/wallet
// @desc Get user wallet details
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/wallet/withdraw
// @desc Withdraw from wallet2
router.post("/withdraw", auth, async (req, res) => {
  const { amount } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (user.wallet2 < amount)
      return res.status(400).json({ msg: "Insufficient funds" });

    user.wallet2 -= amount;
    await user.save();

    res.json({ msg: "Withdrawal successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
