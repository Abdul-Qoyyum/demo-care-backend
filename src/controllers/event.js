const express = require("express");
const { Event, sequelize } = require("../models");
const successResponse = require("../concerns/responseHandlers/successResponse");
const errorResponse = require("../concerns/responseHandlers/errorResponse");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const _ = require("lodash");

const eventController = express.Router();

eventController.get("/months", async (_, res) => {
  try {
    const months = await Event.findAll({
      attributes: [
        "care_recipient_id",
        [sequelize.fn("month", sequelize.col("timestamp")), "value"],
      ],
      group: ["value"],
    });
    return successResponse(months, "success", StatusCodes.OK, res);
  } catch (e) {
    return errorResponse(e.message, StatusCodes.INTERNAL_SERVER_ERROR, res);
  }
});

eventController.get("/event-type", async (_, res) => {
  try {
    const events = await Event.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("event_type")), "event_type"],
      ],
    });
    return successResponse(events, "success", StatusCodes.OK, res);
  } catch (e) {
    return errorResponse(e.message, StatusCodes.INTERNAL_SERVER_ERROR, res);
  }
});

eventController.get("/events/:month/:event_type", async (req, res) => {
  const { month, event_type } = req.params;
  try {
    const events = await Event.findAll({
      where: {
        [Op.and]: [
          {
            event_type,
          },
          {
            [Op.and]: sequelize.where(
              sequelize.fn("month", sequelize.col("timestamp")),
              month
            ),
          },
        ],
      },
      attributes: [
        "event_type",
        [sequelize.fn("month", sequelize.col("timestamp")), "month"],
        [sequelize.fn("day", sequelize.col("timestamp")), "day"],
        [sequelize.fn("count", sequelize.col("event_type")), "total"],
        [sequelize.fn("date", sequelize.col("timestamp")), "date"],
      ],
      group: ["day"],
    });
    if (_.isEmpty(events))
      return errorResponse("Not Found", StatusCodes.NOT_FOUND, res);

    return successResponse(events, "success", StatusCodes.OK, res);
  } catch (e) {
    return errorResponse(e.message, StatusCodes.INTERNAL_SERVER_ERROR, res);
  }
});

module.exports = eventController;
