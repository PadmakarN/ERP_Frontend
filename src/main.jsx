import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalWinProvider } from "./components/common/ModalWin";
import NotificationProvider from "./components/common/Notification/NotificationProvider";
import AppRoutes from "./routes/Routes";
import ThemeManager from "./components/common/ThemeManager";
import store from "../src/store/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeManager />
    <BrowserRouter>
     <NotificationProvider>
        <ModalWinProvider>
        <AppRoutes />
        </ModalWinProvider>
        </NotificationProvider>
    </BrowserRouter>
  </Provider>
);
