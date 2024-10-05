// helper/get-info.js
import fetch from "node-fetch";

// Function to fetch location data based on IP
export const getDeviceLocation = async (ip) => {
  // Check for reserved IP ranges
  const reservedRanges = [
    /^127\.0\.0\.1$/, // localhost
    /^192\.168\.\d{1,3}\.\d{1,3}$/, // private network
    /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, // private network
    /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}$/, // private network
    /^169\.254\.\d{1,3}\.\d{1,3}$/, // link-local
    /^::1$/, // IPv6 localhost
    /^fc00::/, // IPv6 private
    /^fe80::/, // IPv6 link-local
  ];

  // Check if the IP is in the reserved range
  if (reservedRanges.some((regex) => regex.test(ip))) {
    // console.warn("Attempted to fetch location for a reserved IP:", ip);
    return {
      ipAddress: ip,
      mobileAccess: false,
      isp: "Local/Reserved IP",
      location: {
        city: "Localhost",
        region: "N/A",
        pin: "N/A",
        country: "N/A",
      },
      coordinates: {
        longitude: null,
        latitude: null,
      },
    };
  }

  try {
    // Fetching location data from the API
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=4319225`);
    const data = await response.json();

    // Check if the API call was successful
    if (data.status === "fail") {
      throw new Error(`Failed to fetch location: ${data.message}`);
    }

    // Return structured location information
    return {
      ipAddress: data.query,
      mobileAccess: data.mobile,
      isp: data.isp,
      location: {
        city: data.city,
        region: data.regionName,
        pin: data.zip,
        country: data.country,
      },
      coordinates: {
        longitude: data.lon,
        latitude: data.lat,
      },
    };
  } catch (error) {
    console.error("Error fetching device location:", error.message);
    return null; // Returning null on error
  }
};
