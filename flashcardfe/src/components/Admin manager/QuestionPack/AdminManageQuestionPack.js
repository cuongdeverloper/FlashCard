import { useEffect, useState } from "react";
import { ApiDeleteQuestionPack, getAllQpByAdmin } from "../../../service/ApiService";
import { Button, Dropdown, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalDeleteQuestionPackAdm from "./ModalDeleteQuestionPackAdm";
import { toast } from "react-toastify";

const AdminManageQuestionPack = () => {
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedQuestionPack, setSelectedQuestionPack] = useState(null);
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    
    const resultsPerPage = 7;

    const getQuestionPackApi = async () => {
        let response = await getAllQpByAdmin();
        setResults(response.data);
        console.log(response);
    };

    const navigate = useNavigate();
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(results.length / resultsPerPage); 

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePreviewQp = (qp) => {
        navigate(`/detailquespack/${qp._id}`);
    };

    const handleConfirmDelete = async () => {
        if (selectedQuestionPack) {
            let response = await ApiDeleteQuestionPack(selectedQuestionPack._id);
            console.log(response);
            if (response && response.errorCode === 0) {
                toast.success(response.message);
                setShowDelete(false);
                getQuestionPackApi();
            }
        }
    };

    const handleDeleteQp = (qp) => {
        setSelectedQuestionPack(qp); 
        setShowDelete(true); 
    };

    const sortResults = (field) => {
        let sortedResults = [...results];
        const order = sortOrder === "asc" ? 1 : -1;

        sortedResults.sort((a, b) => {
            // Handle teacher property being null
            const fieldA = (field === "teacher") ? (a.teacher ? a.teacher.email : "") : a[field];
            const fieldB = (field === "teacher") ? (b.teacher ? b.teacher.email : "") : b[field];

            if (fieldA > fieldB) {
                return order;
            } else if (fieldA < fieldB) {
                return -order;
            }
            return 0;
        });

        setResults(sortedResults);
        setSortField(field);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // toggle sort order
    };

    useEffect(() => {
        getQuestionPackApi();
    }, []);

    return (
        <>
            {currentResults.length > 0 ? (
                <div>
                    <div className="card-body">
                        <div className="mb-3">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Sort By
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => sortResults("semester")}>
                                        Semester
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => sortResults("teacher")}>
                                        Teacher
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Subject</th>
                                    <th>Semester</th>
                                    <th>Is Public</th>
                                    <th>Teacher</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentResults.map((result, index) => (
                                    <tr key={result._id}>
                                        <td>{indexOfFirstResult + index + 1}</td>
                                        <td>{result?._id}</td>
                                        <td>{result?.title}</td>
                                        <td>{result?.subject}</td>
                                        <td>{result?.semester}</td>
                                        <td>{result?.isPublic ? 'Public' : 'Not Public'}</td>
                                        <td>{result?.teacher?.email || 'N/A'}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() => handlePreviewQp(result)}
                                            >
                                                View Details
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeleteQp(result)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination */}
                        <Pagination>
                            <Pagination.Prev
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            />
                            {[...Array(totalPages).keys()].map((page) => (
                                <Pagination.Item
                                    key={page + 1}
                                    active={page + 1 === currentPage}
                                    onClick={() => paginate(page + 1)}
                                >
                                    {page + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </div>
                    <button className="btn btn-primary">{results?.length} questionpacks</button>

                </div>
            ) : (
                <div className="alert alert-warning" role="alert">
                    No results available
                </div>
            )}
            <ModalDeleteQuestionPackAdm 
                show={showDelete}
                setShow={setShowDelete}
                handleConfirmDelete={handleConfirmDelete}
            />
        </>
    );
};

export default AdminManageQuestionPack;
