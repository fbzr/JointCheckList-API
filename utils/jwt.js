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
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err && decoded) {
      return decoded;
    }

    return null;
  });
};

module.exports = {
  generateToken,
  decodeToken,
};
