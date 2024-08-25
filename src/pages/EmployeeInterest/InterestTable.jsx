import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import React from "react";

export const InterestTable = ({ interests, handleEdit, handleDelete }) => {
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
      title: "Employee Interest",
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
            title="Are you sure you want to delete this interest?"
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

  const interestData = interests
    .filter((interest) => interest.isDelete !== true)
    .map((interest) => ({
      key: interest.id,
      id: interest.id,
      name: interest.name,
    }));

  return (
    <div className="">
      <Table
        columns={columns}
        bordered
        dataSource={interestData}
        size="middle"
      />
    </div>
  );
};
