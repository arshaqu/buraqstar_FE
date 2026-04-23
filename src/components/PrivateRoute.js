import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { routes } from '../utils';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, user } = useContext(AuthContext);

  // Check if user is logged in
  if (!isLoggedIn) {
    return <Navigate to={routes.login} replace />;
  }

  // Check if user is verified
  const isVerified = user && user.verified === true;

  if (!isVerified) {
    // Redirect to verification page if not verified
    return <Navigate to={routes.verify} replace />;
  }

  // User is logged in and verified, render the protected content
  return children;
};

export default PrivateRoute;
