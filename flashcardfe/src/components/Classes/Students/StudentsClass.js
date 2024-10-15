import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getMemberByClassId } from "../../../service/ApiService";
import { HiStatusOnline } from "react-icons/hi";
import { useSocketContext } from "../../../context/SocketContext";

const StudentsClass = () => {
    const { classId } = useParams();
    const [members, setMembers] = useState({ teacher: {}, students: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { onlineUsers } = useSocketContext();
    useEffect(() => {
        handleGetMember();
    }, []);

    const handleGetMember = async () => {
        try {
            setLoading(true);
            const response = await getMemberByClassId(classId);
            if (response && response.errorCode === 0) {
                setMembers(response.data);
            } else {
                setError("Failed to fetch members data.");
            }
        } catch (err) {
            console.error('Error fetching members:', err);
            setError("An error occurred while fetching the members.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading members data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const allMembers = [members.teacher, ...members.students];
    const totalMembers = allMembers.length;

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    Members ({totalMembers}) 
                </Accordion.Header>
                <Accordion.Body>
                    {allMembers.map((member, index) => (
                        <div key={member._id || index} style={{ marginBottom: "10px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {member.image && (
                                    <img
                                        src={member.image}
                                        alt={member.username}
                                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                    />
                                )}
                                <div>
                                    <strong>{member.username}
                                        {onlineUsers.includes(member._id) && (
                                            <HiStatusOnline style={{ color: 'green', marginLeft: '10px' }} />
                                        )}
                                    </strong>
                                    <p>Email: {member.email}</p>
                                </div>
                            </div>
                            
                            <span>{member._id === members.teacher._id ? 'Teacher' : 'Student'}</span>
                        </div>
                    ))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default StudentsClass;
