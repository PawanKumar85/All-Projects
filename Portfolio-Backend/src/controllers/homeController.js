import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Home from "../models/subModel/home.js";

export const post_home = asyncHandler(async (req, res) => {
  const { bio,resume} = req.body;

  if (!bio || !resume) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newHome = new Home({
    bio,
    resumeUrl: resume
  });

  const save = await newHome.save();

  if (!save) {
    return res.status(500).json({ message: "Error saving Home data" });
  }

  return res.status(201).json({
    message: "Home data created successfully",
    data: newHome,
  });
});

export const get_Home = async (req, res) => {
  try {
    const homeData = await Home.find({});

    if (!homeData || homeData.length === 0) {
      return res.status(404).json({ message: "No Home data found" });
    }

    return res.status(200).json({
      message: "Home data fetched successfully",
      data: homeData,
      total: homeData.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      status: 500,
    });
  }
};

export const patch_Home = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { bio, resumeUrl } = req.body;

  try {
    const homeData = await Home.findById(id);

    if (!homeData) {
      return res.status(404).json({ message: "Home data not found" });
    }

    if (bio) {
      homeData.bio = bio;
    }
    if (resumeUrl) {
      homeData.resumeUrl = resumeUrl;
    }
    if (req.files?.imageUrl?.[0]?.path) {
      const imageLocalPath = req.files.imageUrl[0].path;
      const image = await uploadOnCloudinary(imageLocalPath);

      if (!image) {
        return res
          .status(500)
          .json({ message: "Error uploading image to Cloudinary" });
      }
      homeData.imageUrl = image.url;
    }

    const updatedHome = await homeData.save();

    return res.status(200).json({
      message: "Home data updated successfully",
      data: updatedHome,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
