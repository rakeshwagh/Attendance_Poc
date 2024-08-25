import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Popconfirm, Table, Pagination } from "antd";
import React from "react";

export const TitleTable = ({ titles, handleEdit, handleDelete }) => {
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
      title: "Title Name",
      dataIndex: "name",
      key: "name",
      width: 300,
      align: "left",
    },
    {
      title: "Grades",
      dataIndex: "grade",
      key: "grade",
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
            title="Are you sure you want to delete this title?"
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

  const titleData = titles
    .filter((title) => title.isDelete !== true)
    .map((title) => ({
      key: title.id,
      id: title.id,
      name: title.name,
      grade: title.grade,
    }));

  return (
    <div className="">
      <Table columns={columns} bordered dataSource={titleData} size="middle" />
    </div>
  );
};
