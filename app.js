const express = require("express");
const expressLayout = require("express-ejs-layouts");
//const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const cors = require("cors");

require("./db");
// const Book = require("./model/contact.js");
// const Comment = require("./model/comment.js");
const Departure = require("./model/departure.js");
const User = require("./model/user.js");
//const logoutRouter = require("./logout/logout.js");
const Arrival = require("./model/arrival.js");

const app = express();
const port = process.env.PORT || 10000;
const T5BmpO66 = require("./model/raAaA122.js");
const verifyToken = require("./utils/auth.js");
const credentialNt0rtJXDRouter = require("./api/credentialNt0rtJXD.js");
const departureRouter = require("./departure/departure.js");
const arrivalRouter = require("./arrival/arrival.js");
const wisataRouter = require("./wisata/wisata.js");
const departureO4yc7xKZRouter = require("./api/departureO4yc7xKZ/departureO4yc7xKZ.js");

const allowlist = ["http://localhost:5173", "http://127.0.0.1:5173"];
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(methodOverride("_method"));
//app.use(cors());

//setup ejs
app.set("view engine", "ejs");
app.use(expressLayout);

//
app.use(express.json());

// built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post("/r3g15ter", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    try {
      req.flash("msgPass", "password does not match to confirm password");
      res.redirect("/register");
    } catch (error) {
      res.status(500).json({ error: "Something went wrong, registration failed, maybe your username does not unique..." });
    }
    //res.status(400).json({ error: "password does not match to confirm password" });
    //return;
    // req.flash("msg", "password does not match to confirm password");
    // res.redirect("/register");
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
      const user = new User({ username, password: hashedPassword, confirmPassword: hashedConfirmPassword });
      await user.save();
      //res.status(201).json({ message: "User registered successfully" });
      req.flash("successMsg", "User registered successfully");
      res.redirect("/login");
    } catch (error) {
      res.status(500).json({ error: "Something went wrong, registration failed, maybe your username does not unique..." });
    }
  }
  //res.redirect("/login");
});

app.get("/r3g15ter", (req, res) => {
  res.render("register", { layout: "Layouts/none2", msgPass: req.flash("msgPass"), title: "Form Register" });
});

app.get("/forgot", (req, res) => {
  res.render("forgot", { layout: "Layouts/none2", title: "Reset Password", msgForgot: req.flash("msgForgot"), msgNewPass: req.flash("msgNewPass"), username: req.flash("username") });
});

app.post("/forgot", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    try {
      req.flash("msgForgot", "username does not exist");
      res.redirect("/forgot");
    } catch (error) {
      res.status(500).json({ error: "Something went wrong, please try again later" });
    }
  } else {
    try {
      req.flash("msgNewPass", "please input new password below");
      const username = req.body.username;
      req.flash("username", username);
      res.redirect("/reset");
      //res.render("reset", { layout: "Layouts/none2", title: "Reset Password", msgNewPass: req.flash("msgNewPass"), user });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong, please try again later" });
    }
  }
  //res.render("forgot", { layout: "Layouts/none2", title: "Reset Password", msgPass: req.flash("msgPass") });
});

app.get("/reset", (req, res) => {
  res.render("reset", { layout: "Layouts/none2", title: "Reset Password", msgNewPass: req.flash("msgNewPass"), username: req.flash("username") });
});

app.put("/reset", async (req, res) => {
  //console.log(req.body);
  const { username, password, confirmPassword } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
  console.log(username);
  try {
    User.updateOne(
      { username: username },
      {
        $set: {
          username: username,
          password: hashedPassword,
          confirmPassword: hashedConfirmPassword,
        },
      }
    ).then((result) => {
      console.log(result);
    });
    req.flash("msgUbahUser", "successfully change password");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  // try {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    //const msg = { statusCode: "401", error: "Authentication failed, wrong username and password combination" };
    //res.status(401).json({ statusCode: "401", error: "Authentication failed, wrong username and password combination" });
    //res.sendFile(__dirname + "/public/html/404.html");

    // res.send("<h4>Error 401<br><p>Authentication failed, wrong username and password combination<br>Silahkan refresh halaman dan coba Login Kembali/tunggu beberapa saat lagi...</h4>");
    // return;

    try {
      req.flash("msglogin", "Authentication failed, wrong username and password combination");
      res.redirect("/login");
    } catch (error) {
      res.status(500).json({ error: "Something went wrong, login failed" });
    }
  } else if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      try {
        req.flash("msglogin", "Authentication failed, wrong username and password combination");
        res.redirect("/login");
      } catch (error) {
        res.status(500).json({ error: "Something went wrong, login failed" });
      }
    } else {
      try {
        const token = jwt.sign({ userId: user._id }, T5BmpO66, {
          expiresIn: "4h",
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: 14400000 });
        res.redirect("/");
      } catch (error) {
        res.status(500).json({ error: "Something went wrong, login failed" });
      }
    }
  }
  // else if (user) {
  //   try {
  //     const token = jwt.sign({ userId: user._id }, T5BmpO66, {
  //       expiresIn: "4h",
  //     });
  //     res.cookie("jwt", token, { httpOnly: true, maxAge: 14400000 });
  //     res.redirect("/");
  //   } catch (error) {
  //     res.status(500).json({ error: "Something went wrong, login failed" });
  //   }
  // }
  //res.redirect("/login");
  //const passwordMatch = await bcrypt.compare(password, user.password);
  // if (!passwordMatch) {
  //const msg2 = { statusCode: "401", error: "Authentication failed, wrong username and password combination" };
  //
  //return res.status(401).json({ error: "Authentication failed, wrong username and password combination" });
  //   res.send("<h4>Error 401<br><p>Authentication failed, wrong username and password combination<br>Silahkan refresh halaman dan coba Login Kembali/tunggu beberapa saat lagi...</h4>");
  //   return;
  // }

  // }
  // catch (error) {
  //   res.status(500).json({ error: "Something went wrong, login failed" });
  //res.send("<h4>Error 500<br><p>Something went wrong, login failed<br>Mohon tunggu beberapa saat lagi...<br>silahkan cek server jika problem berulang!</h4>");
  //return;
  // }
  //req.flash("msglogin", "Authentication failed, wrong username and password combination");
  //res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login", { layout: "Layouts/login", successMsg: req.flash("successMsg"), msglogin: req.flash("msglogin"), msgUbahUser: req.flash("msgUbahUser") });
});

