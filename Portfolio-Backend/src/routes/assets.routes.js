import express from "express";
import { upload } from "../middleware/multerMiddleware.js";
import {
  delete_asset,
  get_assets,
  patch_asset,
  post_assets,
} from "../controllers/assests.controller.js";

const assets = express.Router();

assets
  .post(
    "/assets",
    upload.fields([
      {
        name: "imageUrl",
        maxCount: 1,
      },
    ]),
    post_assets
  )
  .get("/assets", get_assets)
  .patch(
    "/assets/:id",
    upload.fields([
      {
        name: "imageUrl",
        maxCount: 1,
      },
    ]),
    patch_asset
  )
  .delete("/assets/:id", delete_asset);

export default assets;
