import { useEffect } from "react";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ApiRemoveClass } from "../../../service/ApiService";
import { toast } from "react-toastify";

const Actions = () => {
    const { classId } = useParams();
    const navigate = useNavigate()
    const handleRemoveClass = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this class?");
        
        if (confirmDelete) {
            try {
                const response = await ApiRemoveClass(classId);
                if(response && response.errorCode === 0){
                    toast.success(response.message);
                    navigate('/')
                }
              
            } catch (error) {
                alert("An error occurred while removing the class.");
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <button onClick={handleRemoveClass}>Remove Class</button>
        </div>
    );
};

export default Actions;
