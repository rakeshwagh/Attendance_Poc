import { Content } from "antd/es/layout/layout";
import { Breadcrumb, DatePicker, Table, Space, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export const Attendance = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [position, setPosition] = useState("CheckOut");
  const navigate = useNavigate();
  const onChange = () => {};

  const columns = [
    {
      title: "CheckIn Time",
      dataIndex: "CheckIn",
      key: "CheckIn",
      width: 350,
      align: "left",
    },
    {
      title: "CheckOut Time",
      dataIndex: "CheckOut",
      key: "CheckOut",
      width: 350,
      align: "left",
    },
    {
      title: "Daily Attendance Summary",
      dataIndex: "Summary",
      key: "Summary",
      width: 1000,
      onCell: (record, rowIndex) => ({
        rowSpan: rowIndex === 0 ? 4 : 0,
      }),
      render: (_, record) => (
        <>
          <div>Shift: General</div>
          <div>Hours Expected: 8</div>
          <div>Hours Tracked: 7</div>
          <div>Break Hours: 1</div>
          <div>Status: Present</div>
          <div>Comments: NA</div>
        </>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      CheckIn: "10:00 AM",
      CheckOut: "---",
    },
    {
      key: "2",
      CheckIn: "---",
      CheckOut: "1:00 PM",
    },
    {
      key: "3",
      CheckIn: "1:30 PM",
      CheckOut: "--- ",
    },
    {
      key: "4",
      CheckIn: "---",
      CheckOut: "3:00 PM",
    },
  ];
  const handleCheckIn = () => {
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    navigate("/", { replace: true });
  };
  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/attendance">Attendance</Link> },
        ]}
      />
      <Content className="content position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">CheckIn</h3>
          <div className="float-right d-flex align-items-center">
            <Space>
              <Radio.Group
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <Radio.Button
                  value="CheckIn"
                  onClick={handleCheckIn}
                  disabled={isCheckedIn}
                >
                  CheckIn
                </Radio.Button>
                <Radio.Button value="CheckOut" onClick={handleCheckOut}>
                  CheckOut
                </Radio.Button>
              </Radio.Group>
            </Space>
            <div style={{ marginLeft: 30 }}>
              <DatePicker onChange={onChange} needConfirm />
            </div>
          </div>
        </div>
        <div className="">
          <Table columns={columns} bordered dataSource={data} size="middle" />
        </div>
      </Content>
    </>
  );
};
