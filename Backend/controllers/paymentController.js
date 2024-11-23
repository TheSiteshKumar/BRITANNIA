const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest("hex");

  if (expectedSignature !== signature) {
    return res.status(400).json({ msg: "Payment verification failed" });
  }

  try {
    const user = await User.findById(req.user.id);
    user.wallet1 += parseInt(req.body.amount, 10) / 100;
    await user.save();

    res.json({ msg: "Payment verified and amount added to wallet" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
