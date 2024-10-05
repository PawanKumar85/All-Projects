import app from "./server.js";

// Vercel will use this function to serve the Express app
export default async function handler(req, res) {
  await app(req, res);
}
