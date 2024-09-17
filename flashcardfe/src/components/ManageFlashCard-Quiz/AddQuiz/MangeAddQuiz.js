import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ManageAddQuiz.scss';

const ManageAddQuiz = () => {
    const [questionPack, setQuestionPack] = useState({
        title: '',
        description: '',
        semester: 'ky1',
        subject: '',
        imagePreview: null,
        questions: [
            { question: '', answers: [{ answer: '', isCorrect: false }], image: null }
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuestionPack({
            ...questionPack,
            [name]: value
        });
    };

    const handleImageUpload = (file) => {
        setQuestionPack({
            ...questionPack,
            imagePreview: URL.createObjectURL(file)
        });
    };

    const handleRemoveImage = () => {
        setQuestionPack({
            ...questionPack,
            imagePreview: null
        });
    };

    const handleAddQuestion = () => {
        setQuestionPack({
            ...questionPack,
            questions: [
                ...questionPack.questions,
                { question: '', answers: [{ answer: '', isCorrect: false }], image: null }
            ]
        });
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = [...questionPack.questions];
        updatedQuestions.splice(index, 1);
        setQuestionPack({
            ...questionPack,
            questions: updatedQuestions
        });
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questionPack.questions];
        updatedQuestions[index].question = value;
        setQuestionPack({
            ...questionPack,
            questions: updatedQuestions
        });
    };

    const handleAddAnswer = (questionIndex) => {
        const updatedQuestions = [...questionPack.questions];
        if (updatedQuestions[questionIndex].answers.length < 4) {
            updatedQuestions[questionIndex].answers.push({ answer: '', isCorrect: false });
            setQuestionPack({
                ...questionPack,
                questions: updatedQuestions
            });
        } else {
            alert('You can only add up to 4 answers.');
        }
    };

    const handleAnswerChange = (questionIndex, answerIndex, value) => {
        const updatedQuestions = [...questionPack.questions];
        updatedQuestions[questionIndex].answers[answerIndex].answer = value;
        setQuestionPack({
            ...questionPack,
            questions: updatedQuestions
        });
    };

    const handleCorrectAnswerToggle = (questionIndex, answerIndex) => {
        const updatedQuestions = [...questionPack.questions];
        updatedQuestions[questionIndex].answers[answerIndex].isCorrect = !updatedQuestions[questionIndex].answers[answerIndex].isCorrect;
        setQuestionPack({
            ...questionPack,
            questions: updatedQuestions
        });
    };

    const handleQuestionImageUpload = (questionIndex, file) => {
        const updatedQuestions = [...questionPack.questions];
        updatedQuestions[questionIndex].image = URL.createObjectURL(file);
        setQuestionPack({
            ...questionPack,
            questions: updatedQuestions
        });
    };

    const handleQuestionRemoveImage = (questionIndex) => {
        const updatedQuestions = [...questionPack.questions];
        updatedQuestions[questionIndex].image = null;
        setQuestionPack({
            ...questionPack,
            questions: updatedQuestions
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Question Pack Data:', questionPack);
    };

    return (
        <div className='ManageAddQuiz-container container'>
            <h1>Create New Course</h1>

            <Form onSubmit={handleSubmit}>
                {/* Question Pack Details */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Enter title"
                                value={questionPack.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={1}
                                name="description"
                                placeholder="Enter description"
                                value={questionPack.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Semester</Form.Label>
                            <Form.Control
                                as="select"
                                name="semester"
                                value={questionPack.semester}
                                onChange={handleInputChange}
                            >
                                <option value="ky1">KY1</option>
                                <option value="ky2">KY2</option>
                                <option value="ky3">KY3</option>
                                <option value="ky4">KY4</option>
                                <option value="ky5">KY5</option>
                                <option value="ky6">KY6</option>
                                <option value="ky7">KY7</option>
                                <option value="ky8">KY8</option>
                                <option value="ky9">KY9</option>
                                <option value="other">Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                placeholder="Enter subject"
                                value={questionPack.subject}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Upload Image for Question Pack</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        className="form-control-file"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                    />
                    {questionPack.imagePreview && (
                        <div className="image-preview mt-2" style={{display:'flex',justifyContent:'center'}}>
                            <img src={questionPack.imagePreview} alt="Question Pack" style={{height:'200px',width:'auto'}}/>
                            <Button variant="danger" className="mt-2" onClick={handleRemoveImage}>Remove Image</Button>
                        </div>
                    )}
                </Form.Group>

                {/* Questions */}
                {questionPack.questions.map((questionItem, questionIndex) => (
                    <div key={questionIndex} className="question-block mb-5">
                        {/* Question Input Row */}
                        <Form.Group className="mb-3">
                            <Form.Label>Question {questionIndex + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter question"
                                value={questionItem.question}
                                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                            />
                        </Form.Group>

                        {/* Question Image Upload and Preview */}
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Image for Question</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                className="form-control-file"
                                onChange={(e) => handleQuestionImageUpload(questionIndex, e.target.files[0])}
                            />
                            {questionItem.image && (
                                <div className="image-preview mt-2">
                                    <img src={questionItem.image} alt={`Question ${questionIndex + 1}`}  style={{height:'200px',width:'auto'}}/>
                                    <Button variant="danger" className="mt-2" onClick={() => handleQuestionRemoveImage(questionIndex)}>Remove Image</Button>
                                </div>
                            )}
                        </Form.Group>

                        {/* Answers Row */}
                        <div className="answers-row">
                            {questionItem.answers.map((answerItem, answerIndex) => (
                                <Row key={answerIndex} className="mb-2">
                                    <Col md={8}>
                                        <Form.Control
                                            type="text"
                                            placeholder={`Answer ${answerIndex + 1}`}
                                            value={answerItem.answer}
                                            onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Correct Answer"
                                            checked={answerItem.isCorrect}
                                            onChange={() => handleCorrectAnswerToggle(questionIndex, answerIndex)}
                                        />
                                    </Col>
                                </Row>
                            ))}

                            {/* Add Answer Button */}
                            {questionItem.answers.length < 4 && (
                                <Button variant="secondary" onClick={() => handleAddAnswer(questionIndex)} className="mt-2">
                                    Add Answer
                                </Button>
                            )}
                        </div>

                        {/* Remove Question Button */}
                        {questionPack.questions.length > 1 && (
                            <Button variant="danger" className="ms-3 mt-2" onClick={() => handleRemoveQuestion(questionIndex)}>
                                Remove Question
                            </Button>
                        )}

                        <hr />
                    </div>
                ))}

                {/* Add New Question Button */}
                <Button variant="primary" onClick={handleAddQuestion}>
                    Add Question
                </Button>

                {/* Submit Button */}
                <div className="mt-4">
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ManageAddQuiz;
