import React, { Suspense } from "react";
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

import MessagePage from "./components/message/MessagePage";
import UserMessage from "./components/message/UserMessage";
import ViewProfile from "./components/Userprofile.js/profile";
import Quiz from "./components/Quiz/Quiz";
import MyManage from "./components/My manage/MyManage";

import MyClass from "./components/Myclass-homepage/myclass";
import ModalDetailResults from "./components/Result/Result From teacher/ModalDetailResult";
import EnterOTPRegister from "./components/auth/EnterOTPRegister";
import RequestPasswordReset from "./components/auth/reset password/RequestPasswordReset";
import ResetPassword from "./components/auth/reset password/ResetPassword";
import AuthCallback from "./components/AuthCallback";
import ResultTeacher from "./components/Result/Result From teacher/ResultTeacher";
import ResultUser from "./components/Result/Result From User/ResultUser";
import CreateClass from "./components/Classes/Create class/CreateClass";
import AdminManage from "./components/Admin manager/AdminManage";
import Dashboard from "./components/Admin manager/Dash board/Dashboard";
import AdminManageUser from "./components/Admin manager/User/AdminManageUser";



const Layout = () => {



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
                        <Route path="/crud-q" element={<PrivateRoute element={<ManageFcQ />} requiredRole={['teacher', 'admin']} />}>
                            <Route path="add-quiz" element={<PrivateRoute element={<ManageAddQuiz />} requiredRole="teacher" />} />
                        </Route>
                        <Route path="/create-class" element={<PrivateRoute element={<CreateClass />} requiredRole={['teacher', 'admin']} />} />

                        <Route path="/admin-manage" element={<PrivateRoute element={<AdminManage />} requiredRole='admin'/>} >
                            <Route  index element={<PrivateRoute element={<Dashboard />} requiredRole="admin" />} />
                            <Route path="admin-user" element={<AdminManageUser/>} /> 
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
                    <Route path="/modal-detail-results/:resultId" element={<ModalDetailResults />} />

                    <Route path="/result/:examId" element={<ResultTeacher />} />
                    <Route path="/results/user" element={<ResultUser />} />
                    <Route path="/userprofile" element={<ViewProfile />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default Layout;
