import React, { useEffect, useState } from "react";

const TailwindToast = ({ message, show, onClose, type = "primary" }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);

    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000); // Auto hide after 3s

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  // Background colors
  let bgClass = "bg-blue-600"; // default
  if (type === "success") bgClass = "bg-green-600";
  else if (type === "error") bgClass = "bg-red-600";

  return (
    <>
      {visible && (
        <div
          className={`fixed bottom-5 right-5 z-50 min-w-[250px] rounded-lg shadow-lg text-white ${bgClass} border border-gray-300 transition-transform transform duration-300`}
        >
          <div className="flex items-center justify-between p-4">
            <div className="text-sm">{message}</div>
            <button
              onClick={() => {
                setVisible(false);
                onClose();
              }}
              className="text-white hover:text-gray-200 font-bold ml-4"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TailwindToast;
