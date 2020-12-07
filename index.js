require("dotenv").config();
const express = require("express");
const initDb = require("./data/db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("API running"));

// const routes = require("./routes");

// const auth = require("./middleware/auth");
// app.use("/auth", routes.auth);
// app.use("/lists", auth, routes.lists);

const routes = require("./routes");
let db;

initDb()
  .then((dbs) => {
    console.log("MongoDB connected");
    db = dbs[process.env.NODE_ENV];

    const PORT = process.env.PORT || 8000;

    routes(app, db).listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to make all database connections!");
    console.error(err);
    process.exit(1);
  });
