const bcrypt = require("bcryptjs");
const saltRounds = Number(process.env.BCRYPT_ROUNDS);

// return hash
const generateHash = (str) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (!err) {
      bcrypt.hash(password, salt, (err, hash) => {
        if (!err) {
          return hash;
        }
      });
    }

    return null;
  });
};

// return boolean
const compare = (str, hash) => {
  return bcrypt.compare(str, hash, (err, match) => {
    return match;
  });
};

module.exports = {
  generateHash,
  compare,
};
