import React from "react";
import { FaBook } from "react-icons/fa"; 
import "./banner.scss";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-content">
        <div className="banner-text">
          <h1>Welcome to Quizone</h1>
          <p>Enhance your learning experience with flashcards and quizzes!</p>
        </div>
        <div className="banner-icon">
          <FaBook className="icon" size={80} color="#fff" />
        </div>

      </div>
    </div>
  );
};

export default Banner;
