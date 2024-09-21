require("../db");
const Arrival = require("../model/arrival.js");

const getAllArrival = async () => {
  const arrivals = await Arrival.find();
  return arrivals;
};

const insertNewArrival = (data) => {
  Arrival.insertMany(data),
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
};

const findArrivalById = async (id) => {
  const arrival = await Arrival.findOne({ _id: id });
  return arrival;
};

const deleteArrivalById = async (id) => {
  Arrival.deleteOne({ _id: id }).then((result) => {
    console.log(result);
  });
};

const editArrivalById = async (data) => {
  //console.log(data);
  Arrival.updateOne(
    { _id: data._id },
    {
      $set: {
        airline: data.airline,
        flightnumber: data.flightnumber,
        origin: data.origin,
        arrivedate: data.arrivedate,
        arrivetime: data.arrivetime,
        baggage: data.gate,
        remark: data.remark,
      },
    }
  ).then((result) => {
    console.log(result);
  });
};

module.exports = { getAllArrival, insertNewArrival, findArrivalById, deleteArrivalById, editArrivalById };
