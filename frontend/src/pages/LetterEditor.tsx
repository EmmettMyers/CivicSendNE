import React, { useState, useEffect, useRef } from "react";
import '../styles/Mail.css';
import { option, selectedSenators } from "./MailSetup";
import setPage from "..";
import Button from "../components/Button";
import { lightBlue, lightGreen, solidBlue, solidBrown, solidGreen } from "../styles/colors";
import ContentEditable from "react-contenteditable";
import { getUser } from "../authenticator";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const LetterEditor: React.FC = () => {
    const senatorsList = Array.from(selectedSenators.values());
    const concatenatedNames: string = senatorsList.map((rep) => `${rep.firstName} ${rep.lastName}`).join(', ');
    
    const divRef = useRef<HTMLDivElement>(null);
    const [body, setBody] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    const highlightPlaceholders = (body: string) => {
        const placeholders = ["{{firstName}}", "{{lastName}}", "{{districtNumber}}"];
        const endings = [" ", ".", ","];
        let highlightedBody = body;
        placeholders.forEach((placeholder) => {
            endings.forEach((ending) => {
            const regex = new RegExp(`${placeholder}\\${ending}`, "g");
            highlightedBody = highlightedBody.replace(
                regex,
                `<span class="inter text-green-600 font-bold">${placeholder}</span>${ending}`
            );
            });
        });
        return highlightedBody;
    };
    
    const handleBodyChange = (event: any) => {
        const updatedBody = event.target.value;
        const highlightedBody = highlightPlaceholders(updatedBody);
        setBody(highlightedBody);
    };
      

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            event.target.value += '<br>';
        }
    };

    const downloadLetter = async () => {
        setShowSpinner(true);
        // loop through senators, download letter to each one
        for (const senator of senatorsList) {
            // remove spans
            var setBody = body.replace(/<span[^>]*>(.*?)<\/span>/gi, "$1");
            setBody = setBody.replace(/{{firstName}}/g, senator.firstName);
            setBody = setBody.replace(/{{lastName}}/g, senator.lastName);
            setBody = setBody.replace(/{{districtNumber}}/g, senator.district.toString());
            if (senator.room.includes("Room")){
                setBody = setBody.replace(/{{address}}/g, senator.room + " P.O. Box 94604");
                setBody = setBody.replace(/{{city}}/g, "Lincoln");
                setBody = setBody.replace(/{{zip}}/g, "68509");
            } else {
                setBody = setBody.replace(/{{address}}/g, senator.room);
                setBody = setBody.replace(/{{city}}/g, "Washington DC");
                setBody = setBody.replace(/{{zip}}/g, "20515");
            }
            // download letter
            var letterHTML = "<div>" + setBody + "</div>";
            //const response = await axios.post('/downloadLetter', { letterHTML });
            //const pdfUrl = response.data.document;
            //window.open(pdfUrl);
        }
        // save letter
        var saveInfo: Letter = {
            sender: getUser(),
            recipients: concatenatedNames,
            content: body
        }
        //const response = await axios.post('/saveLetter', saveInfo);
        setShowSpinner(false);
        setPage('letterSent');
    }

    useEffect(() => {
        setBody(highlightPlaceholders(option.content));
    }, []);

    return (
        <div className="mailEditor w-screen h-screen">
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
                <div className="flex justify-center">
                    <img src="./assets/backArrow.png" className="exit absolute" onClick={() => setPage('letterSetup')} />
                    <i className="title font-bold">Create and download your letter!</i>
                </div>
                <div className="mt-1 flex justify-center">
                    <ContentEditable
                        innerRef={divRef}
                        html={body}
                        onChange={handleBodyChange}
                        onKeyDown={handleKeyPress}
                        className="body letterH rounded-md text-black" 
                    />
                </div>
                <div className="flex justify-between" style={{marginRight: "152px"}}>
                    <div>
                        <p className="infoTxt font-semibold">
                            Type 
                            <span>{` {{firstName}}`}</span>, 
                            <span>{` {{lastName}}`}</span>, or 
                            <span>{` {{districtNumber}} `}</span> 
                            in your letter to add information specific to each recipient.
                        </p>
                        <p className="infoTxt2 font-semibold">
                            <span>{` {{address}}`}</span>, 
                            <span>{` {{city}}`}</span>, and 
                            <span>{` {{zip}} `}</span> 
                            are preset information specific to each recipient's location.
                        </p>
                    </div>
                    <Button onClick={() => downloadLetter()} 
                            text="Download" txtColor={lightGreen} fontSize="22px" 
                            bgColor={solidGreen} width="220px" height="55px" 
                            marginTop="15px" borderRadius="7px"  
                    />
                </div>
            </>
            }
        </div>
    );
}

export default LetterEditor;