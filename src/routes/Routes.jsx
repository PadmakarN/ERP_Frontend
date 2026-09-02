import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import UserMasterList from "../pages/UserMaster/UserMasterList";
import LedgerMasterList from "../pages/LedgerMaster/LedgerMasterList";
import UserMaster from "../pages/UserMaster/UserMaster";
import BranchMasterList from "../pages/BranchMaster/BranchMasterList";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import LedgerMaster from "../pages/LedgerMaster/LedgerMaster";
import SessionExpired from "../pages/SessionExpired";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={<RegisterPage />} /> */}
      <Route path="/session-expired" element={<SessionExpired />} />
      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/users" element={<UserMasterList />} />
        <Route path="/LedgerMasterList" element={<LedgerMasterList />} />
        <Route path="/userMaster" element={<UserMaster />} />
        <Route path="/userMaster/:userid" element={<UserMaster />} />
        <Route path="/branchMasterList" element={<BranchMasterList />}/>
        <Route path="/LedgerMaster" element={<LedgerMaster />} />
        <Route path="/ledgermaster/:ledgerid" element={<LedgerMaster />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
