import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cors from "cors";
import home from "./routes/home.routes.js"
import about from './routes/about.routes.js';
import education from './routes/education.routes.js';
import skill from "./routes/skills.routes.js";
import platform from "./routes/coding.routes.js";
import project from './routes/project.routes.js';
import contact from "./routes/contact.routes.js";
import social from "./routes/socialMediaLink.routes.js";
import assets from "./routes/assets.routes.js";
import portfolio from "./routes/portfolio.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/",portfolio);
app.use("/api/v2",home);
app.use("/api/v2",about);
app.use("/api/v2",education);
app.use("/api/v2",skill);
app.use("/api/v2",platform);
app.use("/api/v2",project);
app.use("/api/v2",contact);
app.use("/api/v2",social);
app.use("/api/v2",assets);


// Mock data for demonstration purposes


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
