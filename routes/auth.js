const router = require("express").Router();
const bcrypt = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // TODO: check if user is already in DB

  const hash = bcrypt.generateHash(password);

  // TODO: save it to DB

  res.json({
    username,
    password: hash,
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // TODO: get user and password from DB
  const user = req.body;

  // TODO: change second param to hashed password from DB
  const match = bcrypt.compare(
    password,
    "$2a$12$rh.RjaukLr2o0WwSiStSYu6/GLJlVfDT2/qjWN0IP.nkaWa9vAaLW"
  );

  if (match) {
    const token = jwt.generateToken({ user });
    res.json({ token, username });
  } else {
    // username and password don't match
  }
});

module.exports = router;
