const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-neutral8 mb-1"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        rows={type === "textarea" ? 5 : undefined}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors
          ${
            error
              ? "border-error focus:ring-error focus:border-error"
              : "border-gray-300"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-bgComponent"}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
