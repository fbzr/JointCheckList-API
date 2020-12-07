const authRouter = require("./auth");
const listsRouter = require("./lists");

module.exports = (app, db) => {
  app.use("/auth", authRouter(db));
  app.use("/lists", listsRouter(db));

  // error middleware
  app.use(require("../middleware/error"));

  return app;
};
