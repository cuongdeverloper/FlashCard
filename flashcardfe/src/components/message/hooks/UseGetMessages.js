import { useEffect, useState } from "react";
import UseConversation from "../zustand/UseConversation";
import { toast } from "react-toastify";
import { getMessagesApi } from "../../../service/ApiService";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = UseConversation();
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await getMessagesApi(selectedConversation._id)
				console.log(res)
				setMessages(res);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;