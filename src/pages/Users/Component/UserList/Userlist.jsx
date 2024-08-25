import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchEmployees } from "../../../../firebase/auth";

export const Userlist = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployees = async () => {
      try {
        fetchEmployees(setEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    getEmployees();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <span>
          <EyeOutlined
            onClick={() => navigate(`/users/view/${record.id}`)}
            className="me-3"
          />
          <EditOutlined onClick={() => navigate(`/users/edit/${record.id}`)} />
        </span>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/users">Employees</Link> },
        ]}
      />

      <Content className="content position-relative m-0">
        <div className="d-flex">
          <h3 className="m-0">UserList</h3>
          <Button
            type="primary"
            className="btn ms-auto btn-primary"
            icon={<PlusOutlined />}
            onClick={() => {
              navigate("/users/create");
            }}
          >
            Create User
          </Button>
        </div>
        <br />
        <div className="">
          <Table columns={columns} bordered dataSource={employees} />
        </div>
      </Content>
    </>
  );
};
