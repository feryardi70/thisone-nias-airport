const express = require("express");
const router = express.Router();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const verifyToken = require("../utils/auth.js");
const { getAllArrival, insertNewArrival, findArrivalById, deleteArrivalById, editArrivalById } = require("./arrival.service.js");

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
  const arrivals = await getAllArrival();
  res.render("arrival", {
    layout: "Layouts/none",
    arrivals,
    msg: req.flash("msg"),
    msgDelete: req.flash("msgDelete"),
    msgUbah: req.flash("msgUbah"),
  });
});

// procesc add arrival
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    await insertNewArrival(data);
    req.flash("msg", "berhasil menambah data baru");
    res.redirect("/arrival");
  } catch (error) {
    console.log("gagal memasukkan data ke database!");
  }
});

router.get("/delete/:_id", async (req, res) => {
  const id = req.params._id;
  const arrival = await findArrivalById(id);
  if (!arrival) {
    res.status(404);
    res.send("<h1>gagal menghapus jadwal penerbangan</h1>");
  } else {
    try {
      const arrivalId = arrival._id;
      await deleteArrivalById(arrivalId);
      req.flash("msgDelete", "berhasil menghapus data");
      res.redirect("/arrival");
    } catch (error) {
      console.log("gagal menghapus jadwal penerbangan");
    }
  }
});

router.get("/edit/:_id", verifyToken, async (req, res) => {
  const id = req.params._id;
  const arrival = await findArrivalById(id);
  res.render("editarrival", { layout: "Layouts/add-edit", arrival });
});

router.put("/", async (req, res) => {
  const data = req.body;
  try {
    await editArrivalById(data);
    req.flash("msgUbah", "berhasil mengubah data");
    res.redirect("/arrival");
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/add", (req, res) => {
  res.render("addarrival", { layout: "Layouts/add-edit" });
});

module.exports = router;
