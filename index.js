require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const initDb = require("./data/db");

var app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const routes = require("./routes");

app.use(express.json());
app.use(helmet());

const init = async () => {
  try {
    const dbs = await initDb();
    const db = dbs[process.env.NODE_ENV];
    console.log("MongoDB connected");

    routes(app, db);

    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to Database");
    console.error(err);
    process.exit(1);
  }
};

init();
