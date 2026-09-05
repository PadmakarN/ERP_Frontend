const FormGrid = ({ children }) => {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-12
        gap-3
        bg-white
        dark:bg-gray-900
        text-gray-800
        dark:text-gray-100
        transition-colors
        duration-300
        mb-4
      "
    >
      {children}
    </div>
  );
};

export default FormGrid;