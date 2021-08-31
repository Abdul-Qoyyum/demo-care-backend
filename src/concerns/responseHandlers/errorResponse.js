function errorResponse(message, statusCode, res) {
  return res.status(statusCode).json({
    status: false,
    code: res.statusCode,
    message,
  });
}

module.exports = errorResponse;
