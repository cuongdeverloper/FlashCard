import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "./footer.scss"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact-info">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <FaMapMarkerAlt /> Address: FPT university Da Nang
            </li>
            <li>
              <FaEnvelope /> Email: namedexxxxxx@fpt.edu.vn
            </li>
            <li>
              <FaPhoneAlt /> Phone: +84 - 0123456789
            </li>
          </ul>
        </div>
        <div className="footer-section social-media">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="https://www.facebook.com">
                <i className="fab fa-facebook"></i> Facebook
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Quizones | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
