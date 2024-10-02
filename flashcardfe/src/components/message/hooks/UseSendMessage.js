import { useState } from "react";
import UseConversation from "../zustand/UseConversation";
import { toast } from "react-toastify";
import { sendMess } from "../../../service/ApiService";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = UseConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
            const res = await sendMess(selectedConversation._id, message); 
            console.log(res)		
			setMessages([...messages, res]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;