import React, { useEffect, useState } from 'react';
import NavHeader from "../Nav Header/NavHeader";
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import SideBar from '../SideBar/Sidebar';
import './HomePage.scss';
import { getClassById } from '../../service/ApiService';
import { doLogout } from '../../redux/action/userAction';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const HomePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const [classData, setClassData] = useState([]);
    const dispatch = useDispatch()
   



    useEffect(() => {
        document.title = "Quizone | Chào mừng";
    }, [isAuthenticated]);

    const getClasses = async () => {
        let response = await getClassById();
        if (response && response.errorCode === 0) {
            setClassData(response.data);
        }
    };
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
    const decodeTokenData= async () => {
        try {
            const token = Cookies.get('accessToken');
            if (!token || isTokenExpired(token)) {
                dispatch(doLogout());
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            dispatch(doLogout());
        }
    };
    useEffect(()=>{
        decodeTokenData();
    },[dispatch])
    useEffect(() => {
        if (isAuthenticated) {
            getClasses(); 
        }
    }, [isAuthenticated,dispatch]); 

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme','dark');
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme','light');
    }


    return (
        <>
            <div className="HomePage-container">
                <div className='Admin-SideBar'>
                    <SideBar classData={classData} />
                </div>
                <div className='Homepage-content'>
                    <NavHeader />
                    <Outlet />
                </div>
            </div>
            <div className='Homepage-footer'></div>
        </>
    );
};

export default HomePage;
