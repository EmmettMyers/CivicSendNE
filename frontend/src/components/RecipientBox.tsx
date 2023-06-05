import React, { useState, useEffect } from "react";
import '../styles/Mail.css';
import { getUser } from "../authenticator";
import { addSelectedSenator, removeSelectedSenator } from "../pages/MailSetup";

interface RecipientBoxProps {
    senator: Representative;
    special: string;
}

const RecipientBox: React.FC<RecipientBoxProps> = ({ senator, special }) => {
    const [bottomText, setBottomText] = useState<JSX.Element | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        if (isClicked){
            removeSelectedSenator(senator.firstName + " " + senator.lastName);
        } else {
            addSelectedSenator(senator.firstName + " " + senator.lastName, senator);
        }
    };
    const clickedStyle = {
        border: isClicked ? '10px solid goldenrod' : 'none'
    };

    useEffect(() => {
        switch(special){
            case "yourSenator":
                setBottomText(
                    <i className="font-medium">
                        <span className="font-black">Your Senator </span>
                     - District {senator.district}</i>
                ); break; 
            default: 
                setBottomText(
                    <i className="font-medium">Senator - District {senator.district}</i>
                ); break;
        }
    }, []);

    return (
        <div className="recipientBox rounded-md relative" style={clickedStyle} onClick={handleClick}>
            <div className="topTxt absolute top-0 w-full text-center">
                <p className="font-semibold">{senator.firstName} {senator.lastName}</p>
            </div>
            <div className="bottomTxt absolute bottom-0 w-full text-center">
                {bottomText}
            </div>
            <div className="flex justify-center items-center mt-7">
                <img className="rounded-md w-100 opacity-80" src={senator.image} />
            </div>
        </div>
    );
}

export default RecipientBox;