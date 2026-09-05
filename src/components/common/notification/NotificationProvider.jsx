import { useState } from "react";
import NotificationContext from "./NotificationContext";
import Notification from "./Notification";

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const show = (
    variant,
    message,
    title = ""
  ) => {

    setNotification({
      variant,
      title,
      message,
    });

  };

  const notify = {
    success: (message) =>
      show("success", message, "Success"),
    error: (message) =>
      show("error", message, "Error"),
    warning: (message) =>
      show("warning", message, "Warning"),
    delete: (message) =>
      show("delete", message, "Delete"),
    info: (message) =>
      show("info", message, "Information"),

  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </NotificationContext.Provider>
  );
}