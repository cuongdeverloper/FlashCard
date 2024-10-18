import { useEffect, useState } from "react"
import { getAllQpByAdmin } from "../../../service/ApiService"
import { Button, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminManageQuestionPack = () =>{
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 7;
    const getQuestionPackApi = async() =>{
        let response = await getAllQpByAdmin()
        setResults(response.data)
        console.log(response)
    }
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
    const handlePreviewQp = (qp) =>{
        navigate(`/detailquespack/${qp._id}`)
    }
    useEffect(()=>{
        getQuestionPackApi()
    },[])
    return(
        <>
           {currentResults.length > 0 ? (
        <div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Semester</th>
                  <th>Is public</th>
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
                    <td>{result?.isPublic ?'Public' : 'No public' }</td>
                    <td>{result?.teacher?.email}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handlePreviewQp(result)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="danger"
                        // onClick={() => handleDeleteUser(result)}
                      >
                        Delete
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
        </>
    )
}
export default AdminManageQuestionPack