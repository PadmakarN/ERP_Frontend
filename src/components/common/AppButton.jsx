import React from "react";

const AppButton = ({
  text,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | success | danger
  className = "",
  disabled = false,
}) => {
const baseStyle =
  `
  h-11
  px-4
  rounded-xl
  text-sm
  font-semibold
  transition-all
  duration-200
  flex
  items-center
  justify-center
  gap-2
  `;
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {text}
    </button>
  );
};

export default AppButton;