import React from "react";
import { useLocation } from "react-router-dom";
import './ResultSearchItem.scss';

const ResultSearchItem = () => {
  const location = useLocation();
  const { results, query } = location.state || { results: [], query: "" }; // Fallback in case there's no state

  return (
    <div className="result-search-container">
      <h2>Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <div className="result-list">
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <a href="#" className="result-link">{result.title}</a>
         
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No results found for "{query}".</p>
      )}
    </div>
  );
};

export default ResultSearchItem;
