import { useEffect } from "react";
import MessageInput from "./MessageInput";
import UseConversation from "./zustand/UseConversation";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import "./css/UserMessage.scss"

const UserMessage = () => {
    const { selectedConversation, setSelectedConversation } = UseConversation();

    useEffect(() => {
        console.log("Selected conversation:", selectedConversation);
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className='md:min-w-[450px] flex flex-col usmessage-container'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
<div className='to-container'>
    <div className="avatar me-2">
        <img
            src={selectedConversation?.image}
            alt="User avatar"
            className="rounded-circle"
            style={{ height: '40px', width: '40px' }}
        />
    </div>

        <span className='username'>{selectedConversation?.username}</span>
  
</div>

                    <Messages conversationId={selectedConversation.id} />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default UserMessage;

const NoChatSelected = () => (
    <div className='flex items-center justify-center w-full h-full noselect'>
        <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2 '>
            <p className="text-white">Select a chat to start messaging</p>
            <TiMessages className='text-3xl md:text-6xl text-center text-white' />
        </div>
    </div>
);
