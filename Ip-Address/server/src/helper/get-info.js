// helper/get-info.js
import fetch from 'node-fetch';

// Function to fetch location data based on IP
export const getDeviceLocation = async () => {
  try {
    const response = await fetch("http://ip-api.com/json/?fields=4319225");
    const data = await response.json();

    if (data.status === 'fail') {
      throw new Error(`Failed to fetch location: ${data.message}`);
    }

    return {
      ipAddress: data.query,
      mobileAccess: data.mobile,
      isp: data.isp,
      location: {
        city: data.city,
        region: data.regionName,
        zip: data.zip,
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
