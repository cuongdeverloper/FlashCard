import React, { useEffect, useState } from 'react';
import NavHeader from "../Nav Header/NavHeader"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { decodeDataGoogle } from '../../service/ApiService';
import { doLogin, doLoginWGoogle, doLogout } from '../../redux/action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import ListQuestionPack from '../Question Pack/ListQuestionPack';
import { Outlet, useNavigate } from "react-router-dom"
import SideBar from '../SideBar/Sidebar';
import './HomePage.scss'
const HomePage = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate=useNavigate()
    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
            return true;
        }
    };
    useEffect(() => {
        // Check if the user cookie exists
        const userCookie = Cookies.get('user');
        const accessToken = Cookies.get('accessToken')
        const refreshToken = Cookies.get('refreshToken')
        if (userCookie) {
            const userData = JSON.parse(decodeURIComponent(userCookie));
            console.log(userData)
            // dispatch(doLogin({ ...userData, isAuthenticated: true })); // Dispatch action to set user data
            // navigate('/'); 
            dispatch(doLoginWGoogle(userData,accessToken,refreshToken))
            Cookies.remove('user');

        }
    }, [dispatch,navigate]);
    useEffect(() => {
        const initializeHomePage = async () => {
            // await decodeTokenDataGoogle();
            document.title = "Quizone | Welcome";
        };

        initializeHomePage();
    }, [isAuthenticated, dispatch]);
    // const decodeTokenDataGoogle = async () => {
    //     try {
    //         const token = Cookies.get('accessToken');
    //         if (token && !isTokenExpired(token)) {
    //             const response = await decodeDataGoogle(token);
    //             dispatch(doLogin(response));
    //         } else {
    //             dispatch(doLogout());
    //         }
    //     } catch (error) {
    //         console.error('Error decoding token:', error);
    //         dispatch(doLogout());
    //     }
    // };

    return (
        <div className="HomePage-container">
            <div className='Admin-SideBar'>
            <SideBar/>
                
                
            </div>
            <div className='Homepage-content' >
            <NavHeader />
            <Outlet/>
                
            </div>
            <div className='Homepage-footer'>

            </div>

        </div>
    )
}
export default HomePage