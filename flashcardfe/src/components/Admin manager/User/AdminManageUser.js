import { useEffect, useState } from "react";
import { getAllUserAdm } from "../../../service/ApiService"
import { Button, Pagination } from "react-bootstrap";

const AdminManageUser = () =>{
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const resultsPerPage = 7;
    const getAllUser = async() =>{
        let response = await getAllUserAdm();
        setResults(response.data)
        console.log(response)
    }
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

    useEffect(()=>{
        getAllUser()
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
                  <th>Email</th>
                  <th>User Name</th>
                  <th>type</th>
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
                        // onClick={() => handleViewDetails(result)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="warning"
                        // onClick={() => handleViewDetails(result)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        // onClick={() => handleViewDetails(result)}
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
export default AdminManageUser