const express = require("express");
const expressLayout = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

require("./db");
// const Book = require("./model/contact.js");
// const Comment = require("./model/comment.js");
const Departure = require("./model/departure.js");

const app = express();
const port = process.env.PORT || 10000;

app.use(methodOverride("_method"));

//setup ejs
app.set("view engine", "ejs");
app.use(expressLayout);

//
app.use(express.json());

// built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const departures = await Departure.find();
  res.render("index", { layout: "Layouts/none", departures });
});

app.get("/departure", async (req, res) => {
  const datetime = new Date();
  const h = datetime.getHours();
  const yyyy = datetime.getFullYear().toString();
  let mm = datetime.getMonth() + 1;
  let dd = datetime.getDate();

  const hh = h > 17 ? dd++ : dd;

  const hari = hh < 10 ? "0" + hh : hh; 
  const bulan = mm < 10 ? "0" + mm : mm;

  const formattedToday = yyyy + "-" + bulan + "-" + hari;
  //const formattedDate = datetime.toISOString().substring(0, 10);
  console.log(formattedToday);
   console.log(h);
  const departures = await Departure.find({ departdate: formattedToday }).sort({ departtime: 1 });
  res.render("departure", { layout: "Layouts/departure-layout", departures });
});

// procesc add depart
app.post("/", (req, res) => {
  Departure.insertMany(req.body),
    (error, result) => {
      if (error) {
        console.log("gagal memasukkan data ke database");
      } else {
        console.log(result.status.json());
      }
      //res.redirect(301, "/contact");
    };
  res.redirect("/");
});

app.get("/delete/:_id", async (req, res) => {
  const departure = await Departure.findOne({ _id: req.params._id });
  if (!departure) {
    res.status(404);
    res.send("<h1>gagal menghapus jadwal penerbangan</h1>");
  } else {
    Departure.deleteOne({ _id: departure._id }).then((result) => {
      console.log("berhasil terhapus");
    });
  }
  res.redirect("/");
});

app.get("/add", (req, res) => {
  res.render("adddeparture", { layout: "Layouts/none2" });
});

app.get("/edit/:_id", async (req, res) => {
  const departure = await Departure.findOne({ _id: req.params._id });
  res.render("editdeparture", { layout: "Layouts/none2", departure });
});

app.put("/", (req, res) => {
  //console.log(req.body);
  Departure.updateOne(
    { _id: req.body._id },
    {
      $set: {
        airline: req.body.airline,
        flightnumber: req.body.flightnumber,
        destination: req.body.destination,
        departdate: req.body.departdate,
        departtime: req.body.departtime,
        gate: req.body.gate,
        remark: req.body.remark,
      },
    }
  ).then((result) => {
    console.log("berhasil mengubah data");
  });
  res.redirect("/");
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404 <br>Halaman tidak ditemukan</h1>");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}..`);
});
