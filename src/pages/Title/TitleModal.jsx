import { Form, Input, Modal, Select } from "antd";
import React from "react";

export const TitleModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  form,
  editTitle,
  newTitleName,
  setNewTitleName,
  newGrade,
  setNewGrade,
}) => {
  return (
    <Modal
      title={editTitle ? "Edit Title" : "Add New Title"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form}>
        <Form.Item
          label="Title Name"
          name="TitleName"
          rules={[{ required: true, message: "Please enter title name" }]}
        >
          <Input
            value={newTitleName}
            onChange={(e) => setNewTitleName(e.target.value)}
            placeholder="Enter title name"
          />
        </Form.Item>
        <Form.Item
          label="Grade"
          name="Grade"
          rules={[{ required: true, message: "Please select grade" }]}
        >
          <Select value={newGrade} onChange={(value) => setNewGrade(value)}>
            <Select.Option value={1}>Grade 1</Select.Option>
            <Select.Option value={2}>Grade 2</Select.Option>
            <Select.Option value={3}>Grade 3</Select.Option>
            <Select.Option value={4}>Grade 4</Select.Option>
            <Select.Option value={5}>Grade 5</Select.Option>
            <Select.Option value={6}>Grade 6</Select.Option>
            <Select.Option value={7}>Grade 7</Select.Option>
            <Select.Option value={8}>Grade 8</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
