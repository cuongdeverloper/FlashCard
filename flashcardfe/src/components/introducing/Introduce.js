import React from "react";
import "./introduce.scss";
import backgroundImage from "../../assests/question_background.jpg";
import { useNavigate } from "react-router-dom";
import VideoIntro from "./VideoIntro";

const Introduce = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="introduce"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay">
          <h1>Introducing Instructional Suite</h1>
          <p className="quote">"I had no idea Quizone could do that."</p>
          <p className="quote-author">- Almost everybody</p>
          <p className="description">
            Create and deliver bell-to-bell curriculum resources that meet the
            needs of every student.
          </p>
          <button className="signup-button" onClick={() => navigate("/login")}>
            Sign up for free
          </button>
        </div>
      </div>
      <VideoIntro />
    </>
  );
};

export default Introduce;
