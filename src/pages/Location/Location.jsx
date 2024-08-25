import { PlusOutlined } from "@ant-design/icons";
import { Alert, Breadcrumb, Button, Form, Input, Modal, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addLocation,
  deleteLocation,
  fetchLocations,
  updateLocation,
} from "./Helper.js";
import { LocationTable } from "./Locationtable.jsx";
// import { LocationTable } from "./LocationTable";

const { Option } = Select;

export const Location = () => {
  const [locations, setLocations] = useState([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLocation, setEditLocation] = useState(null);

  const [newLocationName, setNewLocationName] = useState("");
  const [regionName, setRegionName] = useState("");
  const [regionId, setRegionId] = useState("");

  const regionLookup = useSelector((state) => state.lookups.regionsLookup);
  const [error, setError] = useState({
    status: false,
    title: "error",
    message: "",
  });

  useEffect(() => {
    fetchLocations(setLocations);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      if (editLocation) {
        const updatedLocation = {
          ...editLocation,
          name: newLocationName,
          regionName: regionName,
          regionId: regionId,
        };
        await updateLocation(updatedLocation);
        fetchLocations(setLocations);
        form.resetFields();
        setIsModalOpen(false);
      } else {
        const locationExists = locations.find(
          (location) =>
            location.name.trim().toLowerCase() ===
            newLocationName.trim().toLowerCase()
        );
        if (locationExists) {
          setError({
            status: true,
            title: "warning",
            message: "Location with this name is already exists.",
          });
        } else {
          const locationToAdd = {
            name: newLocationName,
            regionName: regionName,
            regionId: regionId,
            isDelete: true,
          };
          await addLocation(locationToAdd);
          fetchLocations(setLocations);
          form.resetFields();
          setNewLocationName("");
          setRegionName("");
          setRegionId("");
          setIsModalOpen(false);
          setEditLocation(null);
        }
      }
    } catch (error) {
      console.log("Validation error", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewLocationName("");
    setRegionName("");
    setRegionId("");
    setEditLocation(null);
  };

  const handleDelete = async (locationId) => {
    try {
      await deleteLocation(locationId);
      fetchLocations(setLocations);
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  const handleEdit = (record) => {
    setEditLocation(record);
    setNewLocationName(record.name);
    setRegionName(record.regionName);
    setRegionId(record.regionId);
    form.setFieldsValue({
      locationName: record.name,
      regionName: record.regionName,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/location">Locations</Link> },
        ]}
      />
      <Content className="content position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Locations</h3>
          <Button
            type="primary"
            className="btn ms-auto btn-primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Add Location
          </Button>
        </div>
        <LocationTable
          locations={locations}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <Modal
          title={editLocation ? "Edit Location" : "Add New Location"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            initialValues={
              editLocation
                ? {
                    locationName: editLocation.name,
                  }
                : null
            }
          >
            <Form.Item
              label="Enter Location Name"
              name="locationName"
              rules={[
                { required: true, message: "Location name cannot be empty" },
              ]}
            >
              <Input
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
                placeholder="Enter Location name"
              />
            </Form.Item>
            <Form.Item
              label="Select Region"
              name="regionName"
              rules={[
                { required: true, message: "Region name cannot be empty" },
              ]}
            >
              <Select
                value={regionName}
                onChange={(value) => {
                  const selectedRegion = regionLookup.find(
                    (r) => r.name === value
                  );
                  if (selectedRegion) {
                    setRegionName(value);
                    setRegionId(selectedRegion.id);
                  }
                }}
                placeholder="Select region"
              >
                {regionLookup &&
                  regionLookup.map((region) => (
                    <Option key={region.id} value={region.name}>
                      {region.name}
                    </Option>
                  ))}
              </Select>
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

export default Location;
