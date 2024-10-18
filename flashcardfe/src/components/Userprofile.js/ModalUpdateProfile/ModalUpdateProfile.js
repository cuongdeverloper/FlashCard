import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { updateUserProfile } from '../../../service/ApiService';
import { useDispatch } from 'react-redux';
import { doLogout } from '../../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';

const ModalUpdateProfile = ({ user,showUpdate }) => {
    const [show, setShow] = useState(showUpdate);
    const [updatedProfile, setUpdatedProfile] = useState(user);
    const [imageUrl, setImageUrl] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false)
    
    };
    const handleShow = () => {
        setShow(true)
    };
useEffect(()=>{
    setShow(showUpdate)
},[showUpdate])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({
            ...updatedProfile,
            [name]: value,
        });
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setUpdatedProfile({
            ...updatedProfile,
            [name]: selectedOption.value,
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedProfile((prevState) => ({
                ...prevState,
                image: file,
            }));
            setImageUrl(URL.createObjectURL(file));
        } else {
            setImageUrl(null); 
        }
    };

    const handleSave = async () => {
        const formData = new FormData();

        // Append each field to the FormData object
        formData.append('username', updatedProfile.username);
        formData.append('email', updatedProfile.email);
        formData.append('phoneNumber', updatedProfile.phoneNumber);
        formData.append('gender', updatedProfile.gender);
        formData.append('role', updatedProfile.role);

        // Append the image file if it exists
        if (updatedProfile.image) {
            formData.append('image', updatedProfile.image);
        }

        try {
            const response = await updateUserProfile(updatedProfile.id, formData);
            console.log(response);
            if (response && response.errorCode === 0) {
                toast.warning('You must login again.');
                dispatch(doLogout());
                navigate('/login');
            } else {
                toast.success('Profile updated successfully!');
            }
        } catch (error) {
            toast.error('Error updating profile: ' + error.message);
        }
    };

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    const roleOptions = [
        { value: 'teacher', label: 'Teacher' },
        { value: 'student', label: 'Student' },
        { value: 'admin', label: 'Admin' },
    ];
    useEffect(() => {
        if (user) {
            setUpdatedProfile(user); // Update the profile when user changes
        }
    }, [user]);
    
    useEffect(() => {
        return () => {
            
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit Profile
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={updatedProfile?.username}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={updatedProfile?.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                disabled
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={updatedProfile?.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                            />
                        </Form.Group>

                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Select
                                name="gender"
                                value={genderOptions.find(
                                    (option) => option.value === updatedProfile?.gender
                                )}
                                options={genderOptions}
                                onChange={handleSelectChange}
                                placeholder="Select your gender"
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole" hidden>
                            <Form.Label>Role</Form.Label>
                            <Select
                                name="role"
                                value={roleOptions.find((option) => option.value === updatedProfile?.role)}
                                options={roleOptions}
                                onChange={handleSelectChange}
                                placeholder="Select your role"
                            />
                        </Form.Group>

                        <Form.Group controlId={`image-${updatedProfile?.id}`}>
                            <Form.Label>Profile Picture:</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt="Selected"
                                    style={{ height: '100px', width: '100px', marginTop: '10px' }}
                                />
                            )}
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateProfile;
