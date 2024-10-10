import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "./footer.scss"; // Import your custom CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact-info">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <FaMapMarkerAlt /> Address: 123 Main Street, City, Country
            </li>
            <li>
              <FaEnvelope /> Email: info@example.com
            </li>
            <li>
              <FaPhoneAlt /> Phone: +123-456-7890
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
        <p>&copy; 2024 Your Company | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
