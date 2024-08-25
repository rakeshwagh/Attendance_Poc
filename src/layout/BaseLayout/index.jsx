import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import "./BaseLayout.scss";
import { HeaderComponent } from "./Component/Header";
import { Sidebar } from "./Component/Sidebar";

const { Sider } = Layout;

export const BaseLayout = () => {
  return (
    <Layout className="layout">
      <HeaderComponent />
      <Layout>
        <Sider className="sider site-layout-background">
          <Sidebar />
        </Sider>
        <Layout className="main-content-layout">
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
