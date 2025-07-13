import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, deleteBlog } from "../services/blog";
import { Typography, Button, Popconfirm, Divider, Space, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoading(true);
    getBlogById(id)
      .then((res) => {
        setBlog(res);
        setLoading(false);
      })
      .catch(() => {
        message.error("Failed to fetch blog");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteBlog(id);
      message.success("Blog deleted successfully");
      navigate("/");
    } catch {
      message.error("Failed to delete blog");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center py-12">Blog not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <Typography.Title 
          level={1} 
          className="!text-3xl sm:!text-4xl !font-bold !mb-3 !text-gray-900"
        >
          {blog?.title}
        </Typography.Title>
        <div className="flex items-center text-gray-500 text-sm sm:text-base space-x-3">
          <span>By {blog?.author || "Admin"}</span>
          <span>•</span>
          <span>{new Date(blog?.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
    

      {/* Blog Content */}
      <div className="blog-content-container">
        <ReactQuill
          value={blog?.content}
          readOnly={true}
         theme="snow"
          modules={{ toolbar: false }}
          className="prose prose-lg max-w-none border-none"
          style={{
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.75,
            fontSize: '1.125rem',
            border:"none"
          }}
        />
      </div>

      {/* Admin Actions */}
      {user?.role === "ADMIN" && (
        <>
          <Divider className="!my-8" />
          <Space>
            <Button 
              type="primary" 
              onClick={() => navigate(`/edit-blog/${id}`)}
              className="!bg-blue-600 hover:!bg-blue-700 !text-white"
            >
              Edit Article
            </Button>
            <Popconfirm
              title="Are you sure to delete this blog?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        </>
      )}
    </div>
  );
}