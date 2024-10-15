import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, requiredRole }) => {
    const userRole = useSelector(state => state.user.account.role);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const accessToken = Cookies.get('accessToken');

    const isValidToken = !!accessToken && isAuthenticated;

    // Check if user has one of the required roles
    const hasRequiredRole = Array.isArray(requiredRole)
        ? requiredRole.includes(userRole)
        : userRole === requiredRole;

    // If the token is valid and the user has the required role (or no role is specified)
    if (isValidToken && (!requiredRole || hasRequiredRole)) {
        return Component;
    } else if (!isValidToken) {
        return <Navigate to="/login" />;
    } else {
        return <Navigate to="/forbidden" />;
    }
};

export default PrivateRoute;
