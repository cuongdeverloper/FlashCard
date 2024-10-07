import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getQuizByQuizId, postSubmitExam } from '../../service/ApiService';
import ModalResultQuizz from './ModalFinishQuiz';
import { Pie } from 'react-chartjs-2'; // Import Pie chart component
import './Quiz.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Quiz = () => {
    const { quizId } = useParams();
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [showModalResult, setShowModalResult] = useState(false);
    const [examId, setExamId] = useState('');
    const questionRefs = useRef([]);

    const fetchQuiz = async () => {
        try {
            const response = await getQuizByQuizId(quizId);
            setExamId(response.exam._id);
            setQuizData(response.exam);
        } catch (error) {
            setError('Failed to fetch the quiz');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [quizId]);

    const handleAnswerChange = (questionId, selectedAnswer) => {
        setAnswers((prevAnswers) => {
            const currentAnswers = prevAnswers[questionId] || [];
            if (currentAnswers.includes(selectedAnswer)) {
                return {
                    ...prevAnswers,
                    [questionId]: currentAnswers.filter((answer) => answer !== selectedAnswer),
                };
            } else {
                return {
                    ...prevAnswers,
                    [questionId]: [...currentAnswers, selectedAnswer],
                };
            }
        });
    };

    const checkAnswers = () => {
        const result = quizData.questions.map((question) => {
            const correct = Array.isArray(question.correctAnswers)
                ? question.correctAnswers
                : [question.correctAnswers];
            const selected = answers[question._id] || [];

            const isCorrect =
                selected.length === correct.length &&
                correct.every((answer) => selected.includes(answer)) &&
                selected.every((answer) => correct.includes(answer));

            return {
                questionId: question._id,
                questionText: question.questionText,
                correctAnswers: correct,
                selectedAnswers: selected,
                isCorrect,
            };
        });

        return result;
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const result = checkAnswers();
        setResults(result);
        setShowModalResult(true);
        setQuizFinished(true);
        try {
            console.log(examId);
            console.log(answers);
            let response = await postSubmitExam(examId, answers);
            console.log(response);
        } catch (error) {
            console.error('Error submitting the exam:', error);
        }
    };

    const scrollToQuestion = (index) => {
        questionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) return <div>Loading quiz...</div>;
    if (error) return <div>{error}</div>;

    // Prepare data for Pie chart
    const correctCount = results.filter(r => r.isCorrect).length;
    const incorrectCount = results.length - correctCount;

    const pieChartData = {
        labels: ['Correct', 'Incorrect'],
        datasets: [
            {
                label: '# of Answers',
                data: [correctCount, incorrectCount],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // Correct color
                    'rgba(255, 99, 132, 0.6)'   // Incorrect color
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        },
    };

    return (
        <div className="quiz-container d-flex">
            {/* Sidebar for question navigation */}
            {quizStarted && (
                <div className="quiz-left-sidebar">
                    <ul className="question-list">
                        {quizData.questions?.map((_, index) => {
                            const result = results.find((r) => r.questionId === quizData.questions[index]._id);
                            const statusClass = result ? (result.isCorrect ? 'correct' : 'incorrect') : '';
                            return (
                                <li
                                    key={index}
                                    className={`question-link ${statusClass}`}
                                    onClick={() => scrollToQuestion(index)}
                                >
                                    Question {index + 1}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {/* Main quiz content */}
            <Container className="quiz-content">
                {!quizStarted ? (
                    <Row className="d-flex justify-content-center">
                        <Col md="auto" className="text-center">
                            <h2>{quizData.title}</h2>
                            <p>{quizData.instructions}</p>
                            <p>Time: {quizData.duration} m</p>
                            <Button variant="primary" onClick={() => setQuizStarted(true)}>
                                Start Quiz
                            </Button>
                        </Col>
                    </Row>
                ) : quizFinished ? (
                    <div>
                        <h3>Quiz Completed!</h3>
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}
                                ref={(el) => (questionRefs.current[index] = el)}
                            >
                                <h4>{index + 1}. {result.questionText}</h4>
                                <p>Your Answer: {result.selectedAnswers.join(', ')}</p>
                                {!result.isCorrect && <p>Correct Answer: {result.correctAnswers.join(', ')}</p>}
                            </div>
                        ))}
                        {/* Display the Pie chart */}
                        <div className="chart-container mt-4">
                            <h4>Quiz Results</h4>
                            <Pie data={pieChartData} options={pieChartOptions} />
                        </div>
                    </div>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        {quizData.questions.map((question, index) => (
                            <div
                                key={index}
                                className="question-section"
                                ref={(el) => (questionRefs.current[index] = el)}
                            >
                                <h4>{index + 1}. {question.questionText}</h4>
                                <Row>
                                    {question.answers.map((answer, idx) => (
                                        <Col md={6} key={idx}>
                                            <div
                                                className={`answer-option ${answers[question._id]?.includes(answer) ? 'selected' : ''}`}
                                                onClick={() => handleAnswerChange(question._id, answer)}
                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    label={answer}
                                                    checked={answers[question._id]?.includes(answer) || false}
                                                    onChange={() => handleAnswerChange(question._id, answer)}
                                                    style={{ display: 'none' }}
                                                    id={`answer-${question._id}-${idx}`}
                                                />
                                                <span>{answer}</span> {/* Label displayed for the answer */}
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))}
                        <Button variant="danger" className="mt-4" type="submit">Finish Quiz</Button>
                    </Form>
                )}
            </Container>

            <ModalResultQuizz
                show={showModalResult}
                setShow={setShowModalResult}
                dataResult={{
                    countTotal: results.length,
                    countCorrect: correctCount,
                }}
            />
        </div>
    );
};

export default Quiz;
