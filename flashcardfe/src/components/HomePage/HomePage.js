import React, { useEffect, useState } from 'react';
import NavHeader from "../Nav Header/NavHeader";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { doLoginWGoogle, doLogout } from '../../redux/action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from '../SideBar/Sidebar';
import './HomePage.scss';
import { getClassById } from '../../service/ApiService';

const HomePage = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const [classData, setClassData] = useState([]);
    const navigate = useNavigate();

   



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

    return (
        <>
            <div className="HomePage-container">
                <div className='Admin-SideBar'>
                    <SideBar classData={classData} />
                </div>
                <div className='Homepage-content' style={{color:'#fff'}}>
                    <NavHeader />
                    <Outlet />
                </div>
            </div>
            <div className='Homepage-footer'></div>
        </>
    );
};

export default HomePage;
