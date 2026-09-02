import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import API_URL from "../Config/apiConfig";
import axios from "axios";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { name, profileImage } = useSelector((state) => state.auth);
  const imageUrl = profileImage
    ? `${API_URL}/uploads/Usermaster/${profileImage}`: "/assets/default-user.png";

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogoutClick = () => {
    // Open confirm modal instead of logging out directly
    setShowConfirmModal(true);
    setIsOpen(false); // Close dropdown
  };

  const handleLogoutConfirm = () => {
    axios.post(`${API_URL}/api/auth/logout`,
  {},
  { withCredentials: true }   // 🔥 MUST
);
    dispatch(logout());
    navigate("/");
    setShowConfirmModal(false);
  };

  const handleLogoutCancel = () => {
    setShowConfirmModal(false);
  };

  const goToProfile = () => {
    navigate("/profile-settings");
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex relative" ref={menuRef}>
        <div className="mr-3">
          <h5 className="flex items-center text-gray-900 mt-2 font-semibold cursor-pointer 
                dark:text-white">

            {name}
          </h5>
        </div>
        <button
          className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-400 focus:ring-white  "
          onClick={toggleMenu}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label="User menu"
        >
          <img
            
            src={imageUrl}
            alt="Profile"
            width="50"
            height="40"
            className="w-10 h-10 rounded-full profile-img"
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-12 w-48 bg-amber-100  shadow-lg z-50 profile-dropdown rounded-xl cursor-pointer transition-colors duration-500  ">
            <button className="bg-transparent border-none text-left w-full px-4 py-2 hover:bg-gray-200 hover:rounded-xl hover:text-black" onClick={goToProfile}>
              ⚙️ Profile Settings
            </button>
            <button className="bg-transparent border-none text-left w-full px-4 py-2 hover:bg-red-200 hover:rounded-xl" onClick={handleLogoutClick}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>

      {/* ✅ Logout Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="flex items-center justify-center min-h-screen w-full">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-lg items-center justify-center ml-12 text-green-600">Confirm Logout</h5>
             
              </div>
              <div className="mb-6 text-black text-semibold">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-blue-400 p-2 rounded-xl text-black hover:bg-blue-600 hover:text-white"
                  onClick={handleLogoutCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 p-2 rounded-xl text-black hover:bg-red-600 hover:text-white"
                  onClick={handleLogoutConfirm}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileMenu;
