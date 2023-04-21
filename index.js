const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let connectedUsers = 0;

io.on('connection', socket => {
  connectedUsers++;
  console.log(`A user connected. Total connected users: ${connectedUsers}`);
});

io.on('connection', socket => {
  socket.on('disconnect', () => {
    connectedUsers--;
    console.log(
      `A user disconnected. Total connected users: ${connectedUsers}`
    );
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
