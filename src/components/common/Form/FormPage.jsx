const FormPage = ({ header, children, footer }) => {
  return (
    <div
      className="
        min-h-screen
        w-full

        bg-slate-100
        dark:bg-gray-950

        text-gray-800
        dark:text-gray-100

        transition-colors
        duration-300
      "
    >
      {/* Header */}
      {header && (
        <div
          className="
            sticky
            top-0
            z-20
            border-b
            border-slate-200
            dark:border-gray-800
            bg-white
            dark:bg-gray-900
            text-gray-800
            dark:text-gray-100
            shadow-sm
            transition-colors
            duration-300
          "
        >
          {header}
        </div>
      )}

      {/* Body */}
      <div
        className="
          mx-auto
          max-w-7xl
          p-3
          bg-white
          dark:bg-gray-900
          text-gray-800
          dark:text-gray-100
          transition-colors
          duration-300
        "
      >
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div
          className="
            border-t
            border-slate-200
            dark:border-gray-800
            bg-white
            dark:bg-gray-900
            text-gray-800
            dark:text-gray-100
            transition-colors
            duration-300
          "
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default FormPage;