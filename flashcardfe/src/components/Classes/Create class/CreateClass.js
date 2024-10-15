import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createClassApi } from '../../../service/ApiService';

const CreateClass = () => {
    const [className, setClassName] = useState('');

    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.account.role); // Check if user is a teacher

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userRole !== 'teacher' && userRole !=='admin') {
            toast.error('Only teachers or andmins can create classes.');
            return;
        }

        try {
            const response = await createClassApi(className)
            console.log(response)
            toast.success('Class created successfully!');
            setClassName(''); 

           
        } catch (error) {
            toast.error('An error occurred while creating the class.');
            console.error('Error creating class:', error);
        }
    };

    return (
        <div>
            <h1>Create a New Class</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="className">Class Name:</label>
                    <input
                        type="text"
                        id="className"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Create Class</button>
            </form>
        </div>
    );
};

export default CreateClass;
