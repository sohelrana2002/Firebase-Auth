import React from "react";
import { useUserAuth } from "../context/UserAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let { user } = useUserAuth();

  if (!user) {
    return <Navigate to='/log-in' />
  }
  return children;
};

export default ProtectedRoute;
