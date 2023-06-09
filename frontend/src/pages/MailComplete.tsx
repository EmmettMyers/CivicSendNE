import React, { useState, useEffect } from "react";
import '../styles/Mail.css';
import setPage from "..";
import Button from "../components/Button";
import BgImage from "../components/BgImage";
import { lightBlue, solidBlue } from "../styles/colors";

interface MailCompleteProps {
    mailType: string;
}

const MailComplete: React.FC<MailCompleteProps> = ({ mailType }) => {
    var verb;
    (mailType == "email") ? verb = "sent" : verb = "downloaded";

    return (
        <div className="mailComplete w-screen h-screen">
            <div className="flex justify-center">
                <p className="sentTxt font-extrabold">Your {mailType} has been 
                <span className="italic text-green-800"> {verb}!</span></p>
            </div>
            <div className="flex justify-center">
                <Button onClick={mailType === 'letter' ? () => setPage('letterSetup') : () => setPage('emailSetup')}
                        text={mailType === 'letter' ? 'Download More Letters' : 'Send More Emails'} 
                        txtColor={lightBlue} fontSize="40px"
                        bgColor={solidBlue} width="650px" height="120px" 
                        marginTop="30px" borderRadius="10px"  
                />
            </div>
            <div className="flex justify-center">
                <Button onClick={() => setPage('home')} 
                        text="Go To Home" txtColor={lightBlue} fontSize="40px"
                        bgColor={solidBlue} width="650px" height="120px" 
                        marginTop="30px" borderRadius="10px"  
                />
            </div>
            <BgImage opacity={.3} src={"./assets/lincolnNature.png"} />
        </div>
    );
}

export default MailComplete;