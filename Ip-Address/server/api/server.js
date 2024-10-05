import express from "express";

const app = express();
const PORT = 5000;

// Trust proxy headers (required for getting correct client IP behind proxies like Vercel)
app.set("trust proxy", true);

// Root route
app.get("/", (req, res) => {
  const ip =
    req.headers["cf-connecting-ip"] || // Cloudflare
    req.headers["x-real-ip"] || // Nginx
    req.headers["x-forwarded-for"] || // Other proxies
    req.socket.remoteAddress; // Direct connection

  res.json({
    message: "Hello, World!",
    ip: ip,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the server's port
});

// Export the app for Vercel as a serverless function
export default app;
