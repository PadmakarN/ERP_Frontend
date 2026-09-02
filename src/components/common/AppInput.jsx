const AppInput = ({
  label,
  name,
  value,
  onChange,
  error,
  rows,
  type = "text",
  placeholder = "",
  readOnly = false,
  disabled = false,
  required = false,
  className = "",
  autoComplete = "off",
}) => {
  // Hidden Field
  if (type === "hidden") {
    return <input type="hidden" name={name} value={value || ""} />;
  }

  const inputClass = `
    w-full
    rounded-lg
    border
    px-3
    py-2
    text-sm
    outline-none
    bg-white
    dark:bg-gray-800
    text-slate-700
    dark:text-gray-100
    placeholder:text-slate-400
    dark:placeholder:text-gray-500
    transition-all
    duration-300

    ${
      error
        ? `
          border-red-500
          dark:border-red-400
          focus:border-red-500
          focus:ring-2
          focus:ring-red-200
          dark:focus:ring-red-900/40
        `
        : `
          border-slate-300
          dark:border-gray-700
          focus:border-blue-500
          dark:focus:border-blue-400
          focus:ring-2
          focus:ring-blue-200
          dark:focus:ring-blue-900/40
        `
    }

    ${
      readOnly || disabled
        ? `
          bg-slate-100
          dark:bg-gray-800
          cursor-not-allowed
          text-slate-500
          dark:text-white
        `
        : ""
    }
  `;

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="
            mb-1
            text-sm
            font-medium
            text-slate-700
            dark:text-gray-300
            transition-colors
            duration-300
          "
        >
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {/* Input / Textarea */}
      {rows ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={`h-10 ${inputClass}`}
        />
      )}

      {/* Error */}
      {error && (
        <span
          className="
            mt-1
            text-xs
            text-red-500
            dark:text-red-400
            transition-colors
            duration-300
          "
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default AppInput;
