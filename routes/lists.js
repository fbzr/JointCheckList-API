const router = require("express").Router();
const itemsRouter = require("./items");
const ObjectId = require("mongodb").ObjectId;

module.exports = (db) => {
  const listController = require("../data/controllers")(db.collection("lists"));
  const userController = require("../data/controllers")(db.collection("users"));

  // items route
  router.use("/:listId/items", itemsRouter(db));

  // @route   GET /lists
  // @desc    Return all lists
  // @access  Private
  router.get("/", async (req, res, next) => {
    try {
      const lists = await listController.findAll();
      res.json(lists);
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
      const list = await listController.findById(id);

      if (!list) throw new Error();

      res.json(list);
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
    await userController.updateOne(req.user._id, {
      $push: { lists: list._id },
    });

    // return new list
    res.json(list);
  });

  // @route   PATCH /lists/:id
  // @desc    Update/Patch specific list
  // @access  Private
  router.patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedList = await listController.updateOne(id, {
        $set: req.body,
      });

      if (!updatedList) throw new Error();

      res.json(updatedList);
    } catch (error) {
      return next({ statusCode: 400, errorMessage: "Invalid list ID" });
    }
  });

  // @route   DELETE /lists/:id
  // @desc    Delete specific list
  // @access  Private
  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedList = await listController.deleteOne(id);

      console.log("deletedList", deletedList);
      if (!deletedList) throw new Error();

      res.json({ success: !!deletedList, deletedList: deletedList });
    } catch (error) {
      return next({ statusCode: 400, errorMessage: "Invalid list ID" });
    }
  });

  return router;
};
