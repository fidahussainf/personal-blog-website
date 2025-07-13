import { Tag, Typography, Button } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function BlogCard({ blog }) {
  const navigate = useNavigate();
  const getFirstLine = (htmlContent) => {
    if (!htmlContent) return '';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
  
    const plainText = tempDiv.textContent || '';
    const firstLine = plainText.split('\n')[0];
  
    return firstLine.length > 100 
      ? `${firstLine.substring(0, 100)}...` 
      : firstLine;
  };

  return (
    <div
      key={blog._id}
      className="card cursor-pointer bg-gray-100 rounded-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
      onClick={() => navigate(`/blog/${blog._id}`)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Tag color="blue" className="!m-0">
            {blog.blogCategory || "General"}
          </Tag>
          <span className="text-sm text-gray-500">
            {dayjs(blog.createdAt).fromNow()}
          </span>
        </div>
        <Typography.Title
          level={4}
          className="!mb-3 !text-lg hover:text-blue-600 transition-colors"
        >
          {blog.title}
        </Typography.Title>
        <Typography.Paragraph
          className="!mb-4 text-gray-600 line-clamp-3"
        >
          {getFirstLine(blog.content)}
        </Typography.Paragraph>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            By {blog.author}
          </span>
          <Button
            type="text"
            className="text-blue-600 hover:!text-blue-800"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blog/${blog._id}`);
            }}
          >
            Read More →
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;