import React from "react";

export default function Select({ children, className = "", ...props }) {
  return (
    <select
      {...props}
      className={`p-3 w-full  border-blue-[#022b53] border-2 hover:border-blue-500 rounded-2xl ${className}`}
    >
      {children}
    </select>
  );
}
