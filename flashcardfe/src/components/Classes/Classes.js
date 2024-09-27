import { useEffect, useState } from "react";
import { getClassByClassId } from "../../service/ApiService"; // Assuming the correct function name
import { useParams } from "react-router-dom";
import './Classes.scss'
const Classes = () => {
    const [dataClass, setDataClass] = useState({}); // Default to an empty object
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling
    const params = useParams();
    const classId = params.classId;

    const handleGetClassesByClassId = async () => {
        try {
            setLoading(true); // Start loading
            const response = await getClassByClassId(classId);
            console.log(response);

            // Check if the response is successful
            if (response && response.errorCode === 0) {
                setDataClass(response.data); // Set class data (adjust based on actual API response structure)
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
        handleGetClassesByClassId(); // Fetch class data on mount
    }, [classId]); // Add classId as dependency to handle changes

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
