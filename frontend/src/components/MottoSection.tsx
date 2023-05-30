import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import GreenButton from '../components/GreenButton';
import setPage from "..";

const MottoSection: React.FC = () => {
    return (
        <div className="mottoSection">
            <p className="motto font-bold">
                Contacting your local Nebraskan Representatives has never been
                <i style={{color: "#3E6335"}}> easier</i>.
            </p>
            <ul className="description font-medium">
                <li>Find Nebraskan representatives by address, city, or county</li>
                <li>Send an email to dozens of senators at once, with information<br/>auto-personalized to the recipient</li>
                <li>Download the same letter auto-addressed to any number of<br/>representatives</li>
                <li>Choose from various email and letter templates</li>
                <li>Prompt an AI Writer to create an email or letter</li>
            </ul>
            <GreenButton 
                onClick={() => setPage('register')} 
                text="Get Started" 
                width="600px" 
                height="80px" 
                fontSize="40px" 
                marginTop="40px" 
                borderRadius="20px"
            />
        </div>
    );
}

export default MottoSection;