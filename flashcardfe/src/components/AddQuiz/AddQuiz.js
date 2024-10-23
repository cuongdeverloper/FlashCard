import React, { useState } from 'react';
import { ApiAddQuizzByTeacher } from '../../service/ApiService'; 

const AddQuiz = () => {
    const [classId, setClassId] = useState('');
    const [questionPackId, setQuestionPackId] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(60); 
    const [instructions, setInstructions] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const result = await ApiAddQuizzByTeacher(classId, questionPackId, title, duration, instructions);
            console.log(result)
            setClassId('');
            setQuestionPackId('');
            setTitle('');
            setDuration(60);
            setInstructions('');
        } catch (error) {
            alert('Failed to add quiz. Please try again.'); 
        }
    };

    return (
        <div className="container">
            <h2 style={{color:'#fff'}}>Add Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="classId">Class ID:</label>
                    <input
                        type="text"
                        id="classId"
                        value={classId}
                        onChange={(e) => setClassId(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="questionPackId">Question Pack ID:</label>
                    <input
                        type="text"
                        id="questionPackId"
                        value={questionPackId}
                        onChange={(e) => setQuestionPackId(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Quiz Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration (minutes):</label>
                    <input
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        min="1"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="instructions">Instructions:</label>
                    <textarea
                        id="instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="form-control"
                        rows="4"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Quiz</button>
            </form>
        </div>
    );
};

export default AddQuiz;
