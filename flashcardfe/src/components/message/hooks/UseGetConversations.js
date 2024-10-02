import { useEffect, useState } from "react";
import { getAllUserApi } from "../../../service/ApiService";
import { toast } from "react-toastify";

const UseGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await getAllUserApi();
				console.log(res)
				
				setConversations(res.data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default UseGetConversations;