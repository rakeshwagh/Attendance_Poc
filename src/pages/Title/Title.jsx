import {
  PlusOutlined
} from "@ant-design/icons";
import { Alert, Breadcrumb, Button, Form, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addTitle, deleteTitle, fetchTitles, updateTitle } from "./Helper.js";
import { TitleModal } from "./TitleModal";
import { TitleTable } from "./TitleTable";

const { Content } = Layout;

export const Title = () => {
  const [Titles, setTitles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(null);
  const [editGrade, setEditGrade] = useState(null);
  const [form] = Form.useForm();
  const [newTitleName, setNewTitleName] = useState("");
  const [newGrade, setNewGrade] = useState(null);
  const [error, setError] = useState({
    status: false,
    title: "error",
    message: "",
  });

  useEffect(() => {
    fetchTitles(setTitles);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      if (editTitle) {
        const updatedTitle = {
          ...editTitle,
          name: newTitleName,
          grade: newGrade,
        };
        await updateTitle(updatedTitle);
        fetchTitles(setTitles);
        form.resetFields();
        setIsModalOpen(false);
      } else {
        const TitleExists = Titles.find(
          (title) =>
            title.name.trim().toLowerCase() ===
            newTitleName.trim().toLowerCase()
        );
        if (TitleExists) {
          setError({
            status: true,
            title: "warning",
            message: "Title with this name is already exists.",
          });
        } else {
          const TitleToAdd = {
            name: newTitleName,
            grade: newGrade,
            isDelete: false,
          };
          await addTitle(TitleToAdd);
          fetchTitles(setTitles);
          form.resetFields();
          setNewTitleName("");
          setNewGrade("");
          setIsModalOpen(false);
          setEditTitle(null);
        }
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setNewTitleName("");
    setNewGrade("");
    setIsModalOpen(false);
    setEditTitle(null);
  };

  const handleDelete = async (titleId) => {
    try {
      await deleteTitle(titleId);
      fetchTitles(setTitles);
    } catch (error) {
      console.error("Error deleting title:", error);
    }
  };

  const handleEdit = (record) => {
    setEditTitle(record);
    setNewTitleName(record.name);
    form.setFieldsValue({ TitleName: record.name });
    setEditGrade(record);
    setNewGrade(record.grade);
    form.setFieldValue({ grade: record.grade });

    showModal();
  };
  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/title">Titles</Link> },
        ]}
      />
      <Content className="content position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Titles</h3>
          <Button
            type="primary"
            className="btn ms-auto btn-primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Add Title
          </Button>
        </div>

        <TitleTable
          titles={Titles}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <TitleModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          form={form}
          editTitle={editTitle}
          editGrade={editGrade}
          newTitleName={newTitleName}
          setNewTitleName={setNewTitleName}
          newGrade={newGrade}
          setNewGrade={setNewGrade}
        />
      </Content>
      {/* Title exists notification */}
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

export default Title;
