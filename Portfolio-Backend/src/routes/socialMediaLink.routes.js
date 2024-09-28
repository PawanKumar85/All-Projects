import express from "express";
import {
  get_SocialMediaLinks,
  post_SocialMediaLink,
} from "../controllers/socialMediaController.js";
import { upload } from "../middleware/multerMiddleware.js";

const social = express.Router();

social
.post(
    "/social",
    upload.fields([
      {
        name: "icon",
        maxCount: 1,
      },
    ]),
    post_SocialMediaLink
  )
  .get("/social", get_SocialMediaLinks);

export default social;
