import React, { useState, useEffect, useRef } from "react";
import '../styles/Mail.css';
import setPage from "..";
import EmailMinimized from "../components/EmailMinimized";
import { getUser } from "../authenticator";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { solidBrown } from "../styles/colors";

const SentEmails: React.FC = () => {
    const [showSpinner, setShowSpinner] = useState(true);
    const [emails, setEmails] = useState<Email[]>([]);
    const [noEmails, setNoEmails] = useState<boolean>(false);
    const [expandedEmail, setExpandedEmail] = useState<Email>();

    const expandEmail = (email: Email) => {
        if (expandedEmail == email){
            setExpandedEmail(undefined);
        } else {
            setExpandedEmail(email);
        }
    }

    useEffect(() => {
        setShowSpinner(true);
        const fetchData = async () => {
            const response = await axios.post('/getEmails', { email: getUser().email });
            setEmails(response.data);
            if (response.data == 0){
                setNoEmails(true);
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
                <i className="title font-bold">Sent Emails</i>
            </div>
            <div className="flex justify-center mt-2">
                <div className="minimizedMail">
                    {noEmails ? 
                        <div className="txtHolder">
                            <i>You have no sent emails.</i>
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
                                    {emails.map((email: Email) => (
                                        <EmailMinimized 
                                            emailInfo={email} 
                                            onClick={() => expandEmail(email)} 
                                            expanded={expandedEmail === email}/>
                                    ))}
                                </>
                            }
                        </>
                    }
                </div>
                <div className="bigMail ml-4">
                    {expandedEmail ?
                        <div className="mailHolder inter" dangerouslySetInnerHTML={{ __html: "<div>" + expandedEmail.content + "</div>" }} />
                    :
                        <div className="txtHolder">
                            <i>[ Click an email from the left, it will appear here! ]</i>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default SentEmails;