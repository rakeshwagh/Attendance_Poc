import { Button, Form, Input, Modal } from "antd";
import React from "react";

export const UpsertRole = ({
  title,
  isOpen,
  handleOk,
  handleCancel,
  form,
  newRole,
  setNewRole,
}) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          label="Role Name"
          name="RoleName"
          rules={[{ required: true, message: "Please enter Role name" }]}
        >
          <Input
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Enter Role name"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
