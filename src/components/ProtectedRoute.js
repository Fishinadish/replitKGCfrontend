// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   // Check if token exists in local storage
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   // If token is present, allow access to the protected route
//   if (token && role === requiredRole) {
//     return children;
//   }

//   // If token is not present, redirect to the login page
//   return <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // If user is authenticated and has the required role, allow access to the protected route
  if (user && user.role.toLowerCase() === requiredRole.toLowerCase()) {
    return children;
  }

  // If user is not authenticated or doesn't have the required role, redirect to the login page
  return <Navigate to="/login" />;
};

export default ProtectedRoute;