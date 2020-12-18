const authRouter = require("./auth");
const listsRouter = require("./lists");
const authMiddleware = require("../middleware/auth");

module.exports = (app, db, socket) => {
  app.use("/auth", authRouter(db));
  app.use("/lists", authMiddleware, listsRouter(db, socket));

  // error middleware
  app.use(require("../middleware/error"));

  return app;
};
