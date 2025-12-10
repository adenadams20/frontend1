// src/components/PasswordInput.jsx
import React from "react";

const PasswordInput = ({
  label,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
  ...rest
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 text-sm"
          {...rest}
        />

        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? (
            // Icône "œil barré"
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3l18 18" />
              <path d="M10.58 10.62A2 2 0 0 0 12 14a2 2 0 0 0 1.38-.56" />
              <path d="M9.88 5.51A9.77 9.77 0 0 1 12 5c5 0 8.5 3.5 9.5 7-0.27.97-.76 1.9-1.43 2.76" />
              <path d="M6.12 6.12A9.77 9.77 0 0 0 2.5 12c.5 1.8 1.7 3.5 3.36 4.86A9.81 9.81 0 0 0 12 19c1 0 1.96-.14 2.88-.4" />
            </svg>
          ) : (
            // Icône "œil"
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12C2.5 7.5 6.5 5 12 5s9.5 2.5 11 7c-1.5 4.5-5.5 7-11 7S2.5 16.5 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
