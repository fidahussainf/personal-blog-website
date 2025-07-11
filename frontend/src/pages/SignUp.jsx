import React, { useState } from 'react'
import { Form, Input, Button, message, Card, Typography } from "antd";
import { signup } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await signup(values.name, values.email, values.password);
      message.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      message.error(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
      <Card
        className="w-full max-w-md shadow-lg"
        bordered={false}
        style={{ borderRadius: 16 }}
      >
        <Typography.Title level={2} className="text-center mb-6 text-blue-700">
          Sign Up
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input size="large" placeholder="Your Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input size="large" placeholder="you@example.com" />
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
            Sign Up
          </Button>
        </Form>
        <div className="text-center mt-4">
          <Link to="/login"
            className="text-blue-600 hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default SignUp