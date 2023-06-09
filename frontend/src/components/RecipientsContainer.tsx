import React, { useState, useEffect } from "react";
import '../styles/Mail.css';
import axios from "axios";
import RecipientBox from "./RecipientBox";
import { getUser } from "../authenticator";

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

const storedReps: Representative[] = [
    {
        firstName: "Mike",
        lastName: "Flood",
        district: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Mike_Flood_117th_Congress.jpeg",
        email: "-----",
        room: "343 Cannon HOB",
    },
    {
        firstName: "Don",
        lastName: "Bacon",
        district: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Don_Bacon_117th_Congress.jpg/1200px-Don_Bacon_117th_Congress.jpg",
        email: "-----",
        room: "2104 Rayburn HOB",
    },
    {
        firstName: "Adrian",
        lastName: "Smith",
        district: 3,
        image: "https://clerk.house.gov/content/assets/img/members/S001172.jpg",
        email: "-----",
        room: "502 Cannon HOB",
    },
];

const storedStateSens: Representative[] = [
    {
        firstName: "Deb",
        lastName: "Fischer",
        district: 0,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Deb_Fischer%2C_official_portrait%2C_115th_Congress.jpg",
        email: "-----",
        room: "454 Russell Senate Office Building",
    },
    {
        firstName: "Pete",
        lastName: "Ricketts",
        district: 0,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Sen._Pete_Ricketts_official_portrait%2C_118th_Congress.jpg/1200px-Sen._Pete_Ricketts_official_portrait%2C_118th_Congress.jpg",
        email: "-----",
        room: "139 Russell Senate Office Building",
    },
];

export default RecipientsContainer;