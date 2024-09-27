import { useEffect, useState } from "react";
import { getClassByClassId } from "../../service/ApiService"; 
import { useParams } from "react-router-dom";
import './Classes.scss'
const Classes = () => {
    const [dataClass, setDataClass] = useState({});
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const params = useParams();
    const classId = params.classId;

    const handleGetClassesByClassId = async () => {
        try {
            setLoading(true); 
            const response = await getClassByClassId(classId);
            console.log(response);

            if (response && response.errorCode === 0) {
                setDataClass(response.data); 
            } else {
                setError("Failed to fetch class data.");
            }
        } catch (err) {
            console.error('Error fetching class:', err);
            setError("An error occurred while fetching the class.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        handleGetClassesByClassId(); 
    }, [classId]); 

    if (loading) {
        return <p>Loading class data...</p>; // Display loading state
    }

    if (error) {
        return <p>{error}</p>; // Display error message
    }

    return (
        <div className="Classes-container container">
            <h2>{dataClass.name}</h2>

        </div>
    );
};

export default Classes;
