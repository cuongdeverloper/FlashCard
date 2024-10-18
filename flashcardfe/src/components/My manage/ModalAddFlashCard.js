import { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
// import { addQuestionsToQuestionPack } from '../../service/ApiService'; // Import the function to handle the API request

const ModalAddFlashCard = ({ selectedOption, show, handleClose, handleAddQuestions }) => {
    const [newQuestions, setNewQuestions] = useState([{ questionText: "", answers: [], correctAnswers: [], image: null }]);
    const [validationError, setValidationError] = useState("");

    const handleQuestionChange = (index, event) => {
        const { name, value } = event.target;
        setNewQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index][name] = value;
            return updatedQuestions;
        });
    };

    const handleAnswerChange = (questionIndex, answerIndex, value) => {
        setNewQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[questionIndex].answers[answerIndex] = value;
            return updatedQuestions;
        });
    };

    const handleAddAnswer = (questionIndex) => {
        setNewQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[questionIndex].answers.push("");
            return updatedQuestions;
        });
    };

    const handleDeleteAnswer = (questionIndex, answerIndex) => {
        setNewQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
            return updatedQuestions;
        });
    };

    const handleCheckboxChange = (questionIndex, answerIndex) => {
        setNewQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            const correctAnswers = updatedQuestions[questionIndex].correctAnswers;

            if (correctAnswers.includes(answerIndex)) {
                updatedQuestions[questionIndex].correctAnswers = correctAnswers.filter(i => i !== answerIndex);
            } else {
                updatedQuestions[questionIndex].correctAnswers.push(answerIndex);
            }
            return updatedQuestions;
        });
    };

    const handleAddQuestion = () => {
        setNewQuestions(prev => [...prev, { questionText: "", answers: [], correctAnswers: [], image: null }]);
    };

    const handleImageChange = (questionIndex, event) => {
        const file = event.target.files[0];
    
        if (file) {
            setNewQuestions(prevQuestions => {
                const updatedQuestions = [...prevQuestions];
                updatedQuestions[questionIndex].image = file; 
                return updatedQuestions;
            });
        }
    };
    

    const handleSubmit = async () => {
        setValidationError("");

        // Validate each question
        for (const question of newQuestions) {
            if (question.answers.length < 2 || question.answers.length > 4) {
                setValidationError("Each question must have between 2 and 4 answers.");
                return;
            }
        }

        try {
            // Call API to add questions to the selected question pack
            await handleAddQuestions(newQuestions);
            // refreshQuestions(); // Refresh the questions after adding new ones
            handleClose();
        } catch (error) {
            console.error("Failed to add questions:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Questions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {validationError && <Alert variant="danger">{validationError}</Alert>}
                {newQuestions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-3">
                        <Form.Group controlId={`question-${questionIndex}`}>
                            <Form.Label>Question {questionIndex + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                name="questionText"
                                value={question.questionText}
                                onChange={(e) => handleQuestionChange(questionIndex, e)}
                            />
                        </Form.Group>
                        <Form.Group controlId={`answers-${questionIndex}`}>
                            <Form.Label>Answers:</Form.Label>
                            {question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className="d-flex align-items-center">
                                    <Form.Control
                                        type="text"
                                        value={answer}
                                        onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                                        className="me-2"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Correct Answer"
                                        checked={question.correctAnswers.includes(answerIndex)}
                                        onChange={() => handleCheckboxChange(questionIndex, answerIndex)}
                                        className="me-2"
                                    />
                                    <Button variant="danger" onClick={() => handleDeleteAnswer(questionIndex, answerIndex)}>
                                        Delete
                                    </Button>
                                </div>
                            ))}
                            <Button variant="success" onClick={() => handleAddAnswer(questionIndex)} className="mt-2">
                                Add Answer
                            </Button>
                        </Form.Group>
                        <Form.Group controlId={`image-${questionIndex}`}>
                            <Form.Label>Upload Image:</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(questionIndex, e)}
                            />
                            {question.image && <img src={question.image} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
                        </Form.Group>
                    </div>
                ))}
                <Button variant="primary" onClick={handleAddQuestion} className="mt-2">
                    Add Another Question
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAddFlashCard;
