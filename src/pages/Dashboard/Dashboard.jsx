import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetInterestLookupApi,
  GetLocationLookupApi,
  GetRegionLookupApi,
  GetRolesLookup,
  GetTitleLookupApi,
} from "../../GetApi/GetLookupApi";
import "./Dashboard.scss";
import { GetEmployeeCount } from "../../firebase/auth";

export const DashboardPage = () => {
  const [count, setCount] = useState(0);
  GetEmployeeCount()
    .then((count) => {
      setCount(count);
    })
    .catch((error) => {
      console.error("Error fetching employee count:", error);
    });

  return (
    <div>
      <Card className="w-25 my-2 shadow-sm">
        <div className="d-flex align-items-center justify-content-center">
          <div className="w-25">
            <img src="./assets/Users.png" className="w-75" alt="Total users" />
          </div>
          <div className="mx-4">
            <p className="fs-5">Total Users</p>
            <p className="fw-bold fs-1">{count}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
