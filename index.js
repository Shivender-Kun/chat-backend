const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.use(cors());
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

const Port = process.env.Port || 4000;

server.listen(Port, () => {
  console.log(`listening on ${Port}`);
});
