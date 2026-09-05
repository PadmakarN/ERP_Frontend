import { ChevronDown } from "lucide-react";

const FormSection = ({
  title,
  icon,
  children,
  collapsible = false,
  className = "",
}) => {
  return (
    <div
      className={`
        mt-2
        rounded-2xl
        border
        border-slate-200
        dark:border-gray-500
        bg-white
        dark:bg-gray-900
        shadow-sm
        transition-colors
        duration-300
        ${className}
      `}
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          rounded-1xl
          border-1px
          px-3
          py-2
          transition-colors
          duration-300
        "
      >
        <div className="flex items-center gap-2">
          {icon && (
            <span
              className="
                text-[#6ab5e7]
                transition-colors
                dark:text-[#6ab5e7]
                duration-300"
            >
              {icon}
            </span>
          )}

          <h2
            className="
              text-lg
              font-semibold
              text-slate-800
              dark:text-[#6ab5e7]
              transition-colors
              duration-300
            "
          >
            {title}
          </h2>
        </div>

        {collapsible && (
          <button
            type="button"
            className="
              rounded-md
              p-1
              text-slate-500
              dark:text-gray-400
              hover:bg-slate-100
              dark:hover:bg-gray-700
              transition-colors
              duration-300
            "
          >
            <ChevronDown size={18} />
          </button>
        )}
      </div>

      {/* Body */}
      <div
        className="
          px-4
          py-1
          text-slate-800
        "
      >
        {children}
      </div>
    </div>
  );
};

export default FormSection;