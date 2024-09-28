import express from "express";
import {
    delete_project,
  get_project,
  patch_project,
  post_project,
} from "../controllers/projectController.js";
import { upload } from "../middleware/multerMiddleware.js";

const project = express.Router();

project
  .post(
    "/project",
    upload.fields([
      {
        name: "imageUrl",
        maxCount: 1,
      },
    ]),
    post_project
  )
  .get("/project", get_project)
  .patch(
    "/project/:id",
    upload.fields([{ name: "imageUrl", maxCount: 1 }]),
    patch_project
  )
  .delete("/project/:id", delete_project);
export default project;
