import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <Layout className="layout d-grid">
      <Layout className="content-layout p-4">
        <Outlet />
      </Layout>
    </Layout>
  );
};
