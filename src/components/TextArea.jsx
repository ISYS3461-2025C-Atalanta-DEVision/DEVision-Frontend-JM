const TextArea = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  rows = 5,
  onBlur,
  error,
  placeholder,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-neutral7 mb-1"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
          ${
            error
              ? "border-error focus:ring-error focus:border-error"
              : "border-neutral3"
          }
          ${disabled ? "bg-neutral2 cursor-not-allowed" : "bg-bgComponent"}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextArea;
