import { useState } from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import { login, verifyToken } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = await login(values.email, values.password);
      localStorage.setItem("token", token);
      const user = await verifyToken();
      const userData = {
        name: user.name,
        email: user.email,
        role: user.role,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      message.success("Logged in!");
      navigate("/");
    } catch (err) {
      console.error(err);
      message.error("Login failed. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <Card
        className="w-full max-w-md shadow-lg"
        bordered={false}
        style={{ borderRadius: 16 }}
      >
        <Typography.Title level={2} className="text-center mb-6 text-blue-700">
          Admin Login
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input size="large" placeholder="admin@example.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className="mt-2"
          >
            Login
          </Button>
        </Form>
        <div className="text-center mt-4">
          <Link to="/signup" className="text-blue-600 hover:underline">
            Don't have an account? Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
}
