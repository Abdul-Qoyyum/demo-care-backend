const express = require("express");
const cors = require("cors");
const errorResponse = require("./concerns/responseHandlers/errorResponse");
const { StatusCodes } = require("http-status-codes");

const {
    pingController,
    eventController
} = require("./controllers");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api",[
    pingController,
    eventController
]);
//handles invalid route request
app.use("*", (_, res) => {
    return errorResponse("Not found",StatusCodes.NOT_FOUND,res)
})

module.exports = app;
