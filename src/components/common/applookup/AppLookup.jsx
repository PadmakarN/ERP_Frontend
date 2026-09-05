import { Search, X } from "lucide-react";
import LookupPopup from "./LookupPopup";
import LookkupInput from "./LookupInput"
import LookupHeader from "./LookupHeader";
import LookupTable from "./LookupTable";
import { useLookup } from "./useLookup";

const AppLookup = ({
  label,
  value,
  onChange,
  required = false,
  placeholder = "Select...",
  table,
  columns = [],
  readOnly = false,
  disabled = false,
  valueField,
  displayField,
  where = {},
  error,
  name,
}) => {
  const {
    isOpen,
    open,
    close,
    loading,
    rows,
    search,
    setSearch,
    selectRow,
    clearValue,
    selectedLabel,
  } = useLookup({
    value,
    onChange,
    table,
    columns,
    valueField,
    displayField,
    where,
  });
  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      {label && (
        <label
          className="
            mb-1
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-200
            transition-colors
            duration-300
          "
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500 dark:text-red-400">*</span>
          )}
        </label>
      )}

      {/* Lookup Input */}
      <div
        onClick={() => {
          if (!disabled && !readOnly) {
            open();
          }
        }}
        className={`
          w-full
          h-10
          rounded-lg
          border
          px-3
          flex
          items-center
          gap-2
          transition-all
          duration-300
          bg-white
          dark:bg-slate-800
          text-slate-800
          dark:text-slate-100
          ${
            error
              ? `
                border-red-500
                dark:border-red-400
                ring-2
                ring-red-200
                dark:ring-red-900/40
              `
              : `
                border-slate-300
                dark:border-slate-600
                hover:border-slate-400
                dark:hover:border-slate-500
                focus-within:border-blue-500
                dark:focus-within:border-blue-400
                focus-within:ring-2
                focus-within:ring-blue-200
                dark:focus-within:ring-blue-900/40
              `
          }

          ${
            readOnly || disabled
              ? `
                bg-slate-100
                dark:bg-slate-700
                text-slate-500
                dark:text-slate-400
                border-slate-300
                dark:border-slate-600
                cursor-not-allowed
              `
              : `
                cursor-pointer
              `
          }
        `}
      >
        {/* Selected Value */}
        <LookInput
         
          readOnly
          name={name}
          value={selectedLabel || ""}
          placeholder={placeholder}
          className="
            flex-1
            min-w-0
            w-full
            bg-transparent
            text-sm
            text-slate-800
            dark:text-slate-100
            placeholder:text-slate-400
            dark:placeholder:text-slate-500
            outline-none
            border-none
            cursor-pointer
            transition-colors
            duration-300
          "
        />

        {/* Clear Button */}
        {value && !readOnly && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              clearValue();
            }}
            className="
              shrink-0
              text-slate-400
              dark:text-slate-500
              hover:text-red-500
              dark:hover:text-red-400
              transition-colors
              duration-200
              focus:outline-none
            "
          >
            <X size={16} />
          </button>
        )}

        {/* Search Icon */}
        <Search
          size={18}
          className="
            shrink-0
            text-slate-500
            dark:text-slate-400
            group-hover:text-blue-500
            dark:group-hover:text-blue-400
            transition-colors
            duration-300
          "
        />
      </div>

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

      {/* Popup */}
      <LookupPopup isOpen={isOpen} close={close}>
        <LookupHeader search={search} setSearch={setSearch} close={close} />

        <LookupTable
          rows={rows}
          columns={columns}
          loading={loading}
          valueField={valueField}
          displayField={displayField}
          onSelect={selectRow}
        />
      </LookupPopup>
    </div>
  );
};

export default AppLookup;
