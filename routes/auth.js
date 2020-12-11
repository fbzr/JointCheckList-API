const bcrypt = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");
const router = require("express").Router();

// Util function
const removePasswordProp = (obj) => {
  // filter to return all user props but password
  return Object.entries(obj).reduce(
    (result, [key, value]) =>
      key !== "password" ? { ...result, [key]: value } : result,
    {}
  );
};

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
    await userController.insertOne({ ...req.body, lists: [], password: hash });

    user = await userController.findOne({ username });

    // filter to return all user props but password
    user = removePasswordProp(user);

    res.json({ ...user });
  });

  router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    // return error if missing required field
    if (!username || !password) {
      return next({
        statusCode: 400,
        errorMessage: "Missing required field",
      });
    }

    // get user and password from DB
    let user = await userController.findOne({ username });

    if (!user) {
      return next({
        statusCode: 401,
        errorMessage: "Invalid username",
      });
    }

    const match = bcrypt.compare(password, user.password);

    if (!match) {
      return next({
        statusCode: 401,
        errorMessage: "Password doesn't match",
      });
    }

    // generate token passing user without password property
    user = removePasswordProp(user);
    const token = generateToken({ user });

    res.json({ token, username });
  });

  return router;
};
