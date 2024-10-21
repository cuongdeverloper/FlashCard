import { useSelector } from "react-redux";
import {createQuestionToQuestionPackAPI, deleteQuestionToQuestionPackAPI, getQuestionByQPId, getQuestionPackOfTeacher, updateQuestion, updateQuestionPack } from "../../service/ApiService";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { Accordion, Button, Form, Alert } from "react-bootstrap";
import ModalUpdateQuestionPack from "./ModalUpdateQuestionpack";
import "./css/myManage.scss"
import ModalAssignQpToClass from "./ModalAssignQpToClass";
import ModalAddFlashCard from "./ModalAddFlashCard";
import { toast } from "react-toastify";
import ModalDeleteFlashCard from "./ModalDeleteFlashCard";

const MyManage = () => {
    const userId = useSelector((state) => state.user.account.id);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [listQp, setListQp] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [editedQuestion, setEditedQuestion] = useState({ correctAnswers: [], answers: [] });
    const [imageFile, setImageFile] = useState(null);
    const [saving, setSaving] = useState(false);
    const [validationError, setValidationError] = useState("");
    const [idQp, setIdQp] = useState('');
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
const [showModalRemove,setShowModalRemove] = useState(false);
const [dataRemove,setDataRemove] = useState('');
    const handleCloseAddQuestionModal = () => setShowAddQuestionModal(false);
    const handleShowAddQuestionModal = () => setShowAddQuestionModal(true);
    const [qpForm, setQpForm] = useState({
        title: '',
        description: '',
        isPublic: false,
        semester: '',
        subject: '',

    });
    const handleAddQuestions = async (newQuestions) => {
        try {
            let response =await Promise.all(newQuestions.map(question => 
                createQuestionToQuestionPackAPI(
                    question.questionText,
                    question.image, 
                    question.answers,
                    question.correctAnswers,
                    selectedOption.value 
                )
            ));
            toast.success('Create success')
            handleGetQuestionByQpId(); // Refresh the questions
            handleCloseAddQuestionModal(); // Close the modal
        } catch (error) {
            console.error('Error adding questions:', error);
        }
    };
    const [imagePreview, setImagePreview] = useState(null);
    useEffect(() => {
        getApiQpByTeacherId();
    }, []);

    useEffect(() => {
        if (selectedOption && selectedOption.value) {
            handleGetQuestionByQpId();
            loadQuestionPackDetails()
        }
    }, [selectedOption]);

    const options = listQp.map(item => ({
        value: item._id,
        label: `${item.subject}: ${item.title}`
    }));
    const loadQuestionPackDetails = () => {
        const selectedQp = listQp.find(item => item._id === selectedOption.value);
        if (selectedQp) {
            setQpForm({
                title: selectedQp.title,
                description: selectedQp.description,
                isPublic: selectedQp.isPublic,
                semester: selectedQp.semester,
                subject: selectedQp.subject,
                imagePreview: selectedQp.imagePreview,
                isPublic: selectedQp.isPublic
            });
            setImagePreview(selectedQp.imagePreview);
        }

    };
    const getApiQpByTeacherId = async () => {
        try {
            setLoading(true);
            let response = await getQuestionPackOfTeacher(userId);
            setListQp(response.data);

        } catch (error) {
            setError('Failed to load question packs');
        } finally {
            setLoading(false);
        }
    };

    const handleGetQuestionByQpId = async () => {
        try {
            if (selectedOption && selectedOption.value) {
                let response = await getQuestionByQPId(selectedOption.value);
                setQuestions(response.data.questions || []);
                setIdQp(response.data._id)
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };
   
    const handleEditClick = (question) => {
        setEditingQuestionId(question._id);
        setEditedQuestion({ ...question, correctAnswers: [...question.correctAnswers], answers: [...question.answers] });
        setImageFile(null); // Reset image file when editing a question
    };

    const handleSaveClick = async () => {
        // Validate that the number of answers is > 2 and < 4
        if (editedQuestion.answers.length < 2 || editedQuestion.answers.length > 4) {
            setValidationError("You must provide at least 2 answers and no more than 4.");
            return;
        }
        setValidationError(""); // Clear the error if validation passes

        try {
            const formData = new FormData();
            formData.append('questionText', editedQuestion.questionText);
            formData.append('answers', JSON.stringify(editedQuestion.answers));
            formData.append('correctAnswers', JSON.stringify(editedQuestion.correctAnswers));
            if (imageFile) {
                formData.append('imagePreview', imageFile);
            }

            setSaving(true);
            let response = await updateQuestion(editedQuestion._id, formData);
            setEditingQuestionId(null);
            handleGetQuestionByQpId(); // Refresh the question list
        } catch (error) {
            console.error("Failed to update question", error);
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedQuestion(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (index) => {
        setEditedQuestion(prev => {
            const updatedCorrectAnswers = prev.correctAnswers.includes(index)
                ? prev.correctAnswers.filter(i => i !== index)
                : [...prev.correctAnswers, index];

            return { ...prev, correctAnswers: updatedCorrectAnswers };
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Set the selected file
        }
    };
    const handleQpFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setQpForm(prev => ({ ...prev, [name]: inputValue }));
    };
    const handleImagePreviewChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(file);
        }
    };
    const handleUpdateQuestionPack = async () => {
        try {
            const formData = new FormData();
            formData.append('title', qpForm.title);
            formData.append('description', qpForm.description);
            formData.append('isPublic', qpForm.isPublic);
            formData.append('semester', qpForm.semester);
            formData.append('subject', qpForm.subject);

            if (imagePreview) {
                formData.append('imagePreview', imagePreview); 
            }

            setSaving(true);
            let response = await updateQuestionPack(selectedOption.value, formData);
            setSaving(false);
            getApiQpByTeacherId(); 
        } catch (error) {
            console.error('Failed to update question pack:', error);
            setSaving(false);
        }
    };
    const handleAddAnswer = () => {
        setEditedQuestion(prev => ({
            ...prev,
            answers: [...prev.answers, ""]
        }));
    };

    const handleDeleteAnswer = (index) => {
        setEditedQuestion(prev => {
            const updatedAnswers = prev.answers.filter((_, i) => i !== index);
            const updatedCorrectAnswers = prev.correctAnswers.filter(i => i !== index);
            return { ...prev, answers: updatedAnswers, correctAnswers: updatedCorrectAnswers };
        });
    };

    const handleAnswerChange = (index, value) => {
        setEditedQuestion(prev => {
            const updatedAnswers = [...prev.answers];
            updatedAnswers[index] = value;
            return { ...prev, answers: updatedAnswers };
        });
    };

    const handleRemoveFlashCard = (flashcard) =>{
        setShowModalRemove(true)
        setDataRemove(flashcard)
    }
    const handleDeleteQuestion = async () => {
        let response = await deleteQuestionToQuestionPackAPI(dataRemove._id)
    console.log(response)
    if(response && response.errorCode === 0) {
        toast.success(response.message)
        handleGetQuestionByQpId()
    } else {
        toast.error(response?.message)
    }
    };
    return (
        <div style={{ backgroundColor: '#121045' }} className="m-3">
            {loading ? <p>Loading...</p> : (
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Select Question Pack</Accordion.Header>
                        <Accordion.Body>
                            <Select
                                className='SelectQuizz m-3'
                                value={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                isClearable={true}
                            />
                            <Button variant="primary" onClick={handleShow}>
                                Update Question Pack
                            </Button>
                            <ModalUpdateQuestionPack
                                show={show}
                                handleClose={handleClose}
                                handleUpdateQuestionPack={handleUpdateQuestionPack}
                                qpForm={qpForm}
                                handleQpFormChange={handleQpFormChange}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                            />
                        </Accordion.Body>

                        <ModalUpdateQuestionPack
                            qpForm={qpForm}
                        />
                    </Accordion.Item>
                </Accordion>
            )}

            {error && <p>{error}</p>}
            {idQp && idQp.length > 0 && (          
                <>
                 <ModalAssignQpToClass  
                selectedOption={selectedOption}
                />
               <Button variant="primary" className="mt-4" onClick={handleShowAddQuestionModal}>
                Add Questions
            </Button>
            <ModalAddFlashCard 
                show={showAddQuestionModal} 
                handleClose={handleCloseAddQuestionModal} 
                handleAddQuestions={handleAddQuestions}
                selectedOption={selectedOption} 
            />
                </>
            )}
            {questions.length > 0 && (
                <div className="questions-list">
                    {questions.map((question) => (
                        <div key={question._id} className="question-item">
                            {editingQuestionId === question._id ? (
                                <div>
                                    <Form.Group controlId={`question-${question._id}`}>
                                        <Form.Label>Question:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="questionText"
                                            value={editedQuestion.questionText || ""}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId={`answer-${question._id}`}>
                                        <Form.Label>Answers:</Form.Label>
                                        {editedQuestion.answers.map((answer, index) => (
                                            <div key={index} className="d-flex align-items-center">
                                                <Form.Control
                                                    type="text"
                                                    value={answer}
                                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                    className="me-2"
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Correct Answer"
                                                    checked={editedQuestion.correctAnswers.includes(index)}
                                                    onChange={() => handleCheckboxChange(index)}
                                                    className="me-2"
                                                />
                                                <Button variant="danger" onClick={() => handleDeleteAnswer(index)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        ))}
                                        {validationError && <Alert variant="danger" className="mt-2">{validationError}</Alert>}
                                        <Button
                                            variant="success"
                                            onClick={handleAddAnswer}
                                            className="mt-2"
                                            disabled={editedQuestion.answers.length >= 4}
                                        >
                                            Add Answer
                                        </Button>
                                    </Form.Group>
                                    <Form.Group controlId={`image-${question._id}`}>
                                        <Form.Label>Image:</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        {imageFile && (
                                            <img
                                                src={URL.createObjectURL(imageFile)}
                                                alt="Selected"
                                                style={{ height: '100px', width: '100px', marginTop: '10px' }}
                                            />
                                        )}
                                    </Form.Group>
                                    <Button onClick={handleSaveClick} disabled={saving} className="btn-save">
                                        {saving ? 'Saving...' : 'Save'}
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    {question.questionImage ? (
                                        <img src={question.questionImage} alt="Question Preview" style={{ height: '100px', width: '100px' }} />
                                    ) : (
                                        <p>No image available</p>
                                    )}
                                    <p><strong>Question:</strong> {question.questionText}</p>
                                    <p><strong>Answers:</strong></p>
                                    <ul>
                                        {question.answers && question.answers.length > 0 ? (
                                            question.answers.map((answer, index) => (
                                                <li key={index}>
                                                    {answer} {question.correctAnswers.includes(index) && "✓"}
                                                </li>
                                            ))
                                        ) : (
                                            <li>No answers available</li>
                                        )}
                                    </ul>
                                    <Button onClick={() => handleEditClick(question)}>Edit</Button>
                                    <Button onClick={() => handleRemoveFlashCard(question)} className="mx-3">Remove</Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <ModalDeleteFlashCard 
                show={showModalRemove}
                setShow={setShowModalRemove}
                dataRemove={dataRemove}
                setDataRemove={setDataRemove}
                handleDeleteQuestion={handleDeleteQuestion}
            />
        </div>
    );
};

export default MyManage;
