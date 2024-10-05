import express from "express";

const app = express();
const PORT = 5000;

app.set("trust proxy", true);

app.get("/", (req, res) => {
  const ip =
    req.headers["cf-connecting-ip"] || // Cloudflare
    req.headers["x-real-ip"] || // Nginx
    req.headers["x-forwarded-for"] || // Other proxies
    req.socket.remoteAddress;

  res.json({
    message: "Hello, World!",
    ip: ip
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
