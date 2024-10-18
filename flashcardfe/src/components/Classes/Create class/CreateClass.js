import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createClassApi } from '../../../service/ApiService';
import './createclass.scss'; // Import the CSS file with nested classes inside the parent class

const CreateClass = () => {
    const [className, setClassName] = useState('');

    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.account.role); // Check if the user is a teacher or admin

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userRole !== 'teacher' && userRole !== 'admin') {
            toast.error('Only teachers or admins can create classes.');
            return;
        }

        try {
            const response = await createClassApi(className);
            console.log(response);
            toast.success('Class created successfully!');
            setClassName('');

        } catch (error) {
            toast.error('An error occurred while creating the class.');
            console.error('Error creating class:', error);
        }
    };

    return (
        <div className="create-class-container">
            <div className="create-class-card">
                <h2>Create Your Free Class</h2>
                <p>Give students uninterrupted access to the Learning and Testing mode for all content in your class. Completely free!</p>

                <form onSubmit={handleSubmit}>
                    <div className="create-class-form-group">
                        <input
                            type="text"
                            id="className"
                            placeholder="Your new class"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            required
                            className="create-class-input-field"
                        />
                    </div>

                    <button type="submit" className="create-class-btn">
                        Create Class
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateClass;
