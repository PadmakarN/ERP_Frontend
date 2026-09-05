import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import UserMasterList from "../pages/usermaster/UserMasterList";
import LedgerMasterList from "../pages/ledgermaster/LedgerMasterList";
import UserMaster from "../pages/usermaster/UserMaster";
import BranchMasterList from "../pages/branchmaster/BranchMasterList";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import LedgerMaster from "../pages/ledgermaster/LedgerMaster";
import SessionExpired from "../pages/SessionExpired";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
       <Route path="/register" element={<RegisterPage />} /> 
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
        <Route path="/ledgermasterlist" element={<LedgerMasterList />} />
        <Route path="/usermaster" element={<UserMaster />} />
        <Route path="/usermaster/:userid" element={<UserMaster />} />
        <Route path="/branchmasterlist" element={<BranchMasterList />}/>
        <Route path="/ledgermaster" element={<LedgerMaster />} />
        <Route path="/ledgermaster/:ledgerid" element={<LedgerMaster />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
