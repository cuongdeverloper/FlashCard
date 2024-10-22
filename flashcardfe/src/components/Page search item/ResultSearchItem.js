import React, { useEffect } from "react";
import { Card } from "react-bootstrap"; // Import Card from Bootstrap
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import './ResultSearchItem.scss';

const ResultSearchItem = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Khởi tạo navigate
  const { results, query } = location.state || { results: [], query: "" }; // Fallback in case there's no state

  return (
    <div className="result-search-container">
      
      {results.length > 0 ? (
        <div className="result-list">
          {results.map((result, index) => (
            <Card 
              key={index} 
              className="mb-3 result-card" 
              style={{ backgroundColor: '#2E3856' }} 
              onClick={() => navigate(`/detailquespack/${result._id}`)} 
            >
              <div className="row no-gutters">
                <div className="col-md-4 card-div">
                {result.imagePreview && <Card.Img src={result.imagePreview} alt={result.title} />}
                  
                </div>
                <div className="col-md-8">
                  <Card.Body>
                    <h5 className="card-title" style={{ color: 'white' }}>{result.title}</h5>
                    <button className="btn btn-secondary btn-queslength">
                      {result.questions?.length || 0} Flashcard
                    </button>
                  </Card.Body>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="no-results">No results found for "{query}".</p>
      )}
    </div>
  );
};

export default ResultSearchItem;
