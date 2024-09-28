import { asyncHandler } from "../utils/asyncHandler.js";
import Image from "../models/subModel/assests.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const post_assets = asyncHandler(async (req, res) => {
    const { title } = req.body;
  
    if (!title) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const existingTitle = await Image.findOne({ title });
  
    if (existingTitle) {
      return res.status(400).json({ message: "Title already exists" });
    }
  
    const imageLocalPath = req.files?.imageUrl?.[0]?.path;
  
    if (!imageLocalPath) {
      return res.status(400).json({ message: "Image is required" });
    }
  
    const image = await uploadOnCloudinary(imageLocalPath);
  
    if (!image) {
      return res
        .status(500)
        .json({ message: "Error uploading image to cloudinary" });
    }
  
    const newAsset = new Image({
      title,
      imageUrl: image.url,
    });
  
    const save = await newAsset.save();
  
    if (!save) {
      return res.status(500).json({ message: "Error saving about data" });
    }
  
    return res.status(201).json({
      message: "Image data created successfully",
      data: newAsset,
    });
  });

export const get_assets = asyncHandler(async (req, res) => {
  try {
    const assetsData = await Image.find({});
    if (!assetsData || assetsData.length === 0) {
      return res.status(404).json({ message: "No assets data found" });
    }
    return res.status(200).json({
      message: "Assets data fetched successfully",
      data: assetsData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      status: 500,
    });
  }
});

export const get_asset_by_id = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const assetData = await Image.findById(id);
    if (!assetData) {
      return res.status(404).json({ message: "Asset data not found" });
    }
    return res.status(200).json({
      message: "Asset data fetched successfully",
      data: assetData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      status: 500,
    });
  }
});

export const patch_asset = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const assetData = await Image.findById(id);
    if (!assetData) {
      return res.status(404).json({ message: "Asset data not found" });
    }
    if (title && title !== assetData.title) {
      const existingTitle = await Image.findOne({ title });
      if (existingTitle) {
        return res.status(400).json({ message: "Title already exists" });
      }
      assetData.title = title;
    }

    if (req.files?.image?.[0]?.path) {
      const imageLocalPath = req.files.image[0].path;
      const image = await uploadOnCloudinary(imageLocalPath);

      if (!image) {
        return res
          .status(500)
          .json({ message: "Error uploading image to Cloudinary" });
      }

      assetData.imageUrl = image.url;
    }

    const updatedAsset = await assetData.save();

    return res.status(200).json({
      message: "Asset data updated successfully",
      data: updatedAsset,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      status: 500,
    });
  }
};

export const delete_asset = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAsset = await Image.findByIdAndDelete(id);

    if (!deletedAsset) {
      return res.status(404).json({
        success: false,
        message: "Asset data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Asset data deleted successfully",
      data: deletedAsset, // Optionally return the deleted data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});
