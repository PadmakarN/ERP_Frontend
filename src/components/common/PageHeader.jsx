// components/common/PageHeader.jsx
const PageHeader = ({ title, leftContent, rightContent, background }) => {
  return (
    <div
      className={`relative flex items-center justify-between p-2 border-b ${background || "bg-white"}`}
    >
      {/* Left Side */}
      <div>{leftContent}</div>

      {/* Title */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold text-white">{title}</h1>

      {/* Right Side */}
      <div className="bg-orange-600 text-white h-6 w-6 rounded-lg flex items-center justify-center">{rightContent}</div>
    </div>
  );
};

export default PageHeader;
