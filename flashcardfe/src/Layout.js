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
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />

                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default Layout;