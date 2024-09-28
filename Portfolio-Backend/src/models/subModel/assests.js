import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    } 
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;