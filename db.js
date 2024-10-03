const mongoose = require("mongoose");
require("dotenv").config();

//mongoose.connect("mongodb://127.0.0.1:27017/dbdellmongo");
mongoose.connect(process.env.MONGO_URI);

// const departureSchema = mongoose.Schema({
//   airline: { type: String, default: "unknown" },
//   flightnumber: Number,
//   destination: String,
//   departdate: String,
//   departtime: String,
//   gate: { type: String, default: "00" },
//   remark: String,
// });

// const Departure = mongoose.model("Departure", departureSchema);

// menambah 1 data ke collection Departure
// const departure2 = new Departure({
//   airline: "JT",
//   flightnumber: 773,
//   destination: "MEDAN",
//   departdate: "2024-09-11",
//   departtime: "20.00",
//   gate: "01",
//   remark: "",
// });

// departure2.save().then((departure) => console.log(departure));
