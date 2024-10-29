import { useEffect, useState } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getMemberByClassId, ApiRemoveStudentInClass } from "../../../service/ApiService";
import { HiStatusOnline } from "react-icons/hi";
import { useSocketContext } from "../../../context/SocketContext";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const StudentsClass = () => {
    const { classId } = useParams();
    const [members, setMembers] = useState({ teacher: {}, students: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { onlineUsers } = useSocketContext();
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const userId = useSelector((state) => state.user.account.id);

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

    const handleRemoveStudent = async () => {
        if (!selectedStudent) return;

        try { 
            const response = await ApiRemoveStudentInClass(classId, selectedStudent._id);     
            if (response && response.errorCode === 0) {
                toast.success(response.message)
                setShowConfirm(false);
                handleGetMember();
            } else {
                alert("Failed to remove student.");
            }
        } catch (error) {
            console.error("Error removing student:", error);
            alert("An error occurred while removing the student.");
        }
    };

    const confirmRemoveStudent = (student) => {
        setSelectedStudent(student);
        setShowConfirm(true);
    };

    if (loading) return <p>Loading members data...</p>;
    if (error) return <p>{error}</p>;

    const allMembers = [members.teacher, ...members.students];
    const totalMembers = allMembers.length;

    return (
        <>
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
                                
                                <div>
                                    <span>{member._id === members.teacher._id ? 'Teacher' : 'Student'}</span>
                                    {(member._id !== members.teacher._id )&&(userId === members.teacher._id)&& (
                                        <Button variant="danger" size="sm" onClick={() => confirmRemoveStudent(member)}>
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove {selectedStudent?.username} from this class?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleRemoveStudent}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default StudentsClass;
