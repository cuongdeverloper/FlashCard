import { useState } from "react";
import { useSelector } from "react-redux";
import UseConversation from "./zustand/UseConversation";
import { extractTime } from "./extractTime/extractTime";


const Message = ({ message }) => {
    const [showTime, setShowTime] = useState(false);  // State để điều khiển việc hiển thị thời gian
    const authUser = useSelector(state => state.user.account);
    const { selectedConversation } = UseConversation();
    const fromMe = message.sender === authUser.id;
    const formattedTime = extractTime(message.createdAt);
    const profilePic = fromMe ? authUser.image : selectedConversation?.image;

    // Hàm xử lý khi click vào tin nhắn
    const handleClick = () => {
        setShowTime(prevState => !prevState);  // Toggle trạng thái hiển thị thời gian
    };

    return (
        <div className="message-container" onClick={handleClick}> {/* Thêm sự kiện onClick */}
            <div className={`d-flex ${fromMe ? "justify-content-end" : "justify-content-start"} mb-2`}>
                {!fromMe && (
                    <div className="avatar me-2">
                        <img
                            alt='User avatar'
                            src={profilePic}
                            className="rounded-circle"
                            style={{ height: '40px', width: '40px' }}
                        />
                    </div>
                )}
                <div className={`p-2 rounded text-white ${fromMe ? "bg-primary" : "bg-secondary"}`}>
                    {message.content}
                </div>
                {fromMe && (
                    <div className="avatar ms-2">
                        <img
                            alt='User avatar'
                            src={profilePic}
                            className="rounded-circle"
                            style={{ height: '40px', width: '40px' }}
                        />
                    </div>
                )}
            </div>
            {showTime && (  // Hiển thị thời gian khi state showTime là true
                <div 
                    className={`text-muted small ${fromMe ? "text-end" : "text-start"} mt-1`}
                    style={{ color: "#b0b3b8", fontSize: "12px", fontWeight: "400" }} 
                >
                    {formattedTime}
                </div>
            )}
        </div>
    );
};

export default Message;
