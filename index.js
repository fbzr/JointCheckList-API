require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const initDb = require("./data/db");

const app = express();
app.use(express.json());
app.use(helmet());

const routes = require("./routes");

initDb()
  .then((dbs) => {
    console.log("MongoDB connected");
    const db = dbs[process.env.NODE_ENV];

    const PORT = process.env.PORT || 8000;

    routes(app, db).listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to Database");
    console.error(err);
    process.exit(1);
  });
