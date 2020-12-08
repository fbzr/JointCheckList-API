const jwt = require("jsonwebtoken");

// return token
const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
};

// return recoded token if successful
const decodeToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded;
};

module.exports = {
  generateToken,
  decodeToken,
};
