import { EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card } from "antd";
import { Content } from "antd/es/layout/layout.js";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchUserById } from "../../../../firebase/auth.js";

export const ViewUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUserById(userId).then((data) => setUser(data));
    }
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/users">Employees</Link> },
          { title: "View Profile" },
        ]}
      />
      <Content className="content position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Employee Profile</h3>
          <Button
            type="primary"
            className="btn btn-primary"
            icon={<EditOutlined />}
          >
            <Link to={`/users/edit/${userId}`}>Edit Profile</Link>
          </Button>
        </div>
        <Card className="m-auto">
          <div className="mb-4 border rounded p-3">
            <h4 className="text-primary">Basic Details</h4>
            <div className="row">
              <div className="col">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  readOnly
                  value={user.firstName}
                />
              </div>
              <div className="col">
                <label className="form-label">Middle Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  readOnly
                  value={user.middleName}
                />
              </div>
              <div className="col">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  readOnly
                  value={user.lastName}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Display Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  readOnly
                  value={user.name}
                />
              </div>
              <div className="col">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  readOnly
                  value={user.email}
                />
              </div>
              <div className="col">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  readOnly
                  value={user.phoneNumber}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 border rounded p-3">
            <h4 className="text-primary">Personal Details</h4>
            <div className="row">
              <div className="col">
                <label className="form-label">Gender</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  readOnly
                  value={user.gender}
                />
              </div>
              <div className="col">
                <label className="form-label">Nationality</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  readOnly
                  value={user.nationality}
                />
              </div>
              <div className="col">
                <label className="form-label">Marital Status</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  readOnly
                  value={user.maritalStatus}
                />
              </div>
            </div>
          </div>
          {user.interests && (
            <div className="mb-4 border rounded p-3">
              <h4 className="text-primary">Additional Information</h4>
              <div className="row">
                <div className="col">
                  <label className="form-label">Interests</label> <br />
                  <div className="row">
                    {user.interests.map((interest, index) => (
                      <div key={index} className="col-6">
                        <input
                          type="checkbox"
                          name="interest"
                          id={`interest-${index}`}
                          defaultChecked
                          className="me-2"
                        />
                        <label htmlFor={`interest-${index}`}>
                          {interest.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col"></div>
                <div className="col"></div>
              </div>
            </div>
          )}
        </Card>
      </Content>
    </>
  );
};
