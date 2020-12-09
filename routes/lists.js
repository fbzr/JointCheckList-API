const router = require("express").Router();
const ObjectId = require("mongodb").ObjectId;

module.exports = (db) => {
  const listController = require("../data/controllers")(db.collection("lists"));
  const userController = require("../data/controllers")(db.collection("users"));

  // @route   GET /lists
  // @desc    Return all lists
  // @access  Private
  router.get("/", async (req, res, next) => {
    try {
      const lists = await listController.findAll();
      res.json({ lists });
    } catch (error) {
      next({
        errorMessage: "There was a problem retrieving data from the Database",
      });
    }
  });

  // @route   GET /lists/:id
  // @desc    Return specific list
  // @access  Private
  router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
      const list = await listController.findOne({ _id: ObjectId(id) });

      if (!list) throw new Error();

      res.json({ ...list });
    } catch (error) {
      return next({ statusCode: 400, errorMessage: "Invalid list ID" });
    }
  });

  // @route   POST /lists
  // @desc    Insert new list
  // @access  Private
  router.post("/", async (req, res, next) => {
    const { title } = req.body;

    if (!title) {
      return next({ statusCode: 400, errorMessage: "Required field missing" });
    }

    const list = await listController.insertOne({
      title,
      items: [],
      users: [ObjectId(req.user._id)],
    });

    // add list to user
    await userController.updateOne(
      { _id: ObjectId(req.user._id) },
      {
        $push: { lists: list },
      }
    );

    // return new list
    res.json({ ...list });
  });

  // @route   PATCH /lists/:id
  // @desc    Update/Patch specific list
  // @access  Private
  router.patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedList = await listController.updateOne(
        { _id: ObjectId(id) },
        { $set: req.body }
      );

      if (!updatedList) throw new Error();

      res.json({ ...updatedList });
    } catch (error) {
      return next({ statusCode: 400, errorMessage: "Invalid list ID" });
    }
  });

  return router;
};
