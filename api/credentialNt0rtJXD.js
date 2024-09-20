const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    statusText: "success",
    msg: "success",
    data: {
      username: "superadmin1",
      password: "nias2024!",
    },
  });
});

module.exports = router;
