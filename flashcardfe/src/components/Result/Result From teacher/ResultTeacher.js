import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllResultsByTeacher } from "../../../service/ApiService";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination, Button } from 'react-bootstrap';

const ResultTeacher = () => {
  const params = useParams();
  const navigate = useNavigate(); // For navigation
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const resultsPerPage = 7; // Số kết quả trên mỗi trang

  useEffect(() => {
    getRsTeacher();
  }, [navigate]);

  const getRsTeacher = async () => {
    try {
      let response = await getAllResultsByTeacher(params.examId);
      if (response && response.success) {
        setResults(response.results);
        console.log(response.results);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

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

  // Hàm điều hướng đến chi tiết kết quả, truyền dữ liệu qua state
  const handleViewDetails = (result) => {
    navigate(`/modal-detail-results/${result._id}`, { state: { result } });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Exam Results</h2>
      {currentResults.length > 0 ? (
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentResults.map((result, index) => (
                  <tr key={result._id}>
                    <td>{indexOfFirstResult + index + 1}</td>
                    <td>{result.student.username}</td>
                    <td>{result.score}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleViewDetails(result)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Phân trang */}
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
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          No results available
        </div>
      )}
    </div>
  );
};

export default ResultTeacher;
