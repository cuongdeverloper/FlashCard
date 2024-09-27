import React, { useEffect, useState } from 'react';
import NavHeader from "../Nav Header/NavHeader"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { decodeDataGoogle, getClassById } from '../../service/ApiService';
import { doLogin, doLoginWGoogle, doLogout } from '../../redux/action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import ListQuestionPack from '../Question Pack/ListQuestionPack';
import { Outlet, useNavigate } from "react-router-dom"
import SideBar from '../SideBar/Sidebar';
import './HomePage.scss'
const HomePage = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const [classData,setClassData] = useState([])
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
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');

        // If accessToken is missing or expired, log out
        if (!accessToken || isTokenExpired(accessToken)) {
            dispatch(doLogout());
        } else {
            const userCookie = Cookies.get('user');
            if (userCookie) {
                const userData = JSON.parse(decodeURIComponent(userCookie));
                dispatch(doLoginWGoogle(userData, accessToken, refreshToken));
                Cookies.remove('user');
            }
        }
    }, [dispatch, navigate]);
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
    const getClasses = async()=>{
        let response = await getClassById()
        if(response && response.errorCode ===0) {
            setClassData(response.data)
        }
      }
      useEffect(() => {
        if (isAuthenticated) {
            getClasses(); 
        }
    }, [isAuthenticated]); 
    return (
        <div className="HomePage-container">
            <div className='Admin-SideBar'>
            <SideBar
                classData={classData}
            />
                
                
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