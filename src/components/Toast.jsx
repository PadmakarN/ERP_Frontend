import React, { useEffect } from "react";

const Toast = ({
  show,
  onClose,
  message,
  type = "success",
}) => {

  useEffect(() => {

    if (show) {

      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }

  }, [show, onClose]);

  if (!show) return null;

  let bgColor = "bg-green-600";

  if (type === "error") {
    bgColor = "bg-red-600";
  } else if (type === "primary") {
    bgColor = "bg-blue-600";
  } else if (type === "warning") {
    bgColor = "bg-yellow-500 text-black";
  }

  return (
    <div
      className={`
        fixed
        top-30
        right-10
        z-[999999]
        min-w-[250px]
        rounded-lg
        shadow-lg
        text-white
        ${bgColor}
      `}
    >
      <div className="flex items-center justify-between p-3">

        <div className="text-sm">
          {message}
        </div>

        <button
          onClick={onClose}
          className="font-bold ml-4"
        >
          ×
        </button>

      </div>
    </div>
  );
};

export default Toast;