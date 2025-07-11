import axiosClient from ".";

export const getAllBlogs = async () => {
  const res = await axiosClient.get("/blogs");
  return res.data.data.blogs;
};

export const getBlogById = async (id) => {
  const res = await axiosClient.get(`/blogs/${id}`);
  return res.data;
};

export const createBlog = async (blog) => {
  const res = await axiosClient.post("/blogs", blog);
  return res.data;
};

export const updateBlog = async (id, blog) => {
  const res = await axiosClient.patch(`/blogs/${id}`, blog);
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await axiosClient.delete(`/blogs/${id}`);
  return res.data;
};