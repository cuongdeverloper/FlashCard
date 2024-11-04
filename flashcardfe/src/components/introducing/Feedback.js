import React, { useRef } from "react";
import { Carousel, Card } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import icons from react-icons
import "./feedback.scss";

const feedbackData = [
  {
    name: "David Sheffield",
    role: "8th Grade Math Teacher",
    quote:
      "Just today, I was able to use an already created Quizizz on slope-intercept form to see if my students were ready for their summative assessment on Thursday .... Because of the data from the Quizizz, I was able to support and meet the needs of these students.",
    highlight: "Just today, I was able to use an already created Quizizz",
    borderColor: "#5ec2ce",
    avatar:
      "https://images.pexels.com/photos/4887131/pexels-photo-4887131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Confident teacher in eyeglasses
  },
  {
    name: "Sarah Edinger",
    role: "8th Grade Algebra Teacher",
    quote:
      "I had a visually impaired student in distance learning .... With Quizizz, I was able to keep him on track ... and he successfully moved to the next course of accelerated math with all the foundational pieces in place that he needed to know!",
    highlight: "With Quizizz, I was able to keep him on track",
    borderColor: "#ff9f0f",
    avatar:
      "https://images.pexels.com/photos/6749294/pexels-photo-6749294.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Serious teacher in front of chalkboard
  },
  {
    name: "Lisa Anderson",
    role: "Sr. Manager of Academic Instructional Technology",
    quote:
      "I can’t express how valuable it has been in keeping students engaged in their learning whether through instructor-paced, individual/team quiz, or as a homework assignment to review together the next day!",
    highlight: "I can’t express how valuable it has been",
    borderColor: "#b37fcb",
    avatar:
      "https://images.pexels.com/photos/8965770/pexels-photo-8965770.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Teacher engaging with students
  },
  {
    name: "John Doe",
    role: "History Teacher",
    quote:
      "Quizizz allows me to create interactive and fun quizzes that keep my students interested in the subject. It has been a game-changer in the way I engage with my class.",
    highlight: "Quizizz allows me to create interactive and fun quizzes",
    borderColor: "#ff6347",
    avatar:
      "https://images.pexels.com/photos/2977554/pexels-photo-2977554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Male teacher holding a tablet
  },
  {
    name: "Emily Johnson",
    role: "Science Educator",
    quote:
      "I love how Quizizz enables personalized learning. My students can practice at their own pace, and I get the data I need to guide their learning effectively.",
    highlight: "Quizizz enables personalized learning",
    borderColor: "#4682b4",
    avatar:
      "https://images.pexels.com/photos/10312089/pexels-photo-10312089.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Teacher interacting with classroom
  },
  {
    name: "Michael Lee",
    role: "Educational Consultant",
    quote:
      "Using Quizizz has improved classroom dynamics by adding an element of friendly competition. Students look forward to each session, making it a wonderful learning experience.",
    highlight: "Using Quizizz has improved classroom dynamics",
    borderColor: "#32cd32",
    avatar:
      "https://images.pexels.com/photos/3762804/pexels-photo-3762804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Man teaching a class
  },
];

const Feedback = () => {
  const carouselRef = useRef(null);

  const handleNext = () => {
    carouselRef.current.next();
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const createSlides = (data) => {
    const slides = [];
    for (let i = 0; i < data.length; i += 3) {
      slides.push(data.slice(i, i + 3));
    }
    return slides;
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">What Our Users Say</h2>
      <div className="carousel-wrapper feedback">
        <button onClick={handlePrev} className="btn btn-secondary prev-btn">
          <FaArrowLeft />
        </button>
        <Carousel
          ref={carouselRef}
          interval={null}
          className="feedback-carousel"
        >
          {createSlides(feedbackData).map((slide, index) => (
            <Carousel.Item key={index}>
              <div className="row">
                {slide.map((item, slideIndex) => (
                  <div className="col-md-4" key={slideIndex}>
                    <Card
                      className="feedback-card mb-3"
                      style={{
                        borderLeft: `5px solid ${item.borderColor}`,
                      }}
                    >
                      <Card.Body>
                        <div className="card-top">
                          <div className="avatar">
                            <img src={item.avatar} />
                          </div>
                          <div>
                            <h3>{item.name}</h3>
                            <p className="role">{item.role}</p>
                          </div>
                        </div>
                        <p className="quote">
                          <span
                            className="highlight"
                            style={{ color: item.borderColor }}
                          >
                            {item.highlight}
                          </span>
                          {item.quote.replace(item.highlight, "")}
                        </p>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <button onClick={handleNext} className="btn btn-secondary next-btn">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Feedback;
