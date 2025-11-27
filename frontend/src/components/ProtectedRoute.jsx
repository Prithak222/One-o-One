import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    // No token, redirect to login page
    return <Navigate to="/admin/login" replace />;
  }

  // Token exists, render the protected component
  return children;
};

export default ProtectedRoute;
