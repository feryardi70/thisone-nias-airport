const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("wisata", {
    layout: "Layouts/wisata",
  });
});

module.exports = router;
