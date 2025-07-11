import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, deleteBlog } from "../services/blog";
import { Typography, Button, Popconfirm, Divider, Space, message } from "antd";

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
    <div className="max-w-7xl mx-auto  py-12">
      <div className="mb-8">
        <Typography.Title level={1} className="!mt-3 !mb-4">
          {blog?.title}
        </Typography.Title>
      </div>

      <div className="prose max-w-none">
        <Typography.Paragraph className="text-lg leading-relaxed">
          {blog?.content}
        </Typography.Paragraph>
      </div>

      {user?.role === "ADMIN" && (
        <>
          <Divider />
          <Space>
            <Button 
              type="primary" 
              onClick={() => navigate(`/edit-blog/${id}`)}
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