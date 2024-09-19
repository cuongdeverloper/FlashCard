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
import PrivateRoute from "./components/routes/PrivateRoute";

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
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                {/* Public routes */}
                <Route path="/" element={<HomePage />}>
                    <Route index element={<ListQuestionPack />} />
                    <Route path="detailquespack/:packId" element={<DetailQuesPack />} />
                </Route>
                {/* Protected routes */}
                <Route path="/crud-q" element={<PrivateRoute element={<ManageFcQ />} />} />
                <Route path="/crud-q/add-q" element={<PrivateRoute element={<ManageAddQuiz />} />} />
            </Routes>
        </BrowserRouter>
        </Suspense>
    );
};

export default Layout;
