import React, { useState, useEffect } from "react";
import '../styles/Home.css';

interface LetterMinimizedProps {
    letterInfo: Letter;
    onClick: () => void;
    expanded: boolean;
}

const LetterMinimized: React.FC<LetterMinimizedProps> = ({ letterInfo, onClick, expanded }) => {
    const [isClicked, setIsClicked] = useState(false);

    const getPosition = (string: string, subString: string, index: number) => {
        return string.split(subString, index).join(subString).length;
    }

    const body = letterInfo.content;
    const startIndex = getPosition(body, "<br>", 11)
    var startingText = body.substring(startIndex);
    startingText = startingText.replace(/<[^>]*>/g, " ");

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
            <strong>To: </strong>{letterInfo.recipients} <br/>
            <i dangerouslySetInnerHTML={{ __html: "<div>" + startingText + "</div>" }} />
        </div>
    );
}

export default LetterMinimized;