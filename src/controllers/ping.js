const express = require("express");

const pingController = express.Router();

pingController.get("/hello", (_, res) => {
  res.status(200).json({
    greetings: "Thank you for spending some time on this test. All the best 🙌",
  });
});

module.exports = pingController;

