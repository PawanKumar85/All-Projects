// server.mjs
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Handle connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for 'message' event from the client
  socket.on('message', (msg) => {
    console.log('Message received from client:', msg);

    // Send the message back to the client
    socket.emit('message', `Server says: ${msg}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(4000, () => {
  console.log('Listening on port 4000');
});
