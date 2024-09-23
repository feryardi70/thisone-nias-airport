const express = require("express");
const router = express.Router();
//require("../db");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const flash = require("connect-flash");
//const Departure = require("../model/departure.js");
//const verifyToken = require("../utils/auth.js");
const { getAllDeparture, insertNewDeparture, findDepartureById, deleteDepartureById, editDepartureById } = require("../departure.service.js");

// router.use(cookieParser("secret"));
// router.use(
//   session({
//     cookie: { maxAge: 6000 },
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// router.use(flash());

router.get("/", async (req, res) => {
  try {
    const departures = await getAllDeparture();
    res.status(200).send({
      msg: "success",
      data: departures,
    });
  } catch (error) {
    res.status(500).send({
      msg: "failed",
      data: null,
    });
  }
});

// procesc add depart
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    await insertNewDeparture(data);
    res.status(200).send({
      msg: "berhasil menambahkan data baru",
    });
  } catch (error) {
    res.status(500).send({
      msg: "gagal menambahkan data baru",
    });
  }
});

router.delete("/:_id", async (req, res) => {
  const id = req.params._id;
  const departure = await findDepartureById(id);
  if (!departure) {
    res.status(404).send({ msg: "data yang ingin dihapus tidak ada!" });
  } else {
    try {
      const departureId = departure._id;
      await deleteDepartureById(departureId);
      res.status(200).send({
        msg: "berhasil menghapus jadwal penerbangan",
      });
    } catch (error) {
      res.status(500).send({
        msg: "gagal menghapus jadwal penerbangan",
      });
    }
  }
});

router.get("/:_id", async (req, res) => {
  const id = req.params._id;
  const departure = await findDepartureById(id);
  res.status(200).send({
    msg: "success",
    data: departure,
  });
});

router.put("/", async (req, res) => {
  //console.log(req.body);
  const data = req.body;
  try {
    await editDepartureById(data);
    res.status(200).send({ msg: "berhasil mengubah data penerbangan" });
  } catch (error) {
    res.status(500).send({ msg: "gagal mengubah data penerbangan" });
  }
});

module.exports = router;
