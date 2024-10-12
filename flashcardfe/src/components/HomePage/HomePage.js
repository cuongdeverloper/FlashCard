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

    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error('Lỗi khi giải mã token:', error);
            return true;
        }
    };

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        const userCookie = Cookies.get('user');

        // Log tất cả cookies để gỡ lỗi
        console.log("Tất cả Cookies:", Cookies.get());

        // Nếu accessToken bị thiếu hoặc đã hết hạn, đăng xuất
        if (!accessToken || isTokenExpired(accessToken)) {
            dispatch(doLogout());
        } else if (userCookie) {
            const userData = JSON.parse(decodeURIComponent(userCookie));
            console.log("Dữ liệu người dùng từ Cookies:", userData);
            dispatch(doLoginWGoogle(userData, accessToken, refreshToken));
            Cookies.remove('user'); // Xóa cookie người dùng sau khi sử dụng
        }
    }, [dispatch, navigate, isAuthenticated]); // Thêm isAuthenticated vào dependencies

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
