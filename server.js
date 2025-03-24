const mongoose = require("mongoose");
const Interest = require("./models/Interest");


const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

