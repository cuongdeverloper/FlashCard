import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "./hooks/UseGetMessages";
import MessageSkeleton from "./skeletons/MessageSkeletons";
import "./css/Messages.scss"

const Messages = () => {
    const { messages, loading } = useGetMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        // Smooth scroll to the last message when messages update
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto ms'>
            {loading && (
                [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
            )}
            
            {!loading && messages.length === 0 && (
                // Show a message if there are no messages
                <p className='text-center'>Send a message to start the conversation</p>
            )}

            {!loading && Array.isArray(messages) && messages.length > 0 && (
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))
            )}
        </div>
    );
};

export default Messages;
