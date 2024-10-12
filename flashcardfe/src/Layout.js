import React, { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import io from "socket.io-client";

import Login from "./components/auth/Login";
import HomePage from "./components/HomePage/HomePage";
import Logout from "./components/auth/Logout";
import ListQuestionPack from "./components/Question Pack/ListQuestionPack";
import DetailQuesPack from "./components/Question Pack/Detail QuesPack/DetailQuesPack";
import ManageFcQ from "./components/ManageFlashCard-Quiz/ManageFcQ";
import ManageAddQuiz from "./components/ManageFlashCard-Quiz/AddQuiz/MangeAddQuiz";
import ResultSearchItem from "./components/Page search item/ResultSearchItem";
import PrivateRoute from "./components/routes/PrivateRoute";
import Forbidden from "./components/Forbident";
import Register from "./components/auth/Register";
import Classes from "./components/Classes/Classes";
import DocumentsClass from "./components/Classes/Documents/DocumentsClass";
import StudentsClass from "./components/Classes/Students/StudentsClass";
import Actions from "./components/Classes/Actions/Actions";
import JoinClass from "./components/Joinclass";

import MessagePage from "./components/message/MessagePage";
import UserMessage from "./components/message/UserMessage";
import ViewProfile from "./components/Userprofile.js/profile";
import Quiz from "./components/Quiz/Quiz";
import MyManage from "./components/My manage/MyManage";

import MyClass from "./components/Myclass-homepage/myclass";

import EnterOTPRegister from "./components/auth/EnterOTPRegister";
import RequestPasswordReset from "./components/auth/reset password/RequestPasswordReset";
import ResetPassword from "./components/auth/reset password/ResetPassword";
import AuthCallback from "./components/AuthCallback";



const Layout = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const token = Cookies.get('accessToken');
    //     const socketConnection = io('http://localhost:6868', {
    //         auth: {
    //             token: token
    //         }
    //     });

    //     socketConnection.on('onlineUser', (data) => {
    //         // console.log('Online users:', data);
    //         dispatch(setOnlineUser(data));
    //     });
    //     console.log(socketConnection)
    //     // dispatch(setSocketConnection(socketConnection));    


    //     return () => {
    //         socketConnection.disconnect();
    //     }
    // }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <BrowserRouter>
                <Routes>
                    
                    <Route path="/" element={<HomePage />}>
                       
                        <Route index element={<ListQuestionPack />} />
                        <Route path="my-class" element={<MyClass/>} /> 
                        <Route path="detailquespack/:packId" element={<DetailQuesPack />} />
                        <Route path="/crud-q" element={<PrivateRoute element={<ManageFcQ />} requiredRole="teacher" />}>
                            <Route path="add-quiz" element={<PrivateRoute element={<ManageAddQuiz />} requiredRole="teacher" />} />
                        </Route>
                        <Route path="/forbidden" element={<Forbidden />} />
                        <Route path="search" element={<ResultSearchItem />} />
                        <Route path="classes/:classId" element={<Classes />}>
                            <Route path="documents" element={<DocumentsClass />} />
                            <Route path="students" element={<StudentsClass />} />
                            <Route path="actions" element={<Actions />} />
                        </Route>
                        <Route path="/messagePage" element={<MessagePage />} >
                            <Route path=":userId" element={<UserMessage />} />
                        </Route>
                        <Route path="/MyManage/:userId" element={<MyManage />} ></Route>

                    </Route>
                    <Route path="auth/callback" element={<AuthCallback />} />
                    <Route path="join-class/:token" element={<JoinClass />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/otp-verify" element={<EnterOTPRegister />} />
                    <Route path="/forgot-password" element={<RequestPasswordReset />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/quiz/:quizId" element={<Quiz />} >
                    
                    </Route>

                    <Route path="/userprofile" element={<ViewProfile />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default Layout;
