import { Breadcrumb, Button, Layout, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const { Content } = Layout;

const malls = [
  {
    id: 1,
    name: "Amanora",
    events: [
      { id: 1, name: "Ballroom Event", date: "2024-07-01", time: "1:00 PM" },
    ],
  },
  {
    id: 2,
    name: "Seasons",
    events: [
      { id: 2, name: "Fashion Show", date: "2024-07-02", time: "3:00 PM" },
    ],
  },
  {
    id: 3,
    name: "Phoenix",
    events: [
      { id: 3, name: "Music Concert", date: "2024-07-03", time: "5:00 PM" },
    ],
  },
];

const MallList = ({ malls, onSelectMall, selectedMall }) => (
  <div className="d-flex justify-content-center mb-4">
    {" "}
    {/* Added mb-4 for bottom margin */}
    {malls.slice(0, 3).map((mall) => (
      <button
        key={mall.id}
        className={`btn btn-outline-primary me-2 mb-2 ${
          selectedMall && selectedMall.id === mall.id ? "active" : ""
        }`}
        onClick={() => onSelectMall(mall)}
      >
        {mall.name}
      </button>
    ))}
  </div>
);

const EventTable = ({ mall }) => {
  const columns = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
  ];

  return (
    <div className="card mt-3 text-center">
      {" "}
      {/* Centered the event table */}
      <h5 className="card-header">Events at {mall.name}</h5>
      <div className="card-body">
        <Table
          dataSource={mall.events}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>
    </div>
  );
};

export const Event = () => {
  const [selectedMall, setSelectedMall] = useState(null);

  const handleSelectMall = (mall) => {
    setSelectedMall(mall);
  };

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/event">Events</Link> },
        ]}
      />
      <Content className="content position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Events</h3>
          <Button type="primary" className="btn ms-auto btn-primary">
            Submit
          </Button>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4 text-center">
            <div className="card">
              <div className="card-body">
                <MallList
                  malls={malls}
                  onSelectMall={handleSelectMall}
                  selectedMall={selectedMall}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {selectedMall && <EventTable mall={selectedMall} />}
          </div>
        </div>
      </Content>
    </>
  );
};

export default Event;
