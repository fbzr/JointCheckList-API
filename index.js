require("dotenv").config();
const express = require("express");

const server = express();
server.use(express.json());

server.get("/", (req, res) => res.send("API running"));

const routes = require("./routes");

const auth = require("./middleware/auth");
server.use("/auth", routes.auth);
server.use("/lists", auth, routes.lists);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
