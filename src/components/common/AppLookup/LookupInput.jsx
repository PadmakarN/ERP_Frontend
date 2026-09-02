import { Search, X, ChevronDown } from "lucide-react";

import LookupPopup from "./LookupPopup";
import LookupHeader from "./LookupHeader";
import LookupTable from "./LookupTable";
import { useLookup } from "./useLookup";

const LookupInput = ({
  // =====================================================
  // COMMON PROPS
  // =====================================================
  label,
  value,
  onChange,
  required = false,
  placeholder = "Select...",
  readOnly = false,
  disabled = false,
  error,
  name,
  className,

  // =====================================================
  // AJAX LOOKUP
  // =====================================================
  ajax = false,
  table,
  columns = [],
  valueField,
  displayField,
  where = {},

  // =====================================================
  // STATIC LOOKUP
  // =====================================================
  options = [],
}) => {
  // =====================================================
  // AJAX LOOKUP HOOK
  // =====================================================

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
    ajax,
  });

  // =====================================================
  // DEBUG
  // =====================================================

  return (
    <div className={`flex flex-col w-full ${className || ""}`}>
      {/* =================================================
          LABEL
      ================================================= */}

      {label && (
        <label
          htmlFor={name}
          className="
            mb-1
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-200
          "
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500 dark:text-red-400">*</span>
          )}
        </label>
      )}

      {/* =================================================
          STATIC SELECT
          ajax = false
      ================================================= */}

      {!ajax ? (
        <div className="relative">
          <select
            id={name}
            name={name}
            value={String(value ?? "")}
            disabled={disabled || readOnly}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            className={`
              w-full
              h-10
              appearance-none
              rounded-lg
              border
              px-3
              pr-10
              text-sm
              bg-white
              dark:bg-slate-800
              text-slate-800
              dark:text-slate-100
              outline-none
              transition-all
              duration-200
              ${error
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
                    focus:border-blue-500
                    dark:focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-200
                    dark:focus:ring-blue-900/40
                  `
              }

              ${disabled || readOnly
                ? `
                    bg-slate-100
                    dark:bg-slate-700
                    text-slate-500
                    dark:text-slate-400
                    cursor-not-allowed
                  `
                : `
                    cursor-pointer
                  `
              }
            `}
          >
            {/* =================================================
                PLACEHOLDER
            ================================================= */}
            <option value="">{placeholder}</option>
            {/* =================================================
                STATIC OPTIONS
            ================================================= */}
            {options.map((option) => (
              <option key={String(option.value)} value={String(option.value)}>
                {option.label}
              </option>
            ))}

            
          </select>
         
          {/* =================================================
              DROPDOWN ARROW
          ================================================= */}

          <ChevronDown
            size={18}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-500
              dark:text-slate-400
            "
          />
        </div>
      ) : (
        /* =================================================
           AJAX LOOKUP INPUT
        ================================================= */

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
            ${error
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

            ${readOnly || disabled
              ? `
                  bg-slate-100
                  dark:bg-slate-700

                  text-slate-500
                  dark:text-slate-400

                  cursor-not-allowed
                `
              : `
                  cursor-pointer
                `
            }
          `}
        >
          {/* =================================================
              SELECTED VALUE
          ================================================= */}

          <input
            type="text"
            readOnly
            name={name}
            value={selectedLabel || ""}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1
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
              disabled:cursor-not-allowed"
          />

          {/* =================================================
              CLEAR BUTTON
          ================================================= */}

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

          {/* =================================================
              SEARCH ICON
          ================================================= */}

          <Search
            size={18}
            className="
              shrink-0
              text-slate-500
              dark:text-slate-400
            "
          />
        </div>
      )}

      {/* =================================================
          ERROR MESSAGE
      ================================================= */}

      {error && (
        <span
          className="
            mt-1
            text-xs

            text-red-500
            dark:text-red-400
          "
        >
          {error}
        </span>
      )}

      {/* =================================================
          AJAX POPUP
      ================================================= */}

      {ajax && (
        <LookupPopup isOpen={isOpen} close={close}>
          {/* =================================================
              POPUP HEADER
          ================================================= */}

          <LookupHeader search={search} setSearch={setSearch} close={close} />

          {/* =================================================
              POPUP TABLE
          ================================================= */}

          <LookupTable
            rows={rows}
            columns={columns}
            loading={loading}
            valueField={valueField}
            displayField={displayField}
            onSelect={selectRow}
          />
        </LookupPopup>
      )}
    </div>
  );
};

export default LookupInput;
