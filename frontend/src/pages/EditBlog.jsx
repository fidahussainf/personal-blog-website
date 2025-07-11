import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../services/blog";
import BlogForm from "../components/BlogForm";
import { message } from "antd";

export default function EditBlog() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogById(id)
      .then((res) => setBlog(res))
      .catch(() => message.error("Failed to fetch blog"));
  }, [id]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateBlog(id, values);
      message.success("Blog updated!");
      navigate(`/blog/${id}`);
    } catch {
      message.error("Failed to update blog");
    }
    setLoading(false);
  };

  if (!blog) return null;

  return (
    <div className="max-w-md mx-auto mt-10">
      <BlogForm onFinish={onFinish} loading={loading} initialValues={blog} />
    </div>
  );
}