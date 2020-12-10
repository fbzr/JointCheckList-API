const router = require("express").Router({ mergeParams: true });
const ObjectId = require("mongodb").ObjectId;

module.exports = (db) => {
  const listController = require("../data/controllers")(db.collection("lists"));

  // @route   GET /lists/:listId/items
  // @desc    Return all items from specific list
  // @access  Private
  router.get("/", async (req, res, next) => {
    try {
      const { listId } = req.params;

      const { items } = await listController.findById(listId);

      if (!items) throw new Error();

      return res.json(items);
    } catch (error) {
      next({ statusCode: 400, errorMessage: "Invalid list ID" });
    }
  });

  // @route   POST /lists/:listId/items
  // @desc    Insert new item to specific list
  // @access  Private
  router.post("/", async (req, res, next) => {});

  return router;
};
