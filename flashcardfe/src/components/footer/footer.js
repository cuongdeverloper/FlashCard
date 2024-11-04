import React, { useEffect } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "./footer.scss";

const Footer = () => {
  useEffect(() => {
    const loadFacebookSDK = () => {
      if (window.FB) {
        window.FB.init({
          xfbml: true,
          version: "v17.0",
        });
        window.FB.XFBML.parse(); // Parse when SDK is loaded
      }
    };

    const fbScript = document.createElement("script");
    fbScript.src = "https://connect.facebook.net/en_US/sdk.js";
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.crossOrigin = "anonymous";
    fbScript.onload = loadFacebookSDK;

    document.body.appendChild(fbScript);

    return () => {
      document.body.removeChild(fbScript);
    };
  }, []);

  return (
    <footer className="footer" data-aos="fade-up" >
      <div className="footer-content">
        <div className="footer-section contact-info">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <FaMapMarkerAlt /> Address: FPT University Da Nang
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
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i> Facebook
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section facebook-group">
          <h4>Join Our Facebook Group</h4>
          <div
            className="fb-group"
            data-href="https://www.facebook.com/groups/1622979321618988" // Replace with your group link
            data-width=""
            data-height="400"
            data-show-tiles="true"
            data-adapt-container-width="true"
          >
            <p>If the group does not load, please <a href="https://www.facebook.com/groups/1622979321618988" target="_blank" rel="noopener noreferrer">click here to join</a>.</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Quizones | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
