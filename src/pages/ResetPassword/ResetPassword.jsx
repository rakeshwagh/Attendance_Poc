import { Button, Card, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doPasswordReset } from "../../firebase/auth";
import "./ResetPassword.scss";

export const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onSubmit = async (e) => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    try {
      await doPasswordReset(oldPassword, newPassword);
      navigate("/signin");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <Card className="ResetCard shadow-sm">
        <Form
          form={form}
          name="ResetPasswordForm"
          onFinish={onSubmit}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <h3 className="text-center">Reset Password</h3>
          <div className="mb-3">
            <Form.Item
              className="form-label mb-0"
              label="Old Password"
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: "Old password is required",
                },
              ]}
            >
              <Input
                type="password"
                className="form-control"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              className="form-label mb-0"
              label="New Password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "New password is required.",
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit and one special character.",
                },
              ]}
            >
              <Input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              className="form-label mb-0"
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password.",
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit and one special character.",
                },
              ]}
            >
              <Input
                type="password"
                className="form-control"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className="d-grid">
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-primary"
            >
              Reset Password
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};
