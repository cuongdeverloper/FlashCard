import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(doLogout());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Remove tokens from cookies (if they were set there)
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
            navigate('/')
    };
useEffect(()=>{
    handleLogout()
},[])
    return (
       <>
       </>
    );
};

export default Logout;
