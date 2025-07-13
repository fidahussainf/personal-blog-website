import { Form, Input, Button, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useState } from "react";

export default function BlogForm({ onFinish, loading, initialValues }) {
  const [content, setContent] = useState(initialValues?.content || "");

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleFormSubmit = (values) => {
    onFinish({ ...values, content }); // Pass content separately
  };

  // Quill modules and formats (customize toolbar)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <Form
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter blog title" }]}
        >
          <Input size="large" placeholder="Enter blog title" />
        </Form.Item>

        <Form.Item
          label="Content"
          required
          rules={[{ required: true, message: "Please enter blog content" }]}
        >
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            placeholder="Write your blog content here..."
            className="rounded-lg border-gray-300"
            style={{ height: "300px", marginBottom: "40px" }}
          />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: "Please enter author name" }]}
        >
          <Input size="large" placeholder="Enter author name" />
        </Form.Item>

        <Form.Item
          name="blogCategory"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            size="large"
            showSearch
            allowClear
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Select blog category"
            options={[
              { label: "Technology", value: "Technology" },
              { label: "Lifestyle", value: "Lifestyle" },
              { label: "Education", value: "Education" },
              { label: "Health", value: "Health" },
              { label: "Travel", value: "Travel" },
              { label: "General", value: "General" },
            ]}
            className="w-full"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="w-full"
          >
            {initialValues ? "Update Blog" : "Publish Blog"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}