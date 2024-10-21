import { useEffect, useState } from "react";
import { getAllUserAdm } from "../../../service/ApiService";
import { Button, Dropdown, Pagination, Form } from "react-bootstrap";
import ModalPreviewUserAdm from "./Modal Preview user/ModalPreviewUserAdm";
import ModalUpdateUserAdm from "./Modalupdate/ModalUpdateUserAdm";
import ModalDeleteUserAdm from "./Modal delete user/ModalDeleteUserAdm";

const AdminManageUser = () => {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]); // For search filtering
    const [currentPage, setCurrentPage] = useState(1);
    const [showPreview, setShowPreview] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState(""); // Search term state

    const resultsPerPage = 7;

    const getAllUser = async () => {
        let response = await getAllUserAdm();
        setResults(response.data);
        setFilteredResults(response.data); // Set initial filtered results
    };

    // Pagination logic
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult); // Use filteredResults
    const totalPages = Math.ceil(filteredResults.length / resultsPerPage); 

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

    const handlePreviewUser = (user) => {
        setSelectedUser(user);
        setShowPreview(true);
    };

    const handleUpdateUser = (user) => {
        setSelectedUser(user);
        setShowUpdate(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDelete(true);
    };

    const sortResults = (field) => {
        const sortedResults = [...filteredResults]; // Sort filteredResults
        const order = sortOrder === "asc" ? 1 : -1;

        sortedResults.sort((a, b) => {
            const fieldA = a[field] || ""; // Default to empty string if undefined
            const fieldB = b[field] || ""; // Default to empty string if undefined

            if (fieldA > fieldB) return order;
            if (fieldA < fieldB) return -order;
            return 0;
        });

        setFilteredResults(sortedResults); // Set sorted filtered results
        setSortField(field);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    };

    // Search functionality
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term) {
            const filtered = results.filter((user) =>
                user.email.toLowerCase().includes(term) ||
                user.username.toLowerCase().includes(term)
            );
            setFilteredResults(filtered);
        } else {
            setFilteredResults(results);
        }
        setCurrentPage(1); 
    };

    useEffect(() => {
        getAllUser();
    }, []);

    return (
        <>
            <div className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by email or username"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {currentResults.length > 0 ? (
                <div>
                    <div className="card-body">
                        <div className="mb-3">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Sort By
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => sortResults("email")}>
                                        Email
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => sortResults("username")}>
                                        User Name
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => sortResults("type")}>
                                        Type
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => sortResults("balance")}>
                                        Balance
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Id</th>
                                    <th>Email</th>
                                    <th>User Name</th>
                                    <th>Type</th>
                                    <th>Balance</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentResults.map((result, index) => (
                                    <tr key={result._id}>
                                        <td>{indexOfFirstResult + index + 1}</td>
                                        <td>{result._id}</td>
                                        <td>{result.email}</td>
                                        <td>{result.username}</td>
                                        <td>{result.type}</td>
                                        <td>{result.balance}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() => handlePreviewUser(result)}
                                            >
                                                View Details
                                            </Button>
                                            <Button
                                                variant="warning"
                                                onClick={() => handleUpdateUser(result)}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeleteUser(result)}
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
                    <button className="btn btn-primary">{filteredResults?.length} users</button>
                </div>
            ) : (
                <div className="alert alert-warning" role="alert">
                    No results available
                </div>
            )}

            <ModalPreviewUserAdm
                show={showPreview}
                setShow={setShowPreview}
                user={selectedUser}
            />
            <ModalUpdateUserAdm
                user={selectedUser}
                showUpdate={showUpdate}
                setShowUpdate={setShowUpdate}
                onSuccess={getAllUser}
            />
            <ModalDeleteUserAdm
                user={selectedUser}
                show={showDelete}
                setShow={setShowDelete}
                onSuccess={getAllUser}
            />
        </>
    );
};

export default AdminManageUser;
