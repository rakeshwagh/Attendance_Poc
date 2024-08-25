import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Alert, Breadcrumb, Button, Form, Popconfirm, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addRole, deleteRole, fetchRoles, updateRole } from "./Helper";
import { UpsertRole } from "./UpsertRole";

export const Role = () => {
  const [roles, setRoles] = useState([]);
  const [editRole, setEditRole] = useState(null);
  const [form] = Form.useForm();
  const [newRole, setNewRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState({
    status: false,
    title: "error",
    message: "",
  });

  useEffect(() => {
    fetchRoles(setRoles);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      const roleExist = roles.find(
        (role) =>
          role.name.toLowerCase().trim() === newRole.toLowerCase().trim()
      );

      if (editRole) {
        const updatedRole = {
          ...editRole,
          name: newRole,
        };
        await updateRole(updatedRole);
        fetchRoles(setRoles);
        form.resetFields();
        setIsModalOpen(false);
      } else {
        if (roleExist) {
          setError({
            status: true,
            title: "warning",
            message: "Role with this name is already exists.",
          });
        } else {
          const roleToAdd = {
            name: newRole,
            isDelete: false,
          };
          await addRole(roleToAdd);
          fetchRoles(setRoles);
          form.resetFields();
          setNewRole("");
          setIsModalOpen(false);
          setEditRole(null);
        }
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setNewRole("");
    setIsModalOpen(false);
    setEditRole(null);
  };

  const handleDelete = async (roleId) => {
    try {
      await deleteRole(roleId);
      fetchRoles(setRoles);
    } catch (error) {
      console.error("Error deleting Title:", error);
    }
  };

  const handleEdit = (record) => {
    setEditRole(record);
    setNewRole(record.name);
    form.setFieldsValue({ RoleName: record.name });
    showModal();
  };

  const columns = [
    {
      title: "Sr. No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
      width: 200,
      align: "left",
    },
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      width: 300,
      align: "left",
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      align: "left",
      render: (text, record) => (
        <span>
          <EditOutlined className="me-4" onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Are you sure you want to delete this Role?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined />
          </Popconfirm>
        </span>
      ),
    },
  ];

  const roleData = roles
    .filter((role) => role.isDelete !== true)
    .map((role) => ({
      key: role.id,
      id: role.id,
      name: role.name,
    }));

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/role">Roles</Link> },
        ]}
      />
      <Content className="content position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Roles</h3>
          <Button
            type="primary"
            className="btn ms-auto btn-primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Add Role
          </Button>
        </div>
        <div>
          <Table
            columns={columns}
            bordered
            dataSource={roleData}
            size="middle"
          />
        </div>
        <UpsertRole
          title={editRole ? "Edit role" : "Add New role"}
          isOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          form={form}
          newRole={newRole}
          setNewRole={setNewRole}
        />
      </Content>
      {error.status && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
          }}
        >
          <Alert
            message={error.title}
            description={error.message}
            type={error.title}
            showIcon
            closable
            onClose={() =>
              setError({ status: false, title: "error", message: "" })
            }
          />
        </div>
      )}
    </>
  );
};
