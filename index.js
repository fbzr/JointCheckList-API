require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const initDb = require("./data/db");

const app = express();
const http = require("http").createServer(app);
const routes = require("./routes");

app.use(express.json());
app.use(helmet());

const init = async () => {
  try {
    const dbs = await initDb();
    const db = dbs[process.env.NODE_ENV];
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to Database");
    console.error(err);
    process.exit(1);
  }

  // routes function returns app instance
  const server = require("http").createServer(routes(app, db));
  const PORT = process.env.PORT || 8000;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

init();
