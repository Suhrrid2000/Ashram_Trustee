import React from "react";
import "./Footer.css";

import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>Sree Ramanuj Sitaram Math - Parankush Sevak Sangha</h3>
          <p>Serving humanity through spiritual and social services. Join us in our mission to uplift and enlighten.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/#leaders">About Us</a></li>
            <li><a href="/events">Announcements & Events</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/login">Member Login</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>Email: ramanuj.sitarammath@gmail.com</p>
          <p>Phone: +91-8697059122</p>
          <p>Location: Tribeni, Hooghly, West Bengal, India</p>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/ramanujsitarammath" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
            </a>
            
            <a href="https://www.youtube.com/@SreeRamanujSitaramMath" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sree Ramanuj Sitaram Math. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
