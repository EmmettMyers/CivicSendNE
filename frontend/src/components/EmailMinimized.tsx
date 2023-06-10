import React, { useState, useEffect } from "react";
import '../styles/Home.css';

interface EmailMinimizedProps {
    emailInfo: Email;
    onClick: () => void;
    expanded: boolean;
}

const EmailMinimized: React.FC<EmailMinimizedProps> = ({ emailInfo, onClick, expanded }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        onClick();
    };
    const clickedStyle = {
        background: isClicked ? 'gold' : '#cacaca'
    };

    useEffect(() => {
        setIsClicked(expanded);
    }, [expanded]);

    return (
        <div className="mailMin w-100" onClick={handleClick} style={clickedStyle}>
            <strong>To: </strong>{emailInfo.recipients} <br/>
            <div>
                <strong>Subject: </strong> 
                <i dangerouslySetInnerHTML={{ __html: "<span>" + emailInfo.subject + "</span>" }} />
            </div>
        </div>
    );
}

export default EmailMinimized;