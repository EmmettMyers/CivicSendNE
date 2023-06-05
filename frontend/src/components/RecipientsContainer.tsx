import React, { useState, useEffect } from "react";
import '../styles/Mail.css';
import axios from "axios";
import RecipientBox from "./RecipientBox";
import { getUser } from "../authenticator";

const RecipientsContainer: React.FC = () => {
    const [yourSenator, setYourSenator] = useState<Representative>();
    const [senators, setSenators] = useState<Representative[]>([]);

    useEffect(() => {
        const recipients = getUser().recipients;
        setYourSenator(recipients[0]);
        if (recipients.length > 1) {
            setSenators(recipients.slice(1));
        }
    }, []);

    return (
        <div className="recipientsContainer rounded-md">
            <p className="title font-semibold">Choose the recipients:</p>
            <div className="flex flex-wrap justify-evenly">
                {yourSenator && 
                    <RecipientBox senator={yourSenator} special="yourSenator" />
                }
                {senators.map((senator: Representative) => (
                    <RecipientBox senator={senator} special="senator" />
                ))}
            </div>
        </div>
    );
}

export default RecipientsContainer;