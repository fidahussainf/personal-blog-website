import { Blog, User } from "../models/index.js";
import { Role } from "../constant/index.js";
import { blogCategory } from "../constant/index.js";
const createBlog = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== Role.ADMIN) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const existingBlog = await Blog.findOne({
    title: req.body.title,
    isDeleted: false,
  });
  if (existingBlog) {
    return res
      .status(400)
      .json({ message: "Blog with this title already exists" });
  }

  const blog = await Blog.create({
    title: req.body.title,
    content: req.body.content,
    blogCategory: req.body.blogCategory || blogCategory.GENERAL,
    author: req.body.author,
    isDeleted: false,
  });
  res.status(201).json({ message: "Blog created", data: blog });
};

const getBlogs = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const query = { isDeleted: false };
  const blogs = await Blog.find(query);
  const count = await Blog.countDocuments(query);
  res.status(200).json({
    message: "All Blogs",
    data: {
      totalBlogs: count,
      totalPages: Math.ceil(count / limit),
      blogs,
    },
  });
};

const getBlogById = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
};

const updateBlog = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== Role.ADMIN) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    req.body,
    { new: true }
  );
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json({ message: "Blog updated", data: blog });
};

const deleteBlog = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== Role.ADMIN)
    return res.status(403).json({ message: "Forbidden" });
  const blog = await Blog.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json({ message: "Blog deleted" });
};

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
