import React from "react";
import "./videointro.scss";
import videoHomePage1 from "../../assests/videointro1.mp4";
import videoHomePage2 from "../../assests/videointro2.mp4";

const VideoIntro = () => {
  return (
    <>
      <div className="video-intro">
        <div className="video-container">
          <video autoPlay muted loop className="video">
            <source src={videoHomePage1} type="video/mp4" />
          </video>
        </div>
        <div className="text-container">
          <h1>01</h1>
          <p>
            Deliver differentiated instruction that's as unique as your
            students.
          </p>
        </div>
      </div>
      <div className="video-intro">
        <div className="text-container">
          <h1>02</h1>
          <p>
            Deliver differentiated instruction that's as unique as your
            students.
          </p>
        </div>
        <div className="video-container">
          <video autoPlay muted loop className="video">
            <source src={videoHomePage2} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
};

export default VideoIntro;
