const http = require('http');

const SocketIO = require('socket.io');
const express = require('express');
const cors = require('cors');

const app = express();
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);
const port = 3000 || process.env.PORT;

app.use(cors());

wsServer.on('connection', socket => {
  socket.on('join_room', roomName => {
    console.log('someone joined romm');
    socket.join(roomName);
    socket.to(roomName).emit('welcome');
  });

  socket.on('offer', (offer, roomName) => {
    socket.to(roomName).emit('offer', offer);
  });

  socket.on('answer', (answer, roomName) => {
    socket.to(roomName).emit('answer', answer);
  });

  socket.on('ice', (ice, roomName) => {
    console.log('send ice');
    socket.to(roomName).emit('ice', ice);
  });
});

httpServer.listen(port, () => {
  console.log(`server on ${port}`);
});
