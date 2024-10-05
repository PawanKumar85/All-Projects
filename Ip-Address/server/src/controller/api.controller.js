import { getCurrentDateTime } from "../middleware/utils.middleware.js";
import { getDeviceLocation } from "../helper/get-info.js";
export const Home = (req, res) => {
  return res.status(200).json({
    message: "Welcome to the IP Address API",
    author: "Pawan Kumar",
    getResponse: `${req.protocol}://${req.headers.host}/api/v2/info`,
    documentation_url:
      "https://github.com/PawanKumar85/All-Projects/blob/main/Ip-Address/server/src/index.js",
    version: "2.0.0",
    current_datetime: getCurrentDateTime(), 
    server_time: new Date().toISOString(),
    status: "success",
  });
};

export const deviceInfo = async (req, res) => {
  const ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] || 
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  try {
    const browserInfo = {
      browser: req.useragent.browser,
      version: req.useragent.version,
      platform: req.useragent.platform,
      os: req.useragent.os,
      userAgent: req.useragent.source,
    };

    const locationInfo = await getDeviceLocation(ip);

    if (!locationInfo) {
      throw new Error("Failed to retrieve location data");
    }

    const currentDateTime = new Date().toISOString();

    const combinedInfo = {
      browserInfo,
      locationInfo,
      currentDateTime,
    };

    res.json({ combinedInfo });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch device info" });
  }
}
