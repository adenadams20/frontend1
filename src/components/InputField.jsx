export default function InputField({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border-blue-[] border-[#022b53] rounded-lg outline-none ${className}`}
    />
  );
}
