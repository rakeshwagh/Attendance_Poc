import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doSignOut } from "../../../firebase/auth";

const { Header } = Layout;

export const HeaderComponent = () => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});
  const user = useSelector((state) => state.loggedinuser.loggedInUser);
  const name = sessionStorage.getItem("loggedInUser");

  useEffect(() => {
    if (user) {
      setUserProfile(user);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await doSignOut(dispatch);
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };
  return (
    <Header className="d-flex align-items-center position-relative p-2">
      <h3 className="text-light mb-0">User Attendance</h3>
      <div className="d-flex position-absolute end-0 ">
        {userProfile && (
          <div className="ms-2 d-flex align-items-center">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              src={userProfile.photoURL}
              className="border-2 border-secondary"
            />
            <span className="text-light ms-2">{name}</span>
          </div>
        )}
        <div className="mx-3">
          <Button
            type="primary"
            className="btn btn-primary border-secondary"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </Header>
  );
};
