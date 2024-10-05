
# Project Title: IP Address API

Welcome to the **IP Address API**! This project provides an API for fetching device information and location based on IP addresses.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Fetch device information such as browser, OS, and platform.
- Retrieve location data based on IP address.
- Supports reserved IP ranges for local addresses.
- Returns current date and time in various formats.

## Demo

You can try the API [here](https://my-ip-address-orcin.vercel.app/api/v2).

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/PawanKumar85/All-Projects/tree/main/Ip-Address/server
   ```

2. Navigate to the project directory:

   ```bash
   cd ip-address-api
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will run on <http://localhost:5000>.

## Usage

To use the API, you can make GET requests to the following endpoints:

### Home Endpoint

**GET /api/v2/**

Response:

```json
{
  "message": "Welcome to the IP Address API",
  "author": "Pawan Kumar",
  "getResponse": "http://localhost:5000/api/v2/info",
  "documentation_url": "https://github.com/yourusername/ip-address-api/blob/main/README.md",
  "version": "2.0.0",
  "current_datetime": {
    "date": "MM/DD/YYYY",
    "time": "HH:MM:SS"
  },
  "server_time": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "status": "success"
}
```

### Device Info Endpoint

**GET /api/v2/info**

**Query Parameters:**

- includeServerTime: Set to true to include server time in the response.

Response:

```json
{
  "status": 200,
  "message": "Device information fetched successfully",
  "myInfo": {
    "browserInfo": {
      "browser": "yourbrowser",
      "version": "browserVersion",
      "platform": "client OS",
      "os": "clint Window",
      "userAgent": "Mozilla/5.0 ..."
    },
    "locationInfo": {
      "ipAddress": "123.456.789.012",
      "mobileAccess": false,
      "isp": "ISP Name",
      "location": {
        "city": "City Name",
        "region": "Region Name",
        "pin": "12345",
        "country": "Country Name"
      },
      "coordinates": {
        "longitude": 12.34,
        "latitude": 56.78
      }
    },
    "serverTime": "YYYY-MM-DDTHH:mm:ss.sssZ" // only if includeServerTime is true
  }
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any questions or suggestions, please feel free to contact me:

**Name**: Pawan Kumar  
**Email**: <pawan630703@gmail.com>  
**GitHub**: PawanKumar85
