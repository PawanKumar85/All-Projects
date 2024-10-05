import express from "express";
import { getClientIp } from "./helper/get-ip.js";

const app = express();
const PORT = 5000;

// Trust proxy headers (required for getting correct client IP behind proxies like Vercel)
app.set("trust proxy", true);

// Root route
app.get("/", (req, res) => {
  const ip = getClientIp(req);
  res.json({
    message: "My IP address",
    ip: `My IP address is ${ip}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the server's port
});

// Export the app for Vercel as a serverless function
export default app;
