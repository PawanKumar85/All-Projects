import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const http = createServer(app);
const io = new Server(http);

// Get the directory name for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// Keep track of rooms
let roomNo = 1;
let limit = 0;

io.on("connection", (socket) => {
  console.log("A user connected");

  // Add the user to a specific room
  socket.join(`room-${roomNo}`);
  limit++;

  if(limit >= 2){
    limit = 0;
    roomNo++;
  }
  console.log(`User joined room-${roomNo}`);

  // Emit to everyone in the room including the user
  io.to(`room-${roomNo}`).emit(
    "connectedRoom",
    `You are now connected to room-${roomNo}`
  );

  // If you want to limit room size, you can add logic here to increment roomNo
  // For example, you can set a limit of 5 users per room:
  // if (io.sockets.adapter.rooms.get(`room-${roomNo}`).size >= 5) {
  //   roomNo++;
  // }

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // Optionally handle room-related logic on disconnect if needed
  });
});

// Error handling for server
http
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error(`Failed to start server: ${err.message}`);
  });
