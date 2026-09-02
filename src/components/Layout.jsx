import { useEffect, useState } from "react";
import Dashboard from "../pages/DashboardPage";
import SideBar from "./Sidebar";
import TopBar from "./TopBar";
import TabBar from "./TabBar";
import "../styles/layout.css";
import { ModalWinProvider } from "../components/common/ModalWin";

const Layout = () => {
  const [ismobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [tabs, setTabs] = useState([
    { key: "dashboard", name: "Dashboard", component: Dashboard },
  ]);

  const [activeKey, setActiveKey] = useState("dashboard");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddTab = (tab) => {
    setTabs((prev) => {
      if (prev.find((t) => t.key === tab.key)) return prev;
      return [...prev, tab];
    });

    setActiveKey(tab.key);
  };

  const handleCloseTab = (key) => {
    setTabs((prev) => prev.filter((t) => t.key !== key));

    if (key === activeKey) {
      const newTabs = tabs.filter((t) => t.key !== key);
      setActiveKey(newTabs[newTabs.length - 1]?.key || "dashboard");
    }
  };

  return (
    <>
      <TopBar />

      <div className="main-container">
        <SideBar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          onMenuClick={handleAddTab}
        />

        <div
          className={`outlet ${
            isSidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"
          }`}
          style={{ flex: 1 }}
        >
          <TabBar
            tabs={tabs}
            activeKey={activeKey}
            onTabClick={setActiveKey}
            onCloseTab={handleCloseTab}
          />

          {/* 🔥 IMPORTANT AREA */}
          <div className="content-area">
            {tabs.map((tab) => {
              const Component = tab.component;

              return (
                <div
                  key={tab.key}
                  style={{
                    display: tab.key === activeKey ? "block" : "none",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <ModalWinProvider>
                    <Component />
                  </ModalWinProvider>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
