import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/",authMiddleware, getBlogs);
router.get("/:id",authMiddleware, getBlogById);
router.post("/", authMiddleware, createBlog);
router.patch("/:id", authMiddleware, updateBlog);
router.delete("/:id",authMiddleware, deleteBlog);

export default router;
