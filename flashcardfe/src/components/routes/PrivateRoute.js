import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, requiredRole }) => {
    const userRole = useSelector(state => state.user.account.role);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const accessToken = Cookies.get('accessToken');

    const isValidToken = !!accessToken && isAuthenticated;

    // Check if the token is valid and user has the required role (if specified)
    if (isValidToken && (!requiredRole || userRole === requiredRole)) {
        return Component; 
    } else if (!isValidToken) {
        return <Navigate to="/login" />;
    } else {
        return <Navigate to="/forbidden" />; 
    }
};

export default PrivateRoute;
