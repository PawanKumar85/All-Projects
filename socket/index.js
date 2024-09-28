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

let users = 0;

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected");
  users++;

  // Emit welcome message to the new user
  socket.emit("newUserConnect", { message: "Welcome Back! Dear" });

  // Broadcast to other users about the new user
  socket.broadcast.emit("newUserConnect", { message: `${users} online` });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    users--;
    socket.broadcast.emit("newUserConnect", { message: `${users} online` });
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
