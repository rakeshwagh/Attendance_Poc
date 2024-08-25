import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import React from "react";

export const LocationTable = ({ locations, handleEdit, handleDelete }) => {
  const columns = [
    {
      title: "Sr. No",
      dataIndex: "id",
      render: (text, record, index) => index + 1,
      width: 200,
      align: "left",
    },
    {
      title: "Location Name",
      dataIndex: "name",
      key: "name",
      width: 300,
      align: "left",
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      width: 200,
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
            title="Are you sure you want to delete this location?"
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

  const locationData = locations
    .filter((location) => location.isDelete !== true)
    .map((location) => ({
      key: location.id,
      id: location.id,
      name: location.name,
      region: location.regionName,
    }));

  return (
    <div className="">
      <Table
        columns={columns}
        bordered
        dataSource={locationData}
        size="middle"
      />
    </div>
  );
};
