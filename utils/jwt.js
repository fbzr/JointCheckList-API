const jwt = require("jsonwebtoken");

// return token
module.exports = generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
};

// return recoded token if successful
module.exports = decode = (token) => {
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err && decoded) {
      return decoded;
    }

    return null;
  });
};
