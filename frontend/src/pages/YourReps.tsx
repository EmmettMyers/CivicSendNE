import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import setPage from "..";
import YourRepBox from "../components/YourRepBox";
import { getUser } from "../authenticator";
import { storedReps, storedStateSens } from "../storedInfo";

const YourReps: React.FC = () => {
    const [yourSenator, setYourSenator] = useState<Representative[]>([]);
    const [senators, setSenators] = useState<Representative[]>([]);
    const [stateSens, setStateSens] = useState<Representative[]>([]);
    const [yourRep, setYourRep] = useState<Representative[]>([]);
    const [reps, setReps] = useState<Representative[]>([]);

    useEffect(() => {
        const recipients = getUser().recipients;
        setYourSenator([recipients[0]]);
        if (recipients.length > 1) {
            setSenators(recipients.slice(1));
        }
        const myRep = getUser().representative;
        if (myRep === "Mike Flood ") {
            setYourRep([storedReps[0]]);
            setReps([storedReps[1], storedReps[2]]);
        } else if (myRep === "Don Bacon ") {
            setYourRep([storedReps[1]]);
            setReps([storedReps[0], storedReps[2]]);
        } else if (myRep === "Adrian Smith ") {
            setYourRep([storedReps[2]]);
            setReps([storedReps[0], storedReps[1]]);
        }
        setStateSens(storedStateSens);
    }, []);

    return (
        <div className="yourReps w-screen h-screen">
            <div className="flex justify-center">
                <img src="./assets/backArrow.png" className="exit absolute" onClick={() => setPage('home')} />
                <i className="title font-bold">My Representatives</i>
            </div>
            <div className="flex justify-center">
                {yourSenator &&
                    <YourRepBox 
                        senators={yourSenator} 
                        title="<i>My District<br/>Senator<i>" 
                        type={<i>Senator<br />District</i>} />
                }
                {yourRep &&
                    <YourRepBox 
                        senators={yourRep} 
                        title="<i>My<br/>Representative<i>" 
                        type={<i>Representative<br />District</i>} />
                }
                {stateSens &&
                    <YourRepBox 
                        senators={stateSens} 
                        title="<i>State<br/>Senators<i>" 
                        type={<i>Nebraska<br />Senator</i>} />
                }
                {reps &&
                    <YourRepBox 
                        senators={reps} 
                        title="<i>Other<br/>Representatives<i>"
                        type={<i>Representative<br />District</i>} />
                }
                {senators &&
                    <YourRepBox 
                        senators={senators} 
                        title="<i>Other District<br/>Senators<i>"
                        type={<i>Senator<br />District</i>} />
                }
            </div>
        </div>
    );
}

export default YourReps;