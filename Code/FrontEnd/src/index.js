import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";
import AxiosGlobalSettings from "utils/axios";
import "antd/dist/antd.css";
import "index.module.scss";

AxiosGlobalSettings();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
