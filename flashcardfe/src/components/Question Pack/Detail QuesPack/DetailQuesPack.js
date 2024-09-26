import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuestionByQPId, getUserByUserId } from "../../../service/ApiService";
import "./DetailQuesPack.scss";
import DetailFormQA from "./DetailFormQA/DetailFormQA";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight, FaShareAlt, FaSave, FaEllipsisH } from "react-icons/fa";
import { Breadcrumb } from "react-bootstrap";

const DetailQuesPack = () => {
  const params = useParams();
  const [dataQuestion, setDataQuestion] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dataAuthor, setDataAuthor] = useState(null);
  const [idAuthor, setIdAuthor] = useState('');
  const location = useLocation();

  const getQuestionByQuestionPack = async () => {
    try {
      let response = await getQuestionByQPId(params.packId);
      if (response && response.errorCode === 0) {
        setDataQuestion(response.data.questions);
        setIdAuthor(response.data.teacher);  
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getIn4Author = async (authorId) => {
    if (authorId) {
      try {
        let response1 = await getUserByUserId(authorId);
        setDataAuthor(response1.data);  
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getQuestionByQuestionPack();
  }, [params.packId]);

  useEffect(() => {
    if (idAuthor) {
      getIn4Author(idAuthor);
    }
  }, [idAuthor]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < dataQuestion.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnimating(false);
      }, 500);  // Sync with CSS animation duration
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsAnimating(false);
      }, 500);  // Sync with CSS animation duration
    }
  };

  return (
    <div className="DetailQuesPack-container row">
      <div className="DetailQP-content container-fluid col-9">
        <Breadcrumb className="breadcrumbitem" style={{color:'#fff'}}>
          <Breadcrumb.Item href="/" className="breadCrumb-href">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/us" className="breadCrumb-href semester">
            {location.state?.packSemester || "Unknown Semester"}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="disable-pack"active>
            <h6>{location.state?.packName || "Unknown Pack"}</h6>
            
          </Breadcrumb.Item>
        </Breadcrumb>
        <DetailFormQA
          dataQuestion={dataQuestion}
          currentQuestionIndex={currentQuestionIndex}
          isAnimating={isAnimating} 
          idAuthor={idAuthor}
          dataAuthor={dataAuthor}
        />
        <div className="flashcard-footer">
          <div
            onClick={handlePrevQuestion}
            className={`${currentQuestionIndex === 0 ? 'disabled' : ''} btn-hanldenextpre`}
          >
            <FaRegArrowAltCircleLeft />
          </div>
          <div className="index/total" style={{ margin: '0 10px', fontSize: '25px', letterSpacing: '6px', fontWeight: 600, color: '#fff' }}>
            <span>{currentQuestionIndex + 1}/{dataQuestion.length}</span>
          </div>
          <div
            onClick={handleNextQuestion}
            className={`${currentQuestionIndex === dataQuestion.length - 1 ? 'disabled' : ''} btn-hanldenextpre`}
          >
            <FaRegArrowAltCircleRight />
          </div>
        </div>

        <div className="DQP-author">
          {dataAuthor && (
            <>
              <img src={dataAuthor.image} alt="Author" />
              <div className="DQP-author-icons">
                <p>Author: <strong>{dataAuthor.username}</strong></p>
                <div className="DQP-author-icons">
                  <FaShareAlt className="icon" title="Share" />
                  <FaSave className="icon" title="Save" />
                  <FaEllipsisH className="icon" title="See More" />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="DQ-table-container">
          <h4>There are {dataQuestion.length} questions in this course.</h4>
          {dataQuestion.length > 0 && dataQuestion.map((item, index) => (
            <div key={index} className="DQ-table row">
              <div className="question-col col-3 question"><h5>{item.questionText}</h5></div>
              
              <div className="answer-col col-9">
                {item.correctAnswers.map((answerIndex, idx) => (
                  <div key={answerIndex} className="answer">
                    <h6>{item.answers[answerIndex]}</h6>
                    <h6>{idx < item.correctAnswers.length - 1 && <br />}</h6>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailQuesPack;
