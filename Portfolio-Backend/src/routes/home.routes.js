import express from "express";
import { upload } from "../middleware/multerMiddleware.js";
import { get_Home, patch_Home, post_home } from "../controllers/homeController.js";

const home = express.Router();

home
  .post(
    "/home",
    post_home
  )
  .get("/home", get_Home)
  .patch(
    "/home/:id",
    patch_Home
  );
export default home;
