// server.js
import express from "express";
import useragent from "express-useragent"; // Middleware to parse user agent
import { getDeviceLocation } from "./helper/get-info.js"; // Import the helper function

const app = express();
const PORT = 5000;

// Use user-agent middleware to extract browser and platform information
app.use(useragent.express());

// Function to get current date and time
const getCurrentDateTime = () => {
  const now = new Date();
  return {
    date: now.toLocaleDateString(), // Format: MM/DD/YYYY
    time: now.toLocaleTimeString(), // Format: HH:MM:SS AM/PM
  };
};

// Root route to get the client's browser, device, and location info
app.get("/", async (req, res) => {
  const ip =
    req.headers["cf-connecting-ip"] || // Cloudflare
    req.headers["x-real-ip"] || // Nginx
    req.headers["x-forwarded-for"]?.split(",")[0] || // Other proxies (taking the first IP in case of multiple)
    req.socket.remoteAddress;

  try {
    // Get browser and platform info from the user-agent header
    const browserInfo = {
      browser: req.useragent.browser,
      version: req.useragent.version,
      platform: req.useragent.platform,
      os: req.useragent.os,
      userAgent: req.useragent.source,
    };

    // Get the location based on the IP address
    const locationInfo = await getDeviceLocation(ip);

    if (!locationInfo) {
      throw new Error("Failed to retrieve location data");
    }

    // Combine the browser, location info, and current date/time
    const combinedInfo = {
      browserInfo,
      locationInfo,
      currentDateTime: getCurrentDateTime(), // Date and Time as separate objects
    };

    // Send combined info as JSON response
    res.json({ combinedInfo});
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch device info" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for Vercel deployment
export default app;
