import { Form, Input, Button, Select } from "antd";

export default function BlogForm({ onFinish, loading, initialValues }) {
  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
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
          name="content"
          rules={[{ required: true, message: "Please enter blog content" }]}
        >
          <Input.TextArea
            rows={6}
            placeholder="Write your blog content here..."
            className="border rounded-lg p-2"
            style={{ resize: "vertical" }}
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
            name="blogCategory"
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
