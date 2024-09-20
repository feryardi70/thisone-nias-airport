const mongoose = require("mongoose");

const arrivalSchema = mongoose.Schema({
  airline: { type: String, default: "IW" },
  flightnumber: Number,
  origin: String,
  arrivedate: String,
  arrivetime: String,
  baggage: { type: String, default: "00" },
  remark: String,
});

const Arrival = mongoose.model("Arrival", arrivalSchema);

module.exports = Arrival;
