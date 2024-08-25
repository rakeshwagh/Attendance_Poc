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
  Modal,
  Popconfirm,
  Table,
  Alert,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import {
  addRegion,
  deleteRegion,
  fetchRegions,
  updateRegion,
} from "./Helper.js";
import { useEffect, useState } from "react";

export const Region = () => {
  const [regions, setRegions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRegion, setEditRegion] = useState(null);
  const [form] = Form.useForm();
  const [newRegionName, setNewRegionName] = useState("");

  const [error, setError] = useState({
    status: false,
    title: "error",
    message: "",
  });

  useEffect(() => {
    fetchRegions(setRegions);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();

      if (editRegion) {
        const updatedRegion = {
          ...editRegion,
          name: newRegionName,
        };
        await updateRegion(updatedRegion);
        fetchRegions(setRegions);
        fetchRegions(setRegions);
        form.resetFields();
        setIsModalOpen(false);
      } else {
        const regionExists = regions.find(
          (region) =>
            region.name.trim().toLowerCase() ===
            newRegionName.trim().toLowerCase()
        );

        if (regionExists) {
          setError({
            status: true,
            title: "warning",
            message: "Region with this name is already exists.",
          });
          setError({
            status: true,
            title: "warning",
            message: "Region with this name is already exists.",
          });
        } else {
          const regionToAdd = {
            name: newRegionName,
            isDelete: true,
          };
          await addRegion(regionToAdd);
          fetchRegions(setRegions);
          fetchRegions(setRegions);
          form.resetFields();
          setNewRegionName("");
          setIsModalOpen(false);
          setEditRegion(null);
        }
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setNewRegionName("");
    setIsModalOpen(false);
    setEditRegion(null);
    setEditRegion(null);
  };

  const handleDelete = async (regionId) => {
    try {
      await deleteRegion(regionId);
      fetchRegions(setRegions);
      fetchRegions(setRegions);
    } catch (error) {
      console.error("Error deleting region:", error);
    }
  };

  const handleEdit = (record) => {
    setEditRegion(record);
    setNewRegionName(record.name);
    form.setFieldsValue({ regionName: record.name });
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
      title: "Region Name",
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
          <EditOutlined
            key="edit"
            className="me-4"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            key="delete"
            title="Are you sure you want to delete this region?"
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

  let regionData = regions
    .filter((region) => region.isDelete !== true)
    .map((region) => ({
      key: region.id,
      id: region.id,
      name: region.name,
    }));

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/region">Regions</Link> },
        ]}
      />
      <Content className="content position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Regions</h3>
          <Button
            type="primary"
            className="btn ms-auto btn-primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Add Region
          </Button>
        </div>
        <div className="">
          <Table
            columns={columns}
            bordered
            dataSource={regionData}
            size="middle"
          />
        </div>
        <Modal
          title={editRegion ? "Edit Region" : "Add New Region"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form}>
            <Form.Item
              label="Region Name"
              name="regionName"
              rules={[
                { required: true, message: "Region name cannot be empty" },
              ]}
            >
              <Input
                value={newRegionName}
                onChange={(e) => setNewRegionName(e.target.value)}
                placeholder="Enter Region name"
              />
            </Form.Item>
          </Form>
        </Modal>
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

export default Region;
