import mongoose from "mongoose";
import { blogCategory } from "../constant/index.js";
const blogModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    blogCategory: {
      type: String,
      enum: Object.values(blogCategory),
      default: blogCategory.GENERAL,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogModel);
export default Blog;
