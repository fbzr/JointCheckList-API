const { decodeToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization");

  if (!token) {
    next({
      statusCode: 401,
      errorMessage: "Token required",
    });
  }

  try {
    const decoded = decodeToken(token);
    req.user = decoded.user;
    next();
  } catch (err) {
    next({
      statusCode: 401,
      errorMessage: "Invalid Token",
    });
  }
};
