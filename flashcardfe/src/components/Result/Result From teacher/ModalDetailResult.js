import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalDetailResults = () => {
  const location = useLocation();
  const { result, examId } = location.state || {}; // Nhận dữ liệu từ state

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Result Details</h2>
      {result ? (
        <div className="card">
          <div className="card-body">
            
            <p><strong>Student Name:</strong> {result.student.username}</p>
            <p><strong>Score:</strong> {result.score}</p>
            <h5>Answers:</h5>
            <ul>
              {result.answers.map((answer, idx) => (
                <li key={idx}>
                  <p><strong>Question ID:</strong> {answer.questionId}</p>
                  <p><strong>Selected Answers:</strong> {answer.selectedAnswers.join(", ")}</p>
                  <p><strong>Is Correct:</strong> {answer.isCorrect ? "Yes" : "No"}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          No result details available
        </div>
      )}
    </div>
  );
};

export default ModalDetailResults;
