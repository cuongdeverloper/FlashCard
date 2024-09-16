import { Button, Card, Carousel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllQuestionPack, getUserByUserId } from '../../service/ApiService';
import './ListQuestionPack.scss';

const ListQuestionPack = () => {
  const [questionPackData, setQuestionPackData] = useState([]);
  const [userNames, setUserNames] = useState({});
  const navigate = useNavigate();

  const fetchQuestionPacks = async () => {
    const response = await getAllQuestionPack();
    if (response && response.errorCode === 0) {
      setQuestionPackData(response.data);
      const userNames = {};
      await Promise.all(response.data.map(async (pack) => {
        if (pack.teacher && pack.teacher._id) {  // Check if pack.teacher and pack.teacher._id exist
          const userResponse = await getUserByUserId(pack.teacher._id);
          userNames[pack.teacher._id] = userResponse.data.username;
        } else {
          userNames[pack.teacher ? pack.teacher._id : 'unknown'] = 'Unknown';  // Default value if teacher._id is not available
        }
      }));
      setUserNames(userNames);
    }
  };

  useEffect(() => {
    fetchQuestionPacks();
  }, []);

  // Create slides in groups of 3
  const slides = questionPackData.reduce((acc, pack, index) => {
    if (index % 3 === 0) acc.push([]);
    acc[acc.length - 1].push(pack);
    return acc;
  }, []);

  return (
    <div className="ListQuestionPack-container">
      {questionPackData.length > 0 ? (
        <Carousel id="questionPackCarousel">
          {slides.map((group, idx) => (
            <Carousel.Item key={idx}>
              <div className="row">
                {group.map(pack => (
                  <div className="col-md-3" key={pack._id}>
                    <Card style={{ width: '100%' }}>
                      <span className="img-container"
                        onClick={() => {
                          navigate(`/detailquespack/${pack._id}`, {
                            state: {
                              packName: pack.title,
                              packImagePreview: pack.imagePreview,
                              packSemester: pack.semester
                            }
                          });
                        }}
                      >
                        <img className="preview" src={pack.imagePreview} alt={pack.name} />
                        {pack.previewImages && (
                          <img className="hover" src={pack.previewImages} alt={pack.name} />
                        )}
                      </span>
                      <Card.Body>
                        <Card.Title className="card-title">{pack.title}</Card.Title>
                        <Card.Text>
                          <span className="price">
                            <span className="user-name">
                              {userNames[pack.teacher?._id] || 'Loading...'}
                            </span>
                            <button className='btn btn-secondary btn-queslength'>{pack.questions.length} Terminology</button>
                          </span>
                        </Card.Text>
                        <Button variant="primary">Start</Button>
                      </Card.Body>
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
    </div>
  );
};

export default ListQuestionPack;
