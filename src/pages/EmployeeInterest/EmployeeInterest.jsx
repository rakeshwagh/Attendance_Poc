import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Layout,
  Modal,
  Popconfirm,
  Table,
  Alert,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addInterest,
  deleteInterest,
  fetchInterests,
  updateInterest,
} from "./Helper.js";
import { InterestModal } from "./InterestModal";
import { InterestTable } from "./InterestTable";

const { Content } = Layout;

export const EmployeeInterest = () => {
  const [interests, setInterests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editInterest, setEditInterest] = useState(null);
  const [form] = Form.useForm();
  const [newInterestName, setNewInterestName] = useState("");
  const [error, setError] = useState({
    status: false,
    title: "error",
    message: "",
  });

  useEffect(() => {
    fetchInterests(setInterests);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      if (editInterest) {
        const updatedInterest = {
          ...editInterest,
          name: newInterestName,
        };
        await updateInterest(updatedInterest);
        fetchInterests(setInterests);
        fetchInterests(setInterests);
        form.resetFields();
        setIsModalOpen(false);
      } else {
        const InterestExists = interests.find(
          (interest) =>
            interest.name.trim().toLowerCase() ===
            newInterestName.trim().toLowerCase()
        );

        if (InterestExists) {
          setError({
            status: true,
            title: "warning",
            message: "Interest with this name is already exists.",
          });
        } else {
          const interestToAdd = {
            name: newInterestName,
            isDelete: false,
          };
          await addInterest(interestToAdd);
          fetchInterests(setInterests);
          form.resetFields();
          setNewInterestName("");
          setIsModalOpen(false);
          setEditInterest(null);
        }
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setNewInterestName("");
    setIsModalOpen(false);
    setEditInterest(null);
  };

  const handleDelete = async (interestId) => {
    try {
      await deleteInterest(interestId);
      fetchInterests(setInterests);
      fetchInterests(setInterests);
    } catch (error) {
      console.error("Error deleting interest:", error);
    }
  };

  const handleEdit = (record) => {
    setEditInterest(record);
    setNewInterestName(record.name);
    form.setFieldValue("interestName", record.name);
    showModal();
  };

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/other">Employee Interests</Link> },
        ]}
      />
      <Content className="content position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Employee Interests</h3>
          <Button
            type="primary"
            className="btn ms-auto btn-primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Add Interest
          </Button>
        </div>
        <InterestTable
          interests={interests}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <InterestModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          form={form}
          editInterest={editInterest}
          newInterestName={newInterestName}
          setNewInterestName={setNewInterestName}
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

export default EmployeeInterest;
