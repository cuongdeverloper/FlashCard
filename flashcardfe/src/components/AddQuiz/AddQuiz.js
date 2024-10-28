import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ApiAddQuizzByTeacher, getQuestionPackOfTeacher } from '../../service/ApiService'; 
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AddQuiz = () => {
    const [questionPackId, setQuestionPackId] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(60); 
    const [instructions, setInstructions] = useState('');
    const [listQp, setListQp] = useState([]);
    const [loading, setLoading] = useState(false);
    const userId = useSelector((state) => state.user.account.id);

    useEffect(() => {
        getQpOfTeacher();
    }, []);

    const getQpOfTeacher = async () => {
        try {
            setLoading(true);
            let response = await getQuestionPackOfTeacher(userId);
            setListQp(response.data.map(qp => ({ value: qp._id, label: `${qp.subject}: ${qp.title}` }))); // Assuming qp has `_id` and `name` fields
        } catch (error) {
            console.error('Failed to load question packs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const result = await ApiAddQuizzByTeacher(questionPackId, title, duration, instructions);
            if (result.success) {
                toast.success(result.message);
                setQuestionPackId('');
                setTitle('');
                setDuration(60);
                setInstructions('');
            }
        } catch (error) {
            alert('Failed to add quiz. Please try again.'); 
        }
    };

    return (
        <div className="container">
            <h2 style={{ color: '#fff' }}>Add Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="questionPackId">Select Question Pack:</label>
                    <Select
                        id="questionPackId"
                        options={listQp}
                        value={listQp.find(pack => pack.value === questionPackId)}
                        onChange={(selectedOption) => setQuestionPackId(selectedOption?.value || '')}
                        isLoading={loading}
                        placeholder="Select a question pack"
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
