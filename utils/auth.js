const jwt = require("jsonwebtoken");
const Gw033585 = require("../model/raAaA122.js");
const msg1 = "Access denied, you apparently do not have authorization";

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  const token2 = req.cookies.jwt;
  //console.log(req.cookies.jwt);
  //console.log(Gw033585);
  if (!token2) {
    //return res.send("<h2>Error 401<h4><br><h2>Access denied, you apparently do not have authorization</h4>");
    try {
      // req.flash("msgVerify", "please login");
      res.redirect("/login");
    } catch (error) {
      res.send("<h2>Error 401<h4><br><h2>Access denied, you apparently do not have authorization");
    }
  } else {
    try {
      const decoded = jwt.verify(token2, Gw033585);
      //console.log(decoded);
      req.userId = decoded.userId;
      //console.log(req.userId);
      next();
    } catch (error) {
      res.send("<h2>Error 401<h4><br><h2>Access denied, you apparently do not have authorization");
    }
  }
}

module.exports = verifyToken;
