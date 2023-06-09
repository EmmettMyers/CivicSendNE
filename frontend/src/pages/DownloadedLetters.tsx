import React, { useState, useEffect, useRef } from "react";
import '../styles/Mail.css';
import setPage from "..";
import LetterMinimized from "../components/LetterMinimized";
import { getUser } from "../authenticator";
import axios from "axios";

const DownloadedLetters: React.FC = () => {
    const [letters, setLetters] = useState<Letter[]>([]);
    const [noLetters, setNoLetters] = useState<boolean>(false);
    const [expandedLetter, setExpandedLetter] = useState<Letter>();

    const expandLetter = (letter: Letter) => {
        if (expandedLetter == letter){
            setExpandedLetter(undefined);
        } else {
            setExpandedLetter(letter);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('/getLetters', { email: getUser().email });
            setLetters(response.data);
            if (response.data == 0){
                setNoLetters(true);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="downloadedLetters w-screen h-screen">
            <div className="flex justify-center mt-2">
                <img src="./assets/backArrow.png" className="exit absolute" onClick={() => setPage('home')} />
                <i className="title font-bold">Downloaded Letters</i>
            </div>
            <div className="flex justify-center mt-2">
                <div className="minimizedLetters">
                    {noLetters ? 
                        <div className="txtHolder">
                            <i>You have no downloaded letters.</i>
                        </div>
                    :
                        <>
                            {letters.map((letter: Letter) => (
                                <LetterMinimized letterInfo={letter} onClick={() => expandLetter(letter)} />
                            ))}
                        </>
                    }
                </div>
                <div className="bigLetter ml-4">
                    {expandedLetter ?
                        <div className="letterHolder" dangerouslySetInnerHTML={{ __html: "<div>" + expandedLetter.content + "</div>" }} />
                    :
                        <div className="txtHolder">
                            <i>[ Click a letter from the left, it will appear here! ]</i>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default DownloadedLetters;