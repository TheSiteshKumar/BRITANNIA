const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

// @route POST /api/payment/order
// @desc Create a new order
router.post("/order", auth, createOrder);

// @route POST /api/payment/verify
// @desc Verify payment
router.post("/verify", auth, verifyPayment);

module.exports = router;
