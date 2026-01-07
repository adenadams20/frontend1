import React from "react";

export default function Select({ children, className = "", ...props }) {
  return (
    <select
      {...props}
      className={`p-3 w-full  border-blue-[#022b53] border-2 hover:border-amber-300 rounded-2xl text-[#022b53] ${className}`}
    >
      {children}
    </select>
  );
}
