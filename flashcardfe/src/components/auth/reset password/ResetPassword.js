import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPasswordApi } from '../../../service/ApiService';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const token = searchParams.get('token');
    const navigate = useNavigate()
    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        try {
            const response = await resetPasswordApi(token, newPassword);
            console.log(response)
            if (response.errorCode === 0) {
                toast.success(response.message);
                navigate('/login')
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("An error occurred while resetting password.");
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Your Password</h2>
            <div className="form-group">
                <label>New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                />
            </div>
            <button className="btn btn-primary" onClick={handleResetPassword}>
                Reset Password
            </button>
        </div>
    );
};

export default ResetPassword;
