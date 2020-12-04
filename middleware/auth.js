const { decodeToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  console.log("authentication");

  next();
};
