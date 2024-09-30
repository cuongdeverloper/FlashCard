import React, { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import  io  from "socket.io-client";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUser } from "./redux/action/userAction";

const Layout = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const token = Cookies.get('accessToken');
        const socketConnection = io('http://localhost:6868/',{
            auth:{
                token:token
            }
        })

        socketConnection.on('onlineUser',(data)=>{
            console.log('ou',data)
            dispatch(setOnlineUser(data));        
        })
        return()=>{
            socketConnection.disconnect()
        }
    },[dispatch])
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
                    {/* Define the layout route with nested routes */}
                    <Route path="/" element={<HomePage />}>
                        <Route index element={<ListQuestionPack />} />
                        <Route path="detailquespack/:packId" element={<DetailQuesPack />} />
                        <Route
                            path="/crud-q"
                            element={<PrivateRoute element={<ManageFcQ />} requiredRole="teacher" />}
                        >
                            <Route
                                path="add-quiz"
                                element={<PrivateRoute element={<ManageAddQuiz />} requiredRole="teacher" />}
                            />
                        </Route>
                        <Route path="/forbidden" element={<Forbidden />} />

                        <Route path="search" element={<ResultSearchItem />}>
                        </Route>

                        <Route path="classes/:classId" element={<Classes />}>
                            <Route path ="documents" element={<DocumentsClass />} />
                            <Route path="students" element={<StudentsClass />} />
                            <Route path="actions" element={<Actions />} />
                        </Route>
                    </Route>
                    <Route path="join-class/:token" element={<JoinClass />} /> 

                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />

                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default Layout;