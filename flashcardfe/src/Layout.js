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
                        <Route path="/crud-q" element={<ManageFcQ />}>
                            <Route path="add-q" element={<ManageAddQuiz />} />
                        </Route>
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />


                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default Layout;