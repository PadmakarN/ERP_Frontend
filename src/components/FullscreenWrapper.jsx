// components/FullscreenWrapper.jsx
const FullscreenWrapper = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-white overflow-auto">
      {children}
    </div>
  );
};

export default FullscreenWrapper;