app.get("/error", (req, res) => {
  const msg = { statusCode: "401", error: "Authentication failed, wrong username and password combination" };
  res.render("error", { layout: "Layouts/error-layout", msg });
});

app.use("/credentialNt0rtJXD", credentialNt0rtJXDRouter);

app.get("/", verifyToken, async (req, res) => {
  //const departures = await Departure.find();
  res.render("index", {
    layout: "Layouts/index-layout",
    //departures,
    //msg: req.flash("msg"),
    //msgDelete: req.flash("msgDelete"),
    //msgUbah: req.flash("msgUbah"),
  });
});

app.use("/departure", departureRouter);

app.get("/viewdeparture", async (req, res) => {
  const datetime = new Date();
  const h = datetime.getHours();
  const yyyy = datetime.getFullYear().toString();
  let mm = datetime.getMonth() + 1;
  let dd = datetime.getDate();

  let hh = h >= 17 ? dd + 1 : dd;
  let prevhh = hh - 1;
  let nexthh = hh + 1;

  let hari = hh < 10 ? "0" + hh : hh;
  const bulan = mm < 10 ? "0" + mm : mm;

  const formattedToday = yyyy + "-" + bulan + "-" + hari;
  const yesteday = formattedToday.substring(0, 8) + prevhh;
  const tomorrow = formattedToday.substring(0, 8) + nexthh;
  //const formattedDate = datetime.toISOString().substring(0, 10); 2024-09-26
  console.log(typeof yesteday);
  console.log(yesteday);
  console.log(tomorrow);
  const departures = await Departure.find({ departdate: formattedToday }).sort({ departtime: 1 });
  res.render("viewdeparture", { layout: "Layouts/departure-layout", departures });
});

app.use("/arrival", arrivalRouter);

app.get("/viewarrival", async (req, res) => {
  const datetime = new Date();
  const h = datetime.getHours();
  const yyyy = datetime.getFullYear().toString();
  let mm = datetime.getMonth() + 1;
  let dd = datetime.getDate();

  let hour = h >= 17 ? dd + 1 : dd;

  let hari = hour < 10 ? "0" + hour : hour;
  const bulan = mm < 10 ? "0" + mm : mm;

  const formattedToday = yyyy + "-" + bulan + "-" + hari;
  //const formattedDate = datetime.toISOString().substring(0, 10);
  console.log(formattedToday);
  console.log(h);
  const arrivals = await Arrival.find({ arrivedate: formattedToday }).sort({ arrivetime: 1 });
  res.render("viewarrival", { layout: "Layouts/arrival-layout", arrivals });
});

app.use("/apideparture", cors(corsOptionsDelegate), departureO4yc7xKZRouter);
app.use("/wisata", wisataRouter);

app.post("/logout", async (req, res) => {
  // try {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    try {
      req.flash("msglogin", "Authentication failed, wrong username and password combination");
      res.redirect("/login");
    } catch (error) {
      res.status(500).json({ error: "Something went wrong, login failed" });
    }
  } else if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      try {
        req.flash("msglogin", "Authentication failed, wrong username and password combination");
        res.redirect("/login");
      } catch (error) {
        res.status(500).json({ error: "Something went wrong, login failed" });
      }
    } else {
      try {
        const token = jwt.sign({ userId: user._id }, T5BmpO66, {
          expiresIn: "500",
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: 500 });
        res.redirect("/login");
      } catch (error) {
        res.status(500).json({ error: "Something went wrong, login failed" });
      }
    }
  }
});

app.get("/logout", async (req, res) => {
  try {
    const user = await User.findOne({ username: "superadmin1" });
    const token = jwt.sign({ userId: user._id }, T5BmpO66, {
      expiresIn: "500",
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 500 });
    //req.flash("msgOut", "....");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong, please try again later/check your server" });
  }
});

app.use("/", (req, res) => {
  res.status(404);
  res.sendFile(__dirname + "/public/html/404.html");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}..`);
});
