const bcrypt = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");
const router = require("express").Router();

module.exports = (db) => {
  // pass account collection to get its controller
  const userController = require("../data/controllers")(db.collection("users"));

  router.post("/register", async (req, res, next) => {
    const { username, password } = req.body;

    // return error if missing required field
    if (!username || !password) {
      return next({
        statusCode: 400,
        errorMessage: "Missing required field",
      });
    }

    // check if user is already in DB
    let user = await userController.findOne({ username });

    if (user) {
      return next({
        statusCode: 400,
        errorMessage: "This username is already registered",
      });
    }

    const hash = bcrypt.generateHash(password);
    // save it to DB
    await userController.insertOne({ ...req.body, password: hash });

    user = await userController.findOne({ username });

    // filter to return all user props but password
    user = Object.entries(user).reduce(
      (result, [key, value]) =>
        key !== "password" ? { ...result, [key]: value } : result,
      {}
    );

    res.json({ ...user });
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

  return router;
};
