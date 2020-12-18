module.exports = (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("disconnect", function () {
    console.log("Disconnected - " + socket.id);
  });

  socket.emmit("loadData", { lists: ["test"] });

  socket.on("addList", (list) => {
    console.log("socket addList");
    console.log("***list***\n", list);
  });
};
