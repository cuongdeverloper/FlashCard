// components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const accessToken = Cookies.get('accessToken');

    // Kiểm tra nếu token hợp lệ
    const isValidToken = !!accessToken && isAuthenticated;

    return (
        <Route
            {...rest}
            element={isValidToken ? Component : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
