const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/investments", require("./routes/investment"));
app.use("/api/wallet", require("./routes/wallet"));
app.use("/api/payment", require("./routes/payment"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
