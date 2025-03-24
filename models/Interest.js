const mongoose = require("mongoose");

// Define Schema
const InterestSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Name is required
  mobile: { type: String, required: true },  // Mobile is required
  email: { type: String },  // Optional email
  model: { type: String, required: true },  // Model is required
  createdAt: { type: Date, default: Date.now }  // Default timestamp
});

// Create Model
const Interest = mongoose.model("Interest", InterestSchema);

module.exports = Interest;
