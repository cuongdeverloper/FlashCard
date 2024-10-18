import React, { useEffect, useState } from 'react';
import NavHeader from "../Nav Header/NavHeader";
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import SideBar from '../SideBar/Sidebar';
import './HomePage.scss';
import { getClassById } from '../../service/ApiService';

const HomePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const [classData, setClassData] = useState([]);

   



    useEffect(() => {
        document.title = "Quizone | Chào mừng";
    }, [isAuthenticated]);

    const getClasses = async () => {
        let response = await getClassById();
        if (response && response.errorCode === 0) {
            setClassData(response.data);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            getClasses(); 
        }
    }, [isAuthenticated]); 

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
