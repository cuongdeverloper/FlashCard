import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestionPackByQuestionPackId, removeQpToClass } from "../../../service/ApiService";
import { Card, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaTrash } from 'react-icons/fa'; 
import { toast } from "react-toastify";
import ModalDeleteDocumentsClass from "./ModalDeleteDocumentsClass"; // Import the modal

const DocumentsClass = () => {
  const userAcc = useSelector(state => state.user.account.id);
  const location = useLocation();
  const listQp = location.state?.listQp || [];
  const idTeacher = location.state?.idTeacher;
  const idClass = location.state?.idClass;
  const navigate = useNavigate();
  const [dataQp, setDataQp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [selectedQp, setSelectedQp] = useState(null); // Store the selected question pack

  useEffect(() => {
    const fetchQuestionPacks = async () => {
      setLoading(true);
      try {
        const fetchPromises = listQp.map((questionPackId) =>
          getQuestionPackByQuestionPackId(questionPackId)
        );

        const responses = await Promise.all(fetchPromises);

        const fetchedData = responses
          .map((response, index) => {
            if (response && response.errorCode === 0) {
              return response.data;
            } else {
              console.error(`Failed to fetch question pack ID ${listQp[index]}`);
              return null;
            }
          })
          .filter((data) => data !== null);

        setDataQp(fetchedData);
        console.log(fetchedData);
      } catch (err) {
        console.error("Error fetching question packs:", err);
        setError("An error occurred while fetching the question packs.");
      } finally {
        setLoading(false);
      }
    };

    if (listQp.length > 0) {
      fetchQuestionPacks();
    } else {
      setLoading(false);
    }
  }, [listQp]);

  const handleRemoveQp = async () => {
    try {
      let response = await removeQpToClass(idClass, selectedQp);
      if (response && response.errorCode === 0) {
        toast.success(response.message);
        setDataQp((prevData) => prevData.filter(qp => qp._id !== selectedQp)); // Update the list
        setShowModal(false);
      }
    } catch (err) {
      console.error("Error removing question pack:", err);
    }
  };

  if (loading) {
    return <p>Loading question pack data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ color: "#fff" }}>
      {dataQp.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {dataQp.map((item) => (
            <li key={item._id}>
              <Card style={{ marginBottom: '15px' }}>
                <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{item.title}</span>
                  {idTeacher === userAcc && (
                    <FaTrash
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => {
                        setSelectedQp(item._id); // Set the selected question pack
                        setShowModal(true); // Show the modal
                      }}
                    />
                  )}
                </Card.Header>
                <Card.Body onClick={() => navigate(`/detailquespack/${item._id}`)}>
                  <Card.Title>
                    <Image style={{ height: '50px', width: '50px' }} src={item?.teacher?.image} roundedCircle />
                    {item?.teacher?.username}
                  </Card.Title>
                  <Card.Text>
                    Terminology: {item.questions.length} | Semester: {item.semester}
                  </Card.Text>
                  <Card.Text>
                    {item.createdAt}
                  </Card.Text>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p>No question packs available.</p>
      )}

      {/* Delete Confirmation Modal */}
      <ModalDeleteDocumentsClass
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={handleRemoveQp}
        itemTitle={dataQp.find(qp => qp._id === selectedQp)?.title}
      />
    </div>
  );
};

export default DocumentsClass;
