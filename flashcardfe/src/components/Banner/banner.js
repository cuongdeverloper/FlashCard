import React from "react";
import { FaBook, FaRegStar } from "react-icons/fa"; // Flashcard icon from React Icons
import "./banner.scss"; // Import the associated SCSS for styling

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
