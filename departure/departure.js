const express = require("express");
const router = express.Router();
//require("../db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
//const Departure = require("../model/departure.js");
const verifyToken = require("../utils/auth.js");
const { getAllDeparture, insertNewDeparture, findDepartureById, deleteDepartureById, editDepartureById } = require("./departure.service.js");

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
  const departures = await getAllDeparture();
  res.render("departure", {
    layout: "Layouts/none",
    departures,
    msg: req.flash("msg"),
    msgDelete: req.flash("msgDelete"),
    msgUbah: req.flash("msgUbah"),
  });
});

// procesc add depart
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    await insertNewDeparture(data);
    req.flash("msg", "berhasil menambah data baru");
    res.redirect("/departure");
  } catch (error) {
    console.log("gagal memasukkan data ke database!");
  }
});

router.get("/delete/:_id", verifyToken, async (req, res) => {
  const id = req.params._id;
  const departure = await findDepartureById(id);
  if (!departure) {
    res.status(404);
    res.send("<h1>gagal menghapus jadwal penerbangan</h1>");
  } else {
    try {
      const departureId = departure._id;
      await deleteDepartureById(departureId);
      req.flash("msgDelete", "berhasil menghapus data");
      res.redirect("/departure");
    } catch (error) {
      console.log("gagal menghapus jadwal penerbangan!");
    }
  }
});

router.get("/edit/:_id", verifyToken, async (req, res) => {
  const id = req.params._id;
  const departure = await findDepartureById(id);
  res.render("editdeparture", { layout: "Layouts/add-edit", departure });
});

router.put("/", async (req, res) => {
  //console.log(req.body);
  const data = req.body;
  try {
    await editDepartureById(data);
    req.flash("msgUbah", "berhasil mengubah data");
    res.redirect("/departure");
  } catch (error) {
    console.log(error);
  }
});

router.get("/add", verifyToken, (req, res) => {
  res.render("adddeparture", { layout: "Layouts/add-edit" });
});

module.exports = router;
