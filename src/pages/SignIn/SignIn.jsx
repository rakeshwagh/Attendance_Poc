import { Button, Card, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import "./SignIn.scss";

export const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onSubmit = async (e) => {
    try {
      await doSignInWithEmailAndPassword(email, password, dispatch, navigate);
      notification.success({
        message: "Sign in successfully",
      });
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        notification.error({
          message: "Signin Failed",
          description: "Please check your email and password and try again",
        });
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <Card className="signinCard shadow-sm">
        <Form
          form={form}
          name="SigninForm"
          onFinish={onSubmit}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <h3 className="text-center">Log In</h3>
          <div className="mb-2">
            <Form.Item
              className="form-label mb-0"
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className="mb-2">
            <Form.Item
              className="form-label mb-0"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters long and contain letters, numbers, and special characters.",
                },
              ]}
            >
              <Input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className="py-2">
            <Button
              type="primary"
              htmlType="submit"
              className="btn w-100 btn-primary"
            >
              Signin
            </Button>
          </div>
          <p className="forgot-password text-center mb-0">
            New user? <Link to="/signup">Register Here</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};
