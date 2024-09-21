require("../db");
const Departure = require("../model/departure.js");

const getAllDeparture = async () => {
  const departures = await Departure.find();
  return departures;
};

const insertNewDeparture = (data) => {
  Departure.insertMany(data),
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

const findDepartureById = async (id) => {
  const departure = await Departure.findOne({ _id: id });
  return departure;
};

const deleteDepartureById = async (id) => {
  Departure.deleteOne({ _id: id }).then((result) => {
    console.log(result);
  });
};

const editDepartureById = async (data) => {
  //console.log(data);
  Departure.updateOne(
    { _id: data._id },
    {
      $set: {
        airline: data.airline,
        flightnumber: data.flightnumber,
        destination: data.destination,
        departdate: data.departdate,
        departtime: data.departtime,
        gate: data.gate,
        remark: data.remark,
      },
    }
  ).then((result) => {
    console.log(result);
  });
};

module.exports = { getAllDeparture, insertNewDeparture, findDepartureById, deleteDepartureById, editDepartureById };
