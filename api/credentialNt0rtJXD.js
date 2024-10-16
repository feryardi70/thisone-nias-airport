const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    statusText: "success",
    msg: "success",
    data: {
      username: "",
      password: "",
    },
  });
});

module.exports = router;
