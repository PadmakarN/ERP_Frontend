import { createContext, useContext, useState } from "react";

const ModalWinContext = createContext();

export const ModalWinProvider = ({ children }) => {
  const [stack, setStack] = useState([]);

  // ✅ Open Modal
  const openModalWin = (component) => {
    setStack((prev) => [...prev, component]);
  };

  // ✅ Close Top Modal
  const closeModalWin = () => {
    setStack((prev) => prev.slice(0, -1));
  };

  // ✅ Close All (optional)
  const closeAllModalWin = () => {
    setStack([]);
  };

  return (
    <ModalWinContext.Provider
      value={{ openModalWin, closeModalWin, closeAllModalWin }}
    >
      {children}

      {/* 🔥 Modal Stack Render */}
      {stack.map((Comp, index) => (
        <div
          key={index}
          style={{
            position: "absolute", 
            inset: 0,
            background: "rgba(0,0,0,0.2)",
            zIndex: 10 + index,
            display: "flex",
            alignItems: "center",
            overflowY: "auto",
            scrollBehavior: "smooth",
            width: "110%",
            marginLeft: "-4.5%",
            marginTop: "-2.5%",
            marginRight: "-4.5%",
            justifyContent: "center",
          }}
        >
          <div className="modalwin-box">
            <div
              className="modalwin-body"
              style={{
                flex: 1,
                overflowY: "auto", // ✅ scroll inside
              }}
            >
              <Comp onClose={closeModalWin}/>
            </div>
          </div>
        </div>
      ))}
    </ModalWinContext.Provider>
  );
};

export const useModalWin = () => useContext(ModalWinContext);
