import React, { useState, useEffect } from "react";
import '../styles/Mail.css';
import axios from "axios";
import RecipientBox from "./RecipientBox";
import { getUser } from "../authenticator";
import { storedReps, storedStateSens } from "../storedInfo";

const RecipientsContainer: React.FC = () => {
    const [yourSenator, setYourSenator] = useState<Representative>();
    const [senators, setSenators] = useState<Representative[]>([]);
    const [stateSens, setStateSens] = useState<Representative[]>([]);
    const [yourRep, setYourRep] = useState<Representative>();
    const [reps, setReps] = useState<Representative[]>([]);

    useEffect(() => {
        const recipients = getUser().recipients;
        setYourSenator(recipients[0]);
        if (recipients.length > 1) {
            setSenators(recipients.slice(1));
        }
        const myRep = getUser().representative;
        if (myRep === "Mike Flood "){
            setYourRep(storedReps[0]);
            setReps([storedReps[1], storedReps[2]]);
        } else if (myRep === "Don Bacon "){
            setYourRep(storedReps[1]);
            setReps([storedReps[0], storedReps[2]]);
        } else if (myRep === "Adrian Smith "){
            setYourRep(storedReps[2]);
            setReps([storedReps[0], storedReps[1]]);
        }
        setStateSens(storedStateSens);
    }, []);

    return (
        <div className="recipientsContainer rounded-md">
            <p className="title font-semibold">Choose the recipients:</p>
            <div className="flex flex-wrap justify-evenly">
                {yourSenator && 
                    <RecipientBox senator={yourSenator} special="yourSenator" />
                }
                {yourRep && 
                    <RecipientBox senator={yourRep} special="yourRep" />
                }
                {stateSens.map((senator: Representative) => (
                    <RecipientBox senator={senator} special="stateSen" />
                ))}
                {reps.map((rep: Representative) => (
                    <RecipientBox senator={rep} special="rep" />
                ))}
                {senators.map((senator: Representative) => (
                    <RecipientBox senator={senator} special="senator" />
                ))}
            </div>
        </div>
    );
}

export default RecipientsContainer;