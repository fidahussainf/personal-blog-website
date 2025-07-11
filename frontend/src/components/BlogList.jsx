import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BlogCard from "./BlogCard";

dayjs.extend(relativeTime);

export default function BlogList({ blogs }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-7xl mx-auto  py-8">
      <div className="flex justify-between items-center mb-8">
        <Typography.Title level={2} className="!mb-0 !text-gray-900">
          Latest Articles
        </Typography.Title>
        {user?.role === "ADMIN" && (
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/create-blog")}
            className="flex items-center gap-2"
          >
            <span>+</span> Create New
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <Typography.Text className="text-gray-500">
            No blogs found.{" "}
            {user?.role === "ADMIN" && "Create your first blog!"}
          </Typography.Text>
        </div>
      )}
    </div>
  );
}
