import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ManageAddQuiz.scss';
import { createNewQuestionPackApi, createQuestionToQuestionPackAPI, getUserId } from '../../../service/ApiService';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa'; 

const ManageAddQuiz = () => {
    const [questionPack, setQuestionPack] = useState({
        title: '',
        description: '',
        semester: 'ky1',
        subject: '',
        imagePreview: null,
        isPublic:false,
        questions: [
            { question: '', answers: [{ answer: '', isCorrect: false }], image: null }
        ]
    });

    const initQP = {
        title: '',
        description: '',
        semester: 'ky1',
        subject: '',
        imagePreview: ''
    };

    const [titleQP, setTitleQP] = useState(initQP.title);
    const [descriptionQP, setDescriptionQP] = useState(initQP.description);
    const [semesterQP, setSemesterQP] = useState(initQP.semester);
    const [subjectQP, setSubjectQP] = useState(initQP.subject);
    const [imagePreview, setImagePreview] = useState(initQP.imagePreview);
    const [isPublic, setIsPublic] = useState(false);
    const [userId, setUserId] = useState('');

    const handleSemesterChange = (event) => {
        setSemesterQP(event.target.value);
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

        // Toggle correct answer without removing others
        updatedQuestions[questionIndex].answers[answerIndex].isCorrect = !updatedQuestions[questionIndex].answers[answerIndex].isCorrect;

        setQuestionPack({
            ...questionPack,
            questions: updatedQuestions
        });
    };

    const handleQuestionImageUpload = (questionIndex, file) => {
        const updatedQuestions = [...questionPack.questions];
        updatedQuestions[questionIndex].image = file;
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

    const handleRemoveAnswer = (questionIndex, answerIndex) => {
        const updatedQuestions = [...questionPack.questions];
        updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
        setQuestionPack({
            ...questionPack,
            questions: updatedQuestions
        });
    };

    const handleCreateQP = async () => {
        console.log('Question Pack State:', questionPack); // Debugging line
    
        // Front-end validation
        for (let i = 0; i < questionPack.questions.length; i++) {
            const question = questionPack.questions[i];
            
            // Validate question existence
            if (!question.question.trim()) {
                toast.error(`Question ${i + 1} is required.`);
                return;
            }
            
            // Validate the number of answers
            const numAnswers = question.answers.length;
            console.log(`Question ${i + 1} answers length: ${numAnswers}`); // Debugging line
            if (numAnswers < 2 || numAnswers > 4) {
                toast.error(`Question ${i + 1} must have more than 1 and no more than 4 answers.`);
                return;
            }
            
            // Validate at least one correct answer
            const hasCorrectAnswer = question.answers.some(answer => answer.isCorrect);
            if (!hasCorrectAnswer) {
                toast.error(`Question ${i + 1} must have at least 1 correct answer.`);
                return;
            }
        }
        
        // Check if there is at least one question
        if (questionPack.questions.length === 0) {
            toast.error("You must add at least one question before creating the question pack.");
            return;
        }
        
        try {
            let response = await createNewQuestionPackApi(
                titleQP, 
                descriptionQP, 
                userId, 
                semesterQP, 
                subjectQP, 
                imagePreview,
                isPublic
            );
            console.log('rs',response)
            if (response && response._id) {
                const questionPackId = response._id;
                toast.success('Question pack created successfully!');
        
                const formattedQuestions = questionPack.questions.map((question) => ({
                    question: question.question,
                    image: question.image,
                    answers: question.answers.map((a) => a.answer),
                    correctAnswers: question.answers
                        .map((answer, index) => (answer.isCorrect ? index : null))
                        .filter((index) => index !== null)
                }));
        
                for (const formattedQuestion of formattedQuestions) {
                    let questionResponse = await createQuestionToQuestionPackAPI(
                        formattedQuestion.question,
                        formattedQuestion.image,
                        formattedQuestion.answers,
                        formattedQuestion.correctAnswers,
                        questionPackId
                    );
                    console.log('img',formattedQuestion.image)
                    console.log('qs',questionResponse)
                    if (questionResponse && questionResponse.errorCode === 0) {
                        // toast.success('Question added successfully!');
                    } else {
                        toast.error('Failed to add question.');
                    }
                }
            } else {
                toast.error('Failed to create question pack.');
            }
        } catch (error) {
            console.error('Error creating question pack:', error);
            toast.error('An error occurred while creating the question pack.');
        }
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setQuestionPack((prev) => ({
                ...prev,
                imagePreview: imageUrl, 
            }));
            setImagePreview(file); 
        }
    };
    const handleIsPublicChange = () => {
        setIsPublic(!isPublic);
    };
    const getId = async () => {
        try {
            const response = await getUserId();
            setUserId(response.data.id);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getId();
    }, []);

    return (
        <div className='ManageAddQuiz-container container'>
            <h1>Create New Course</h1>

            <Form>
                {/* Question Pack Details */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Enter title"
                                value={titleQP}
                                onChange={(event) => setTitleQP(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                     type="text"                   
                                rows={1}
                                name="description"
                                placeholder="Enter description"
                                value={descriptionQP}
                                onChange={(event) => setDescriptionQP(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="formIsPublic">
                <Form.Label>Is Public?</Form.Label>
                    <Form.Check 
                        type="checkbox" 
                        
                        checked={isPublic} 
                        onChange={handleIsPublicChange} 
                    />
                </Form.Group>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Semester</Form.Label>
                            <Form.Control
                                as="select"
                                name="semester"
                                value={semesterQP}
                                onChange={handleSemesterChange}
                                className='flashcard-semester-option'
                            >
                                <option value="ky1">KY1</option>
                                <option value="ky2">KY2</option>
                                <option value="ky3">KY3</option>
                                <option value="ky4">KY4</option>
                                <option value="ky5">KY5</option>
                                <option value="ky6">KY6</option>
                                <option value="ky7">KY7</option>
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
                                value={subjectQP}
                                onChange={(event) => setSubjectQP(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                    <Form.Group>
    <Form.Label>Image Preview</Form.Label>
    <Form.Control
        type="file"
        accept="image/*"
        onChange={(event) => handleImageChange(event)}
    />
    {questionPack.imagePreview && (
        <img src={questionPack.imagePreview} alt="Preview" width="100" />
    )}
</Form.Group>
                    </Col>
                </Row>

                {/* Question List */}
                <div>
                    {questionPack.questions.map((question, index) => (
                        <div key={index} className="mb-3 question-block">
                            <div className="question-header">
                                <Form.Group className="question-row">
                                    <Form.Label>Question {index + 1}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter question"
                                        value={question.question}
                                        onChange={(event) => handleQuestionChange(index, event.target.value)}
                                    />
                                </Form.Group>

                                <FaTrash 
                                    className="delete-icon" 
                                    onClick={() => handleRemoveQuestion(index)} 
                                />
                            </div>

                            {question.image && (
                                <>
                                    <img  src={URL.createObjectURL(question.image)}  alt="Question" width="100" />
                                    <Button variant="danger" onClick={() => handleQuestionRemoveImage(index)}>Remove Image</Button>
                                </>
                            )}

                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleQuestionImageUpload(index, event.target.files[0])}
                            />

                            {question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className="answer-block">
                                    <div className="answer-header">
                                        <Form.Group>
                                            <Form.Label>Answer {answerIndex + 1}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter answer"
                                                value={answer.answer}
                                                onChange={(event) => handleAnswerChange(index, answerIndex, event.target.value)}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="Correct Answer"
                                                checked={answer.isCorrect}
                                                onChange={() => handleCorrectAnswerToggle(index, answerIndex)}
                                            />
                                        </Form.Group>

                                        <FaTrash 
                                            className="delete-icon" 
                                            onClick={() => handleRemoveAnswer(index, answerIndex)} 
                                        />
                                    </div>
                                </div>
                            ))}

                            <Button variant="primary" onClick={() => handleAddAnswer(index)}>Add Answer</Button>
                        </div>
                    ))}
                </div>
                <div className="button-group">
    <Button variant="primary" onClick={handleAddQuestion}>Add Question</Button>
    <Button variant="success" onClick={handleCreateQP}>Create Question Pack</Button>
</div>

            </Form>
        </div>
    );
};

export default ManageAddQuiz;