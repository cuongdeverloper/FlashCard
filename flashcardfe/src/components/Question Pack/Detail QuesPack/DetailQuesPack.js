import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getQuestionByQPId, getQuizByQuizId, getUserByUserId, searchItems } from "../../../service/ApiService";
import "./DetailQuesPack.scss";
import DetailFormQA from "./DetailFormQA/DetailFormQA";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight, FaShareAlt, FaSave, FaEllipsisH } from "react-icons/fa";
import { Breadcrumb, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DetailQuesPack = () => {
  const params = useParams();
  const userId = useSelector(state => state.user.account.id);

  const [dataQuestion, setDataQuestion] = useState([]);
  const [idQp,setIdQp] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dataAuthor, setDataAuthor] = useState(null);
  const [idAuthor, setIdAuthor] = useState('');
  const [semester,setSemester]=useState('');
  const [title,setTitle] = useState('');
  const [idQuiz,setIdQuiz] = useState('');

  const location = useLocation();
  const navigate = useNavigate()
  const getQuestionByQuestionPack = async () => {
    try {
      let response = await getQuestionByQPId(params.packId);
      if(response && response.errorCode === 2 ){
        navigate('/forbidden')
      }
      if (response && response.errorCode === 0) {
       
        setDataQuestion(response.data.questions);
        setSemester(response.data.semester)
        setTitle(response.data.title)
        setIdQp(response.data._id)
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
 const getQuizIdHandle = async() =>{
    if(idQp){
      let response = await getQuizByQuizId(idQp);
      if(response){
        setIdQuiz(response?.exam?._id)
      }
      
    }
 }
 useEffect(()=>{
  getQuizIdHandle()
 },[idQp])
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
const searchBreadcum = async()=>{
  const response = await searchItems(semester);
  const results = response.data;
  navigate("/search", { state: { results, query: semester } });

}
const handleNavigateRs = ()=>{
  if(idQuiz){
    navigate(`/result/${idQuiz}`)
  } else{
    toast.warning('no quiz yet')
  }
}
const handleNavigateQuiz = ()=>{
  if(idQp){
    navigate(`/quiz/${idQp}`)
  } else{
    toast.warning('no quiz yet')
  }
}
  return (
    <div className="DetailQuesPack-container row">
      <div className="DetailQP-content container-fluid col-9">
        <Breadcrumb className="breadcrumbitem" style={{color:'#fff'}}>
          <Breadcrumb.Item href="/" className="breadCrumb-href">Home</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() =>searchBreadcum()} className="breadCrumb-href semester">
            {semester || "Unknown Semester"}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="disable-pack"active>
            <h6>{title || "Unknown Pack"}</h6>
            
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button className="btn btn-secondary" onClick={handleNavigateQuiz}>Do quiz</Button>
        {(userId === idAuthor) && <Button className="btn btn-secondary" onClick={handleNavigateRs }>Get result</Button>
      }
        <DetailFormQA
          dataQuestion={dataQuestion}
          currentQuestionIndex={currentQuestionIndex}
          isAnimating={isAnimating} 
          idAuthor={idAuthor}
          dataAuthor={dataAuthor}
          idQp = {idQp}
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
