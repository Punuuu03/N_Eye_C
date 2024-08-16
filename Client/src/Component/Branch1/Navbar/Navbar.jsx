import React, { useEffect, useState } from 'react';
import './Navbar.css'; // Import the CSS file for the navbar
import defaultProfilePic from '../../../assets/profile.png'; // Adjust path as needed
import whatsappLogo from '../../../assets/whatsapp.jpeg'; // Adjust path as needed

const Navbar = () => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Fetch email from local storage
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    return (
        <div id="navbar">
            <div id="navbar-content">
                <div id="heading-section">
                    <h1 id="navbar-heading">New Eye Care</h1>
                </div>
                <div id="profile-section">
                <a href="https://wa.me/+911234567890/?text=Welcome to our new eye care shop! We're so glad you came to visit." target="_blank" rel="noopener noreferrer">
                <img src={whatsappLogo} alt="WhatsApp" id="whatsapp-logo" /></a>
                    {email && <span id="profile-email">{email}</span>}
                    <img src={defaultProfilePic} alt="Profile" id="profile-logo" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
