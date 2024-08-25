import { Button, Card, Form, Input, notification } from "antd";
import { ref, set } from "firebase/database";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { db } from "../../firebase/firebaseConfig";
import "./SignUp.scss";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      await doCreateUserWithEmailAndPassword(
        formData.email,
        formData.password
      ).then((userInfo) => {
        set(ref(db, `Employee/${userInfo.user.uid}`), {
          userId: userInfo.user.uid,
          role: [
            {
              id: "-O1wO9Bauy-vTYvVMHg7",
              name: "Viewer",
              isDelete: false,
            },
          ],
          name: formData.firstName + " " + formData.lastName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: userInfo.user.email,
          phoneNumber: formData.phone,
          createdAt: new Date().toISOString(),
          selflogin: true,
        });
      });

      //Antd Notification
      notification.success({
        message: "Signup Successful",
        description: "Your account has been created successfully.",
      });

      navigate("/signin");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        notification.error({
          message: "Signup Failed",
          description:
            "This email address is already in use. Please use a different email address.",
        });
      } else {
        console.error(error.message);
      }
    }
  };
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <Card className="signupCard shadow-sm">
        <Form
          form={form}
          name="SignupForm"
          onFinish={onSubmit}
          initialValues={formData}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <h2 className="text-center">Create New Account</h2>
          <div className="row">
            <div className="col-12 mb-2">
              <Form.Item
                className="form-label mb-0"
                label="Firstname"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter first name" },
                  {
                    min: 3,
                    max: 100,
                    message:
                      "Firstname must be between 3 and 100 characters long.",
                  },
                  {
                    pattern: /^[a-zA-Z\s-']*$/,
                    message: "Special characters are not allowed.",
                  },
                ]}
              >
                <Input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            <div className="col-12 mb-2">
              <Form.Item
                className="form-label mb-0"
                label="Lastname"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter last name" },
                  {
                    min: 3,
                    max: 100,
                    message:
                      "Last name must be between 3 and 100 characters long.",
                  },
                  {
                    pattern: /^[a-zA-Z\s-']*$/,
                    message: "Special characters are not allowed.",
                  },
                ]}
              >
                <Input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            <div className="col-12 mb-2">
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
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            <div className="col-12 mb-2">
              <Form.Item
                className="form-label mb-0"
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone number" },
                  {
                    len: 10,
                    message: "Phone number must be exactly 10 digits",
                  },
                  {
                    pattern: /^\d+$/,
                    message: "Phone number must only contain digits",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div className="col-12 mb-2">
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
                  className="form-control "
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            <div className="col-12 mb-2">
              <Form.Item
                className="form-label mb-0"
                label="ConfirmPassword"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password",
                  },
                  {
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long and contain letters, numbers, and special characters.",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className="py-2">
            <Button
              type="primary"
              htmlType="submit"
              className="btn w-100 btn-primary mt-4"
            >
              Create
            </Button>
          </div>
          <p className="forgot-password text-center mb-0">
            Already have account? <Link to="/signin">SignIn</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};
