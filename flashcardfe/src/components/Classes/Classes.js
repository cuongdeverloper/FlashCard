import { useEffect, useState } from "react";
import { getClassByClassId } from "../../service/ApiService";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import './Classes.scss';
import { Container, Row, Col, Button, Nav, Navbar, Modal } from 'react-bootstrap';

const Classes = () => {
    const [dataClass, setDataClass] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [listQp, setListQp] = useState([]);
    const [idTeacher, setIdTeacher] = useState('');
    const [idClass, setIdClass] = useState('');
    const params = useParams();
    const classId = params.classId;
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleGetClassesByClassId = async () => {
        try {
            setLoading(true);
            const response = await getClassByClassId(classId);
            if (response && response.errorCode === 0) {
                setDataClass(response.data);
                setIdClass(response.data._id);
                setIdTeacher(response.data.teacher._id);
                setListQp(response.data.questionPacks || []);
            } else {
                setError("Failed to fetch class data.");
            }
        } catch (err) {
            console.error('Error fetching class:', err);
            setError("An error occurred while fetching the class.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(dataClass.invitationLink)
            .then(() => {
                alert("Link copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    useEffect(() => {
        handleGetClassesByClassId();
    }, [classId, navigate]);

    if (loading) {
        return <p>Loading class data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Container className="Classes-container">
                <Row className="header-banner bg-light py-4">
                    <Col>
                        <h3 className="mb-2">Bắt đầu một hoạt động trong lớp</h3>
                        <p>Giúp học sinh của bạn nắm bắt tài liệu học bằng các hoạt động trong lớp</p>
                    </Col>
                    <Col className="text-end">
                        <Button variant="danger" className="close-button">X</Button>
                    </Col>
                </Row>

                <Row className="class-info my-4">
                    <Col>
                        <p><i className="icon-location"></i> {dataClass.name}</p>
                    </Col>
                </Row>

                <Row>
                    <Navbar bg="primary" variant="dark" className="w-100">
                        <Nav className="mx-auto">
                            <Nav.Link onClick={() => {
                                if (listQp.length > 0) {
                                    navigate('documents', {
                                        state: {
                                            listQp: listQp,
                                            idTeacher: idTeacher,
                                            idClass: idClass,
                                        }
                                    });
                                } else {
                                    console.error("No question packs available.");
                                }
                            }}>Tài liệu học</Nav.Link>

                            <Nav.Link onClick={() => navigate('students')}>Members</Nav.Link>
                            <Nav.Link onClick={() => navigate('actions')}>Actions</Nav.Link>
                            <Nav.Link href="#progress">
                                Progress <span className="locked-icon">&#x1F512;</span>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </Row>

                <hr />

                <Row className="class-actions text-center my-3">
                    <Col>
                        <Button variant="outline-primary" className="google-invite mx-2">Invite Google</Button>
                        <Button variant="outline-secondary" className="email-invite mx-2">Invite email</Button>
                        <Button variant="primary" onClick={handleShow} className="copy-link mx-2">Copy link invite</Button>
                    </Col>
                </Row>

                {/* Modal invite */}
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Invite to class</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <span className="invitation-link">{dataClass.invitationLink}</span>
                            <Button variant="primary" onClick={copyToClipboard} className="copy-button">
                                Copy Link
                            </Button>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <Outlet />
        </>
    );
};

export default Classes;
