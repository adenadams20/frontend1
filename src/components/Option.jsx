import React from "react";

export default function Option({ children, ...props }) {
  return <option {...props}>{children}</option>;
}
