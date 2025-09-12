import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// A component to handle routes that should only be accessible to unauthenticated users.
// For example, the login and register pages.
const PublicRoute = () => {
  // Get the authentication status from the Redux store
  const { isAuthenticated } = useSelector((state) => state.user);

  // If the user is authenticated, redirect them to the homepage.
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If the user is not authenticated, render the child routes (e.g., the Login page).
  return <Outlet />;
};

export default PublicRoute;