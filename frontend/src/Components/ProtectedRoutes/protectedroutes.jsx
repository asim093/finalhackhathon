import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ requiredRole , children }) => {
  const { isLogin, role } = useSelector((state) => state.user);

  if (!isLogin) {
    return <Navigate to="/auth/login" />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
