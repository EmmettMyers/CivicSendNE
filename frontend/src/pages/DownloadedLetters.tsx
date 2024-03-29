import React, { useState, useEffect, useRef } from "react";
import '../styles/Mail.css';
import setPage from "..";
import LetterMinimized from "../components/LetterMinimized";
import { getUser } from "../authenticator";
import axios from "axios";
import { solidBrown } from "../styles/colors";
import { Oval } from "react-loader-spinner";

const DownloadedLetters: React.FC = () => {
    const [showSpinner, setShowSpinner] = useState(true);
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
        setShowSpinner(true);
        const fetchData = async () => {
            const response = await axios.post('/getLetters', { email: getUser().email });
            setLetters(response.data);
            if (response.data == 0){
                setNoLetters(true);
            }
        }
        fetchData();
        setTimeout(function() {
            setShowSpinner(false);
        }, 500);
    }, []);

    return (
        <div className="savedMail w-screen h-screen">
            <div className="flex justify-center mt-2">
                <img src="./assets/backArrow.png" className="exit absolute" onClick={() => setPage('home')} />
                <i className="title font-bold">Downloaded Letters</i>
            </div>
            <div className="flex justify-center mt-2">
                <div className="minimizedMail">
                    {noLetters ? 
                        <div className="txtHolder">
                            <i>You have no downloaded letters.</i>
                        </div>
                    :
                        <>
                            {showSpinner ? 
                                <div className="spinner">
                                    <Oval
                                        height={150}
                                        width={150}
                                        color={solidBrown}
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor={solidBrown}
                                        strokeWidth={5}
                                        strokeWidthSecondary={5}
                                        />
                                </div>
                            :
                                <>
                                    {letters.map((letter: Letter) => (
                                        <LetterMinimized 
                                            letterInfo={letter} 
                                            onClick={() => expandLetter(letter)} 
                                            expanded={expandedLetter === letter}/>
                                    ))}
                                </>
                            }
                        </>
                    }
                </div>
                <div className="bigMail ml-4">
                    {expandedLetter ?
                        <div className="mailHolder" dangerouslySetInnerHTML={{ __html: "<div>" + expandedLetter.content + "</div>" }} />
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