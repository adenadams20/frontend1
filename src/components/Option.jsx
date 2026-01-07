import React from "react";

export default function Option({ children, ...props }) {
  return <option {...props} className={`p-3 w-full hover:bg-[#022b53]  ${className}`}>
    {children}</option>;
}
