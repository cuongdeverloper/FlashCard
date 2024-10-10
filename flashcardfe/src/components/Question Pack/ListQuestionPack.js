import { Button, Card, Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuestionPack, getUserByUserId } from "../../service/ApiService";
import {  useSelector } from 'react-redux';
import "./ListQuestionPack.scss";
import MyClass from "../Myclass-homepage/myclass";
import Footer from "../footer/footer";
import Banner from "../Banner/banner";

const ListQuestionPack = () => {
  const [questionPackData, setQuestionPackData] = useState([]);
  const [userNames, setUserNames] = useState({});
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const fetchQuestionPacks = async () => {
    const response = await getAllQuestionPack();
    if (response && response.errorCode === 0) {
      setQuestionPackData(response.data);
      const userNames = {};
      await Promise.all(
        response.data.map(async (pack) => {
          if (pack.teacher && pack.teacher._id) {
            const userResponse = await getUserByUserId(pack.teacher._id);
            userNames[pack.teacher._id] = userResponse.data.username;
          } else {
            userNames[pack.teacher ? pack.teacher._id : "unknown"] = "Unknown";
          }
        })
      );
      setUserNames(userNames);
    }
  };

  useEffect(() => {
    fetchQuestionPacks();
  }, []);

  // Create slides in groups of 3
  const slides = [];
  for (let i = 0; i < questionPackData.length; i += 3) {
    slides.push(questionPackData.slice(i, i + 3));
  }

  return (
    
    <div className="ListQuestionPack-container">
      <h2 className="questionpack-h2">Flashcard</h2>
      {questionPackData.length > 0 ? (
        <Carousel
          id="questionPackCarousel"
          interval={3000}
          controls
          indicators={false}
        >
          {slides.map((slide, slideIndex) => (
            <Carousel.Item key={slideIndex}>
              <div className="row">
                {slide.map((pack) => (
                  <div className="col-md-4" key={pack._id}>
                    <Card
                      className="mb-3"
                      style={{   backgroundColor: "#1E1E40",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                      onClick={() => {
                        navigate(`/detailquespack/${pack._id}`, {
                          state: {
                            packName: pack.title,
                            packImagePreview: pack.imagePreview,
                            packSemester: pack.semester,
                          },
                        });
                      }}
                    >
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <Card.Img src={pack.imagePreview} alt={pack.name} />
                        </div>
                        <div className="col-md-8">
                          <Card.Body>
                            <h5
                              className="card-title"
                              style={{ color: "White" }}
                            >
                              {pack.title}
                            </h5>

                            <div className="price">
                              <span className="user-name">
                                {userNames[pack.teacher?._id] || "Loading..."}
                              </span>
                              <button className="btn btn-secondary btn-queslength">
                                {pack.questions.length} Flashcard
                              </button>
                            </div>
                          </Card.Body>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>No question packs available.</p>
      )}
      <Banner></Banner>
      {isAuthenticated ? <MyClass /> : <div></div>}
     
      <Footer></Footer>
    </div>
  );
};

export default ListQuestionPack;
