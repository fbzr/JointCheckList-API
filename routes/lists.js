const router = require("express").Router();

module.exports = (db) => {
  const listController = require("../data/controllers/lists")(db);

  router.get("/", async (req, res) => {
    const lists = await listController.findAll();

    res.json({ lists });
  });

  return router;
};
