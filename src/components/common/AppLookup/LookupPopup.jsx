const LookupPopup = ({
  isOpen,
  close,
  children,
}) => {

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}

      <div
        className="
          fixed
          inset-0
          z-40

          bg-black/30
          dark:bg-black/50
        "
        onClick={close}
      />

      {/* Popup */}

      <div
        className="
          fixed

          left-1/2
          top-1/2

          z-50

          w-[95vw]
          sm:w-[90vw]
          lg:w-[1000px]

          max-h-[90vh]

          overflow-auto

          -translate-x-1/2
          -translate-y-1/2

          rounded-lg

          bg-white
          dark:bg-slate-800

          shadow-xl
        "
      >
        {children}
      </div>
    </>
  );
};

export default LookupPopup;