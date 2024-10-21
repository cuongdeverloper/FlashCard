import { useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import './Register.scss';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reSendOtpApi } from "../../service/ApiService";
import "./Register.scss"

const Register = () => {
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);
    const [isLoadingResend, setIsLoadingResend] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [role, setRole] = useState('student');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]); 
    };

    const validateForm = () => {
        setIsFormValid(username && email && password && phoneNumber && gender);
    };

    const handleRegister = async () => {
        setIsLoadingRegister(true);
        let response = await registerUser(username, email, password, phoneNumber, gender, role, image);
        setIsLoadingRegister(false);
        console.log(response)
        if (response && response.errorCode !== 0){
            toast.error(response.message)
        }
        if (response && response.errorCode === 0) {
            toast.success(response.message);
            
            navigate('/otp-verify', { state: { userId: response.data.id } });
        } else {
            toast.error(response.message);
        }
    };

    // const handleResendOTP = async () => {
    //     setIsLoadingResend(true);
    //     const response = await reSendOtpApi(email); 
    //     setIsLoadingResend(false);
    //     if (response && response.errorCode === 0) {
    //         toast.success(response.message);
    //     } else {
    //         toast.error(response.message);
    //     }
    // };

    useEffect(() => {
        validateForm();
    }, [username, email, password, phoneNumber, gender]);

    return (
        <div className="Register-container">
            <div className='Register-container-parti'></div>
            <div className="Register-body">
                <form>
                    <div className="Register-header">
                        <span onClick={() => navigate('/')}><FaBackward className="back-icon" /> Go back home</span>
                    </div>
                    <h1 className='form-title'>REGISTER</h1>
                    <div className="Register-body-form mb-2">
                        <div className="form-outline form-input form-username">
                            <label className="form-label" htmlFor="usernameForm">Username</label>
                            <input
                                type="text"
                                id="usernameForm"
                                placeholder='Username'
                                className="form-control input-field"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="form-outline form-input form-email">
                            <label className="form-label" htmlFor="emailForm">Email</label>
                            <input
                                type="email"
                                id="emailForm"
                                placeholder='Email'
                                className="form-control input-field"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-outline form-input form-password">
                            <label className="form-label" htmlFor="passwordForm">Password</label>
                            <input
                                type="password"
                                id="passwordForm"
                                placeholder='Password'
                                className="form-control input-field"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-outline form-input form-phoneNumber">
                            <label className="form-label" htmlFor="phoneNumberForm">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumberForm"
                                placeholder='Phone Number'
                                className="form-control input-field"
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                            />
                        </div>
                        <div className="form-outline form-input form-gender">
                            <label className="form-label" htmlFor="genderForm">Gender</label>
                            <select
                                id="genderForm"
                                className="form-control input-field"
                                value={gender}
                                onChange={(event) => setGender(event.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-outline form-input form-image">
                            <label className="form-label" htmlFor="imageForm">Profile Image</label>
                            <input
                                type="file"
                                id="imageForm"
                                className="form-control input-field file-upload-button"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    <div className="Register-body-buttonSignUp">
                        <button
                            type='button'
                            className='btn-register btn btn-secondary'
                            onClick={handleRegister}
                            disabled={!isFormValid}
                        >
                            {isLoadingRegister && <ImSpinner9 className="loaderIcon" />}
                            REGISTER
                        </button>
                    </div>
                    <div className="Register-body-buttonResendOTP">
                        {/* <button
                            type='button'
                            className='btn-resend btn btn-secondary'
                            onClick={handleResendOTP}
                            disabled={!email}
                        >
                            {isLoadingResend && <ImSpinner9 className="loaderIcon" />}
                            RESEND OTP
                        </button> */}
                    </div>
                    <div className="Register-header-alreadyHaveAccount">
                        <label>Already have an account?</label>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
