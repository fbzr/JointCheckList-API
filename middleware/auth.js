const { decodeToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization");

  if (!token) {
    // TODO: next(error) - middleware
  }

  const decoded = decodeToken(token);

  if (decoded) {
    req.user = decoded.user;
    next();
  }

  // TODO: next(error)
};
