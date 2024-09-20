const express = require("express");
const router = express.Router();
require("../db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const Arrival = require("../model/arrival.js");
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
  const arrivals = await Arrival.find();
  res.render("arrival", {
    layout: "Layouts/none",
    arrivals,
    msg: req.flash("msg"),
    msgDelete: req.flash("msgDelete"),
    msgUbah: req.flash("msgUbah"),
  });
});

// procesc add depart
router.post("/", (req, res) => {
  Arrival.insertMany(req.body),
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
  res.redirect("/arrival");
});

router.get("/delete/:_id", async (req, res) => {
  const arrival = await Arrival.findOne({ _id: req.params._id });
  if (!arrival) {
    res.status(404);
    res.send("<h1>gagal menghapus jadwal penerbangan</h1>");
  } else {
    try {
      Arrival.deleteOne({ _id: arrival._id }).then((result) => {
        console.log(result);
      });
      req.flash("msgDelete", "berhasil menghapus data");
      res.redirect("/arrival");
    } catch (error) {
      console.log("gagal menghapus jadwal penerbangan");
    }
  }
});

router.get("/edit/:_id", verifyToken, async (req, res) => {
  const arrival = await Arrival.findOne({ _id: req.params._id });
  res.render("editarrival", { layout: "Layouts/add-edit", arrival });
});

router.put("/", (req, res) => {
  //console.log(req.body);
  try {
    Arrival.updateOne(
      { _id: req.body._id },
      {
        $set: {
          airline: req.body.airline,
          flightnumber: req.body.flightnumber,
          origin: req.body.origin,
          arrivedate: req.body.arrivedate,
          arrivetime: req.body.arrivetime,
          baggage: req.body.baggage,
          remark: req.body.remark,
        },
      }
    ).then((result) => {
      console.log(result);
    });
    req.flash("msgUbah", "berhasil mengubah data");
    res.redirect("/arrival");
  } catch (error) {
    console.log("gagal mengubah data");
  }
});

router.get("/add", (req, res) => {
  res.render("addarrival", { layout: "Layouts/add-edit" });
});

module.exports = router;
