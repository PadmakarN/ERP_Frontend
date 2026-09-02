const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
  placeholder = "Select",
  className = "",
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="mb-1 text-sm font-medium text-slate-700">
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      {/* Select */}
      <select
        name={name}
        value={value ?? ""}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full
          h-10
          rounded-lg
          border
          px-3
          text-sm
          text-slate-700
          bg-white
          outline-none
          transition-all
          duration-200

          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }

          ${
            disabled
              ? "bg-slate-100 cursor-not-allowed text-slate-500"
              : ""
          }
        `}
      >
        <option value="">{placeholder}</option>

        {options.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>

      {/* Error */}
      <div className="min-h-[18px] mt-1">
        {error && (
          <span className="text-xs text-red-500">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectField;