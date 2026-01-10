const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  options = [],
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const isPlaceholder = value === "" || value == null;
  
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-bgComponent
          ${
            error
              ? "border-error focus:ring-error focus:border-error"
              : "border-gray-300"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          ${isPlaceholder ? "text-neutral6" : "text-blacktxt"}
        `}
        {...props}
      >
        <option value="" className="text-neutral6">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value || option}
            value={option.value || option}
            className="text-black"
          >
            {option.label || option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
