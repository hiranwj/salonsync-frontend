import React from 'react';
import './style/Footer.css';
import Logo from '../../../assets/salonsync-logo.png';

const Footer: React.FC = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-logo-section">
                    <img src={Logo} alt="Logo" className="footer-logo" />
                </div>
                
                <div className="footer-section">
                    <h4>Menu</h4>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li>Get Started</li>
                        <li>FAQs</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Account</h4>
                    <ul>
                        <li>Login</li>
                        <li>Sign Up</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact</h4>
                    <ul>
                        <li>support@salonsync.com</li>
                        <li>+94717485920</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 SalonSync. Developed by <a href="https://www.linkedin.com/in/hiranwj" target="_blank"> Hiran Wijayathilaka</a> All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
