const express = require("express");

const server = express();

server.get("/", (req, res) => res.send("API running"));

const routes = require("./routes");

console.log(routes);
server.use("/auth", routes.auth);
server.use("/lists", routes.lists);

const PORT = 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
