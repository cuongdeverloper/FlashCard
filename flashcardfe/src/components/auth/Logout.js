import React from 'react';
import { useDispatch } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';
import Cookies from 'js-cookie'; // Import js-cookie for cookie handling

const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(doLogout());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Remove tokens from cookies (if they were set there)
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

    };

    return (
        <div className="Logout-container">
            <button className="btn btn-warning" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Logout;
