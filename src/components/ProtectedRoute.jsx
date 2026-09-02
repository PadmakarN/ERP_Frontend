import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Toast from "./Toast";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const [showToast, setShowToast] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      setShowToast(true);

      const timer = setTimeout(() => {
        setRedirect(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [auth.isAuthenticated]);

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  if (!auth.isAuthenticated) {
    return (
      <Toast
        show={showToast}
        message="User Logout Successfully Or Not Login In"
        type="error"
        onClose={() => setShowToast(false)}
      />
    );
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
