import express from "express";
import useragent from "express-useragent";
import cors from "cors";
import ipRoutes from "./routes/ip.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(useragent.express());
app.use(cors());
app.use("/api/v2", ipRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
