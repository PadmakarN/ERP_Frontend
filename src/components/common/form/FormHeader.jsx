import { X } from "lucide-react";
import AppButton from "../AppButton";

const FormHeader = ({ title, subtitle, actions, onClose }) => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        px-4
        py-2

        bg-white
        dark:bg-gray-900

        text-gray-800
        dark:text-gray-100

        transition-colors
        duration-300
      "
    >
      {/* Left */}
      <div>
        <h1
          className="
            text-2xl
            font-bold
            text-gray-800
            dark:text-gray-100
            transition-colors
            duration-300
          "
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="
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

      {/* Right */}
      <div className="flex items-center gap-2">
        {actions}

        <AppButton
          variant="secondary"
          onClick={onClose}
          text={
            <div className="flex items-center gap-1">
              <X size={16} />
              <span>Close</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default FormHeader;