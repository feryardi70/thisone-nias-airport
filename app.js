const express = require("express");
const expressLayout = require("express-ejs-layouts");
//const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

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
  res.render("register", { layout: "Layouts/none2", msgPass: req.flash("msgPass") });
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
  res.render("login", { layout: "Layouts/none2", successMsg: req.flash("successMsg"), msglogin: req.flash("msglogin") });
});

app.get("/error", (req, res) => {
  const msg = { statusCode: "401", error: "Authentication failed, wrong username and password combination" };
  res.render("error", { layout: "Layouts/error-layout", msg });
});

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

  let hari = hh < 10 ? "0" + hh : hh;
  const bulan = mm < 10 ? "0" + mm : mm;

  const formattedToday = yyyy + "-" + bulan + "-" + hari;
  //const formattedDate = datetime.toISOString().substring(0, 10);
  console.log(formattedToday);
  console.log(h);
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

  let hh = h >= 17 ? dd + 1 : dd;

  let hari = hh < 10 ? "0" + hh : hh;
  const bulan = mm < 10 ? "0" + mm : mm;

  const formattedToday = yyyy + "-" + bulan + "-" + hari;
  //const formattedDate = datetime.toISOString().substring(0, 10);
  console.log(formattedToday);
  console.log(h);
  const arrivals = await Arrival.find({ arrivedate: formattedToday }).sort({ arrivetime: 1 });
  res.render("viewarrival", { layout: "Layouts/arrival-layout", arrivals });
});

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

app.get("/logout", (req, res) => {
  try {
    const token = jwt.sign({ userId: user._id }, T5BmpO66, {
      expiresIn: "500",
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 500 });
    //req.flash("msgOut", "....");
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ error: "Something went wrong, please try again later/check your server" });
  }
});

app.use("/credentialNt0rtJXD", credentialNt0rtJXDRouter);

app.use("/", (req, res) => {
  res.status(404);
  res.sendFile(__dirname + "/public/html/404.html");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}..`);
});
