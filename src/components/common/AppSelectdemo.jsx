import Select from "react-select";
import AsyncSelect from "react-select/async";

function AppSelect({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  error,
  isAsync = false,
  loadOptions,
  isClearable = true,
  isMulti = false,
  required = false,
  isDisabled = false,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: 40,
      borderRadius: 8,
      backgroundColor: isDisabled ? "#f1f5f9" : "#ffffff",
      borderColor: error
        ? "#ef4444"
        : state.isFocused
        ? "#3b82f6"
        : "#cbd5e1",
      boxShadow: state.isFocused
        ? "0 0 0 2px rgba(59,130,246,.15)"
        : "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),

    valueContainer: (provided) => ({
      ...provided,
      padding: "0 10px",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#94a3b8",
      fontSize: 14,
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#334155",
      fontSize: 14,
    }),

    menu: (provided) => ({
      ...provided,
      borderRadius: 8,
      overflow: "hidden",
      zIndex: 9999,
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#eff6ff"
        : "#fff",
      color: "#334155",
      cursor: "pointer",
    }),
  };

  const commonProps = {
    styles: customStyles,
    placeholder: placeholder || `Select ${label}`,
    isClearable,
    isMulti,
    isDisabled,
    options,

    value: isMulti
      ? options.filter((o) => value?.includes(o.value))
      : options.find((o) => o.value === value) || null,

    onChange: (selected) => {
      if (isMulti) {
        onChange(
          selected ? selected.map((x) => x.value) : []
        );
      } else {
        onChange(selected?.value || "");
      }
    },
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-slate-700">
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      {isAsync ? (
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          {...commonProps}
        />
      ) : (
        <Select {...commonProps} className="z-20" />
      )}

      <div className="min-h-[18px] mt-1">
        {error && (
          <p className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default AppSelect;