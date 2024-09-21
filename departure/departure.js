const express = require("express");
const router = express.Router();
require("../db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const Departure = require("../model/departure.js");
const verifyToken = require("../utils/auth.js");

router.use(cookieParser("secret"));
router.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(flash());

router.get("/", verifyToken, async (req, res) => {
  const departures = await Departure.find();
  res.render("departure", {
    layout: "Layouts/none",
    departures,
    msg: req.flash("msg"),
    msgDelete: req.flash("msgDelete"),
    msgUbah: req.flash("msgUbah"),
  });
});

// procesc add depart
router.post("/", (req, res) => {
  Departure.insertMany(req.body),
    (error, result) => {
      if (error) {
        console.log("gagal memasukkan data ke database");
      } else {
        //res.status(200).json({ message: "berhasil menambah data jadwal penerbangan" });
        //window.alert("berhasil menambah data jadwal penerbangan!");
        //res.send("<h1>404 <br>Halaman tidak ditemukan</h1>");
        console.log(result);
      }
      //res.redirect(301, "/contact");
    };
  req.flash("msg", "berhasil menambah data baru");
  res.redirect("/departure");
});

router.get("/delete/:_id", async (req, res) => {
  const departure = await Departure.findOne({ _id: req.params._id });
  if (!departure) {
    res.status(404);
    res.send("<h1>gagal menghapus jadwal penerbangan</h1>");
  } else {
    try {
      Departure.deleteOne({ _id: departure._id }).then((result) => {
        console.log(result);
      });
      req.flash("msgDelete", "berhasil menghapus data");
      res.redirect("/departure");
    } catch (error) {
      console.log("gagal menghapus jadwal penerbangan");
    }
  }
});

router.get("/edit/:_id", verifyToken, async (req, res) => {
  const departure = await Departure.findOne({ _id: req.params._id });
  res.render("editdeparture", { layout: "Layouts/add-edit", departure });
});

router.put("/", (req, res) => {
  //console.log(req.body);
  try {
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
      console.log(result);
    });
    req.flash("msgUbah", "berhasil mengubah data");
    res.redirect("/departure");
  } catch (error) {
    console.log("gagal mengubah data");
  }
});

router.get("/add", (req, res) => {
  res.render("adddeparture", { layout: "Layouts/add-edit" });
});

module.exports = router;