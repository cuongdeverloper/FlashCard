import { useNavigate } from "react-router-dom";
import UseConversation from "./zustand/UseConversation";
import { Card } from "react-bootstrap";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = UseConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const navigate = useNavigate();
    
    const handleCardClick = (conversation) => {
        setSelectedConversation(conversation);
        navigate(`${conversation._id}`);
    };

    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id); // Fixed typo here

    return (
        <>
            <Card
                className={`mb-2 cursor-pointer ${isSelected ? "bg-primary text-white" : ""}`}
                onClick={() => handleCardClick(conversation)}
            >
                <Card.Body className="d-flex align-items-center">
                    <div className="avatar me-3 position-relative"> {/* Added position-relative */}
                        <img
                            src={conversation.image}
                            alt='user avatar'
                            className='rounded-circle'
                            style={{ height: '100px', width: '100px' }}
                        />
                        {isOnline && (
                            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle" style={{ width: '20px', height: '20px' }} />
                        )}
                    </div>

                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className='mb-0'>{conversation.username}</p>
                            <span className='fs-4'>{emoji}</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    );
};

export default Conversation;
