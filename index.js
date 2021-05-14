const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("joined", (name) => {
    socket.broadcast.emit("joined", name);
  });

  socket.on("newMessage", (data) => {
    socket.broadcast.emit("newMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
