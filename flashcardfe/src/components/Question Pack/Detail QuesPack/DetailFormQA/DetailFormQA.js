import { useState, useEffect } from "react";
import "./DetailFormQA.scss";

const DetailFormQA = (props) => {
  const { dataQuestion, currentQuestionIndex, isAnimating } = props;
  const [isFlipped, setIsFlipped] = useState(false); // Track if flashcard is flipped

  useEffect(() => {
    setIsFlipped(false); 
  }, [currentQuestionIndex]);

  useEffect(() => {
    console.log(dataQuestion);
  }, [dataQuestion]);

  // Toggle flip state
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container">
      {dataQuestion && dataQuestion.length > 0 ? (
        <div
          className={`flashcard ${isFlipped ? "flipped" : ""} ${isAnimating ? "animating" : ""}`} // Add animation class
          onClick={handleCardClick}
        >
          <div className="flashcard-front">
            <p>{dataQuestion[currentQuestionIndex].questionText}</p>
            {dataQuestion[currentQuestionIndex].questionImage && (
              <img
                src={dataQuestion[currentQuestionIndex].questionImage}
                alt="Question"
                style={{ height: "80%", width: "auto" }}
              />
            )}
          </div>
          <div className="flashcard-back">
            {dataQuestion[currentQuestionIndex].correctAnswers &&
              dataQuestion[currentQuestionIndex].correctAnswers.length > 0 ? (
                <ul>
                  {dataQuestion[currentQuestionIndex].correctAnswers.map(
                    (correctAnswerIndex, idx) => (
                      <li key={idx}>
                        {dataQuestion[currentQuestionIndex].answers[correctAnswerIndex]}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>No correct answers available</p>
              )}
          </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default DetailFormQA;
