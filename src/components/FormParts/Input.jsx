import React, { useId } from "react";

function Input(
  {
    type = "text",
    className = "",
    placeholder = "Type here",
    label = "Enter text : ",
    padding = "px-3 py-2",
    width = "w-full",
    rounded = "rounded-lg",
    text = "text-black",
    border = "border border-gray-200",

    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className="w-full text-left">
      {label && (
        <label className={`inline-block mb-1 pl-1 ${text}`} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        ref={ref}
        className={`${className} ${padding} ${width} ${border} ${rounded} ${text}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(Input);
