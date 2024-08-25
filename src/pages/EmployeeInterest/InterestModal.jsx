import { Form, Input, Modal } from "antd";
import React from "react";

export const InterestModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  form,
  editInterest,
  newInterestName,
  setNewInterestName,
}) => {
  return (
    <Modal
      title={editInterest ? "Edit Interest" : "Add your Interest"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} initialValues={{ interestName: newInterestName }}>
        <Form.Item
          label="Enter Your Interest"
          name="interestName"
          rules={[{ required: true, message: "Interest cannot be empty" }]}
        >
          <Input
            name="interestName"
            value={newInterestName}
            onChange={(e) => setNewInterestName(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
