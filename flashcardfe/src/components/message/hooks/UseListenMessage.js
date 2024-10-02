import { useEffect } from "react";
import Soundss from "../../../components/sound/Soundss.mp3"; // Corrected asset path
import UseConversation from "../zustand/UseConversation";
import { useSocketContext } from "../../../context/SocketContext";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = UseConversation();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            // Check if the new message already exists in the messages array
            if (!messages.find(msg => msg._id === newMessage._id)) {
                // Set shouldShake property to trigger animation
                newMessage.shouldShake = true;

                // Play notification sound
                const sound = new Audio(Soundss);
                sound.play().catch(error => console.error("Error playing sound:", error));

                // Update messages state
                setMessages(prevMessages => [...prevMessages, newMessage]);
            }
        };

        // Listen for new messages
        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]);

};

export default useListenMessages;
