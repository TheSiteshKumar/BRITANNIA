const mongoose = require("mongoose");

const InvestmentPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  dailyEarnings: { type: Number, required: true },
  totalRevenue: { type: Number, required: true },
  duration: { type: Number, required: true }, // in days
});

module.exports = mongoose.model("InvestmentPlan", InvestmentPlanSchema);
