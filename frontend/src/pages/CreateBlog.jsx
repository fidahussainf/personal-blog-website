import { useNavigate } from "react-router-dom";
import { message } from "antd";
import BlogForm from "../components/BlogForm";
import { createBlog } from "../services/blog";
import { useState } from "react";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createBlog(values);
      message.success("Blog created!");
      navigate("/");
    } catch (err) {
      console.error(err);
      message.error("Failed to create blog. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <BlogForm onFinish={onFinish} loading={loading} />
    </div>
  );
}