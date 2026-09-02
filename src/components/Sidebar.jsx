import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import routes from "../Config/routesConfig";
import "../Siderbar.css";

const SideBar = ({ isOpen, setIsOpen, onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // ✅ FIX: routes mutate nahi honge
  const filterRoutes = (routes) => {
    return routes
      .map((route) => {
        let subRoutes = route.subRoutes;

        if (subRoutes) {
          subRoutes = subRoutes.filter((sub) =>
            sub.name.toLowerCase().includes(searchQuery),
          );
        }

        const routeMatch = route.name.toLowerCase().includes(searchQuery);

        if (routeMatch || (subRoutes && subRoutes.length > 0)) {
          return { ...route, subRoutes };
        }
        return null;
      })
      .filter(Boolean);
  };

  const filteredMenuItems = filterRoutes(routes);

  const inputAnimation = {
    hidden: { width: 0, padding: 0 },
    show: { width: "140px", padding: "5px 15px" },
  };

  const showAnimation = {
    hidden: { width: 0, opacity: 0 },
    show: { opacity: 1, width: "auto" },
  };

  return (
    <div className="main-container">
      <motion.div
        animate={{ width: isOpen ? "250px" : "45px" }}
        transition={{ duration: 0.5 }}
        className="sidebar"
      >
        {/* TOP */}
        <div className="top_section">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="logo"
              >
                ERP
              </motion.h1>
            )}
          </AnimatePresence>

          <div className="bars" onClick={() => setIsOpen(!isOpen)}>
            <FaBars />
          </div>
        </div>

        {/* SEARCH */}
        <div className="search">
          <div className="search_icon">
            <BiSearch />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.input
                variants={inputAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search Here..."
              />
            )}
          </AnimatePresence>
        </div>

        {/* ROUTES */}
        <section className="routes">
          {filteredMenuItems.map((route) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  key={route.key}
                  route={route}
                  isOpen={isOpen}
                  onMenuClick={onMenuClick}
                  showAnimation={showAnimation}
                  setIsOpen={setIsOpen}
                />
              );
            }

            return (
              <div className="link" onClick={() => onMenuClick(route)}>
                {/* ✅ FIX: icon JSX direct render */}
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
            );
          })}
        </section>
      </motion.div>
    </div>
  );
};

export default SideBar;
