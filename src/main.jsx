import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import "./customBootstrap.scss";
import store from "./store";
import "./styles.scss";
import { ConfigProvider } from "antd";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider theme={{ hashed: false }}>
        <AppRouter />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>
);
