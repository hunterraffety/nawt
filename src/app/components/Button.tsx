import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  isLoading = false,
  disabled = false,
  className = "",
}) => {
  const baseStyle =
    "px-4 py-2 rounded-md font-medium transition duration-200 focus:outline-none focus:ring focus:ring-opacity-50";
  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary:
      "bg-gray-700 hover:bg-gray-800 text-white border border-gray-600",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const disabledStyles =
    disabled || isLoading ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variantStyles[variant]} ${disabledStyles} ${className}`}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;
