export function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 ${className}`}
    >
      {children}
    </button>
  );
}
