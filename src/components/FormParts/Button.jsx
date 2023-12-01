import React from "react";

function Button({
  children,
  type = "button",
  className = "",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  rounded = "rounded-lg",
  padding = "px-3 py-3",
  margin = "",
  border = "",
  ...props
}) {
  return (
    <div className="w-full">
      <button
        className={`${className} ${bgColor} ${textColor} ${rounded} ${padding} ${margin} ${border}  `}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
