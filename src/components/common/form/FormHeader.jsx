import { X } from "lucide-react";
import AppButton from "../AppButton";

const FormHeader = ({ title, subtitle, actions, onClose }) => {
  return (
    <div
      className="
        flex flex-col
        md:flex-row
        md:items-center
        md:justify-between

        gap-3
        px-3 py-3
        md:px-4 md:py-2

        bg-white
        dark:bg-gray-900

        text-gray-800
        dark:text-gray-100

        transition-colors
        duration-300
      "
    >
      {/* Left - Title */}
      <div className="min-w-0">
        <h1
          className="
            text-xl
            md:text-2xl
            font-bold
            text-gray-800
            dark:text-gray-100
            transition-colors
            duration-300
          "
        >
          {title}
        </h1>

        {/* Mobile वर subtitle hide */}
        {subtitle && (
          <p
            className="
              hidden
              md:block
              mt-1
              text-sm
              text-gray-500
              dark:text-gray-400
              transition-colors
              duration-300
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Right - Actions */}
      <div
        className="
          flex
          items-center
          gap-2

          w-full
          md:w-auto
        "
      >
        {/* Existing actions */}
        {actions}

        {/* Close button */}
        <AppButton
          variant="secondary"
          onClick={onClose}
          text={
            <div className="flex items-center gap-1.5">
              <X size={15} />
              <span>Close</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default FormHeader;