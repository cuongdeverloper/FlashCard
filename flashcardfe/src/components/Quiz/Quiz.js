import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { getQuizByQuizId, postSubmitExam } from "../../service/ApiService";
import ModalResultQuizz from "./ModalFinishQuiz";
import { Pie } from "react-chartjs-2"; // Import Pie chart component
import "./Quiz.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ProgressBar } from "react-bootstrap"; // Thêm ProgressBar
import { IoIosClose } from "react-icons/io";

ChartJS.register(ArcElement, Tooltip, Legend);

const Quiz = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showModalResult, setShowModalResult] = useState(false);
  const [examId, setExamId] = useState("");
  const [timeLeft, setTimeLeft] = useState();
  const [progress, setProgress] = useState(0);
  const [noQuiz,setNoQuiz] = useState(false)
  const navigate = useNavigate();

  const totalDuration = quizData.duration || 0; // Tổng thời gian của quiz
  const progresstime = (timeLeft / totalDuration) * 100; // Tính phần trăm còn lại của thanh tiến trình

  const questionRefs = useRef([]);
  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !quizFinished) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 || quizFinished) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, quizFinished]);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const fetchQuiz = async () => {
    try {
      const response = await getQuizByQuizId(quizId);
      console.log(response)
      if(response.error) {
        setNoQuiz(true);
      } else {
        setNoQuiz(false)
      }
      
      setExamId(response.exam._id);
      setQuizData(response.exam);
      setTimeLeft(response.exam.duration);
    } catch (error) {
      setError("No quiz from here yet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const updateProgress = (updatedAnswers) => {
    const answeredQuestions = Object.values(answers).filter(
      (selectedAnswers) => selectedAnswers.length > 0
    ).length;
    const totalQuestions = quizData.questions.length;
    const progress = (answeredQuestions / totalQuestions) * 100;
    setProgress(progress);
    return answeredQuestions;
  };
  const answeredQuestionsCount = Object.values(answers).filter(
    (selectedAnswers) => selectedAnswers.length > 0
  ).length;

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionId] || [];
      let newAnswers = [];
      if (currentAnswers.includes(selectedAnswer)) {
        newAnswers = currentAnswers.filter(
          (answer) => answer !== selectedAnswer
        );
      } else {
        newAnswers = [...currentAnswers, selectedAnswer];
      }
      const updatedAnswers = {
        ...prevAnswers,
        [questionId]: newAnswers,
      };

      updateProgress(updatedAnswers);

      return updatedAnswers;
    });
  };
  useEffect(() => {
    if (quizData.questions?.length > 0) {
      updateProgress();
    }
  }, [answers, quizData.questions]);

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
      console.error("Error submitting the exam:", error);
    }
  };

  const scrollToQuestion = (index) => {
    questionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <div>Loading quiz...</div>;

  // Prepare data for Pie chart
  const correctCount = results.filter((r) => r.isCorrect).length;
  const incorrectCount = results.length - correctCount;

  const pieChartData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        label: "# of Answers",
        data: [correctCount, incorrectCount],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Correct color
          "rgba(255, 99, 132, 0.6)", // Incorrect color
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };
  const handleClose = () => {
    const userConfirmed = window.confirm("Are you sure you want to exit the quiz?");
    if (userConfirmed) {
      navigate(-1);
    }
  };

  return (
   <>
     {noQuiz ? 'No Quiz yet' : <>
  
  <header className="quiz-header">
    <h2>Kiểm Tra: {quizData.title}</h2>
    <IoIosClose
      className="close-button"
      onClick={handleClose}
    />
  </header>
  <div className="quiz-container d-flex">

    {quizStarted && (
      <>
        <div className="background-sidebar">
          <div className="quiz-left-sidebar">
            <div className="quiz-progressbar">

              <ProgressBar
                now={progresstime}
                label={`${Math.floor(progresstime)}%`}
              />


              <span className="quiz-timer">
                Time left: {formatTime(timeLeft)}
              </span>
            </div>
            <ul className="question-list">
              {quizData.questions?.map((_, index) => {
                const result = results.find(
                  (r) => r.questionId === quizData.questions[index]._id
                );
                // Kiểm tra xem câu hỏi đã được trả lời và đúng hay sai
                const isAnswered =
                  answers[quizData.questions[index]._id]?.length > 0;
                const statusClass = result
                  ? result.isCorrect
                    ? "correct"
                    : "incorrect"
                  : isAnswered
                    ? "answered"
                    : ""; // Thêm lớp answered nếu câu hỏi đã được trả lời nhưng chưa kiểm tra đúng/sai

                return (
                  <li
                    key={index}
                    className={`question-link ${statusClass}`} // Thêm các lớp CSS cho đúng/sai/đã trả lời
                    onClick={() => scrollToQuestion(index)}
                  >
                    {index + 1}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    )}

    {/* Main quiz content */}
    <Container
      className={`${quizStarted ? "quiz-content" : "quiz-notstarted"}`}
    >
      {!quizStarted ? (
        <Row className="d-flex justify-content-center">
          <Col md="auto" className="text-center text-notst">
            <p>{quizData.instructions}</p>
            <p>Time: {quizData.duration} m</p>
            <Button variant="primary" onClick={() => setQuizStarted(true)}>
              Start Quiz
            </Button>
          </Col>
        </Row>
      ) : quizFinished ? (
        <div className="quiz-finish">
          <h3>Quiz Completed!</h3>
          {results.map((result, index) => (
            <div
              key={index}
              className={`result-item ${result.isCorrect ? "correct" : "incorrect"
                }`}
              ref={(el) => (questionRefs.current[index] = el)}
            >
              <h4>
                {index + 1}. {result.questionText}
              </h4>
              <p>Your Answer: {result.selectedAnswers.join(", ")}</p>
              {!result.isCorrect && (
                <p>Correct Answer: {result.correctAnswers.join(", ")}</p>
              )}
            </div>
          ))}
          {/* Display the Pie chart */}
          <div className="chart-container mt-4">
            <h3>Quiz Analys</h3>
            <Pie className='result-piechart' data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      ) : (
        <>
          <div className="question-status">
            {answeredQuestionsCount} / {quizData.questions.length} câu đã
            trả lời
          </div>
          <ProgressBar
            className="answers-progress"
            now={progress}
            label={`${Math.floor(progress)}%`}
          />

          <Form onSubmit={handleSubmit}>
            {quizData.questions.map((question, index) => (
              <div
                key={index}
                className="question-section"
                ref={(el) => (questionRefs.current[index] = el)}
              >
                <div className="question-section-qs">
                  <h7>Question</h7>
                  <h4>
                    {index + 1}. {question.questionText}
                  </h4>
                </div>

                <Row>
                  <h7>Answers</h7>
                  {question.answers.map((answer, idx) => (
                    <Col md={6} key={idx}>
                      <div
                        className={`answer-option ${answers[question._id]?.includes(answer)
                            ? "selected"
                            : ""
                          }`}
                        onClick={() =>
                          handleAnswerChange(question._id, answer)
                        }
                      >
                        <Form.Check
                          type="checkbox"
                          label={answer}
                          checked={
                            answers[question._id]?.includes(answer) || false
                          }
                          onChange={() =>
                            handleAnswerChange(question._id, answer)
                          }
                          style={{ display: "none" }}
                          id={`answer-${question._id}-${idx}`}
                        />
                        <span>{answer}</span>{" "}
                        {/* Label displayed for the answer */}
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
            <div className="quiz-footer">
              <span className="quiz-timer">
                Time left: {formatTime(timeLeft)}
              </span>
              <h4>All finish, you ready send result quiz!!</h4>
              <Button
                variant="danger"
                className="mt-4 quiz-button-submit"
                type="submit"
              >
                Finish Quiz
              </Button>
            </div>
          </Form>
        </>
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
</>}
   </>
    
  );
};

export default Quiz;
