// components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const location = useLocation();

    // Kiểm tra nếu có accessToken trong cookies
    const accessToken = Cookies.get('accessToken');
    const isValidToken = !!accessToken && isAuthenticated;

    if (!isValidToken) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Render the component if authenticated
    return <Component {...rest} />;
};

export default PrivateRoute;
