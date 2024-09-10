const mongoose = require("mongoose");

const departureSchema = mongoose.Schema({
  airline: { type: String, default: "IW" },
  flightnumber: Number,
  destination: String,
  departdate: String,
  departtime: String,
  gate: { type: String, default: "00" },
  remark: String,
});

const Departure = mongoose.model("Departure", departureSchema);

module.exports = Departure;
