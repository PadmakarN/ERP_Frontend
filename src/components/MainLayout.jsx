import { useState } from "react";
import Dashboard from "../pages/Dashbord";
import UserList from "../pages/UserList";

const MainLayout = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex h-screen">
      
      {/* SIDEBAR (temporary yahi) */}
      <div className="w-52 bg-gray-200 p-4">
        <button
          className="block w-full mb-2"
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className="block w-full"
          onClick={() => setActivePage("users")}
        >
          User List
        </button>
      </div>

      {/* CENTER AREA */}
      <div className="flex-1 p-6">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "users" && <UserList />}
      </div>

    </div>
  );
};

export default MainLayout;
