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

      // pass projection option to specify what to return from the object
      const { items } = await listController.findById(listId, {
        projection: { items: 1, _id: 0 },
      });

      if (!items) throw new Error();

      return res.json(items);
    } catch (error) {
      next({ statusCode: 400, errorMessage: "Invalid list ID" });
    }
  });

  // @route   POST /lists/:listId/items
  // @desc    Insert new item to specific list
  // @access  Private
  router.post("/", async (req, res, next) => {
    const { listId } = req.params;
    const { title } = req.body;

    if (!title)
      return next({ statusCode: 400, errorMessage: "Required field missing" });

    const item = {
      _id: ObjectId(),
      title,
      done: false,
      list_id: listId, // TODO: Rethink if I need this prop
      created_at: new Date(),
    };

    // update list pushing new Item to list of items
    const updatedList = await listController.updateOne(listId, {
      $push: {
        items: item,
      },
    });

    // return added item
    res.json(item);
  });

  // @route   GET /lists/:listId/items/:id
  // @desc    Return specific item from a list
  // @access  Private
  router.get("/:id", async (req, res, next) => {
    try {
      const { listId, id } = req.params;

      const { items } = await listController.findById(listId, {
        projection: { items: 1, _id: 0 },
      });

      if (!items)
        return next({ statusCode: 400, errorMessage: "Invalid list ID" });

      const item = items.find((el) => el._id.equals(ObjectId(id)));

      if (!item)
        return next({ statusCode: 400, errorMessage: "Invalid item ID" });

      res.json(item);
    } catch (error) {
      next({ statusCode: 400, errorMessage: "Invalid list or item ID" });
    }
  });

  return router;
};
