import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

// menu open/close animation
const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.4, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.4, when: "beforeChildren" },
  },
};

const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: { duration: (i + 1) * 0.1 },
  }),
  show: (i) => ({
    x: 0,
    transition: { duration: (i + 1) * 0.1 },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen, onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true); // sidebar khula rahe
  };

  useEffect(() => {
    if (!isOpen) setIsMenuOpen(false); // sidebar close → menu close
  }, [isOpen]);

  return (
    <>
      {/* Parent Menu */}
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
          <div className="icon">{route.icon && <route.icon />}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="link_text"
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div animate={isMenuOpen ? { rotate: -90 } : { rotate: 0 }}>
            <FaAngleDown />
          </motion.div>
        )}
      </div>

      {/* Sub-menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={subRoute.key} custom={i}>
                <div
                  className="link sublink cursor-pointer"
                  onClick={() => onMenuClick(subRoute)}
                >
                  <div className="icon">{subRoute.icon && <subRoute.icon />}</div>
                  <motion.div className="link_text">{subRoute.name}</motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
