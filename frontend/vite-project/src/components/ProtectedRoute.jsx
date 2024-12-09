import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in by verifying the access token
  const isLoggedIn = !!localStorage.getItem('access_token');

  if (!isLoggedIn) {
    // Redirect to authentication page if not logged in
    return <Navigate to="/auth" replace />;
  }

  // Render the component if logged in
  return children;
};

export default ProtectedRoute;