import React, { useId } from "react";

function Select(
  {
    options,
    label = "",
    className = "",
    padding = "px-3 py-2",
    width = "w-full",
    text = "text-black",
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
      <select
        {...props}
        id={id}
        ref={ref}
        className={`${className} ${padding} ${width} ${text} `}
      >
        {options?.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
