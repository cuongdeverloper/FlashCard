import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { updateUserProfile } from '../../../../service/ApiService';

const ModalUpdateUserAdm = ({ user, showUpdate, setShowUpdate,onSuccess }) => {
    const [show, setShow] = useState(showUpdate);
    const [originalProfile, setOriginalProfile] = useState(null); 
    const [updatedProfile, setUpdatedProfile] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        gender: '',
        role: '',
        image: null,
        _id: null,
    });
    const [imageUrl, setImageUrl] = useState(null);

    const handleClose = () => {
        setShow(false);
        setShowUpdate(false);
        setUpdatedProfile(originalProfile);
    };


    useEffect(() => {
        setShow(showUpdate);
        if (user) {
            setOriginalProfile(user);
            setUpdatedProfile(user);
            setImageUrl(user.image);
        }
    }, [showUpdate, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setUpdatedProfile((prev) => ({
            ...prev,
            [name]: selectedOption.value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedProfile((prev) => ({
                ...prev,
                image: file,
            }));
            setImageUrl(URL.createObjectURL(file));
        } else {
            setImageUrl(null);
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('username', updatedProfile.username);
        formData.append('email', updatedProfile.email);
        formData.append('phoneNumber', updatedProfile.phoneNumber);
        formData.append('gender', updatedProfile.gender);
        formData.append('role', updatedProfile.role);

        if (updatedProfile.image) {
            formData.append('image', updatedProfile.image);
        }

        try {
            const response = await updateUserProfile(updatedProfile._id, formData);
            if (response && response.errorCode === 0) {
                toast.success('Profile updated successfully!');
                setOriginalProfile(updatedProfile);
                onSuccess()
                handleClose()
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
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    return (
        <>
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
                                value={updatedProfile.username || ''}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={updatedProfile.email || ''}
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
                                value={updatedProfile.phoneNumber || ''}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                            />
                        </Form.Group>

                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Select
                                name="gender"
                                value={genderOptions.find(
                                    (option) => option.value === updatedProfile.gender
                                ) || null}
                                options={genderOptions}
                                onChange={handleSelectChange}
                                placeholder="Select your gender"
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole" hidden>
                            <Form.Label>Role</Form.Label>
                            <Select
                                name="role"
                                value={roleOptions.find((option) => option.value === updatedProfile.role) || null}
                                options={roleOptions}
                                onChange={handleSelectChange}
                                placeholder="Select your role"
                            />
                        </Form.Group>

                        <Form.Group controlId={`image-${updatedProfile._id}`}>
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

export default ModalUpdateUserAdm;
