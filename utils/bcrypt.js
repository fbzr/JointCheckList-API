const bcrypt = require("bcryptjs");
const saltRounds = Number(process.env.BCRYPT_ROUNDS);

// return hash
const generateHash = (str) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(str, salt);

  return hash;
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
