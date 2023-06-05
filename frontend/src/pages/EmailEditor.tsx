import React, { useState, useEffect, useRef } from "react";
import '../styles/Mail.css';
import { option, selectedSenators } from "./MailSetup";
import setPage from "..";
import Button from "../components/Button";
import { lightGreen, solidGreen } from "../styles/colors";
import ContentEditable from "react-contenteditable";
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { getUser } from "../authenticator";

const serviceID = 'service_trk8vgd';
const templateID = 'template_z9jnier';
const userID = 'voqiCRXhWPfT8jI7j';

const EmailEditor: React.FC = () => {
    const senatorsList = Array.from(selectedSenators.values());
    const concatenatedNames: string = senatorsList.map((rep) => `${rep.firstName} ${rep.lastName}`).join(', ');
    
    const divRef = useRef<HTMLDivElement>(null);
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
    };
    const handleBodyChange = (event: any) => {
        // get new body
        var updatedBody = event.target.value;
        // check if there are any values that need to be highlighted
        var fn = "{{firstName}}";
        var ln = "{{lastName}}";
        var dn = "{{districtNumber}}";
        var endings = [" ", ".", ","];
        for (var i = 0; i < updatedBody.length; i++){
            for (var e = 0; e < endings.length; e++){
                var addition = '<span class="text-green-600 font-bold">';
                var end = "";
                if (updatedBody.substring(i, i + fn.length + 1) === fn + endings[e]){
                    end = fn + '</span>' + endings[e];
                } else if (updatedBody.substring(i, i + ln.length + 1) === ln + endings[e]){
                    end = ln + '</span>' + endings[e];
                } else if (updatedBody.substring(i, i + dn.length + 1) === dn + endings[e]){
                    end = dn + '</span>' + endings[e];
                }
                if (end.length > 0){
                    if (e == 0){
                        end = end.substring(0, end.length - 1) + "&nbsp";
                    }
                    addition += end;
                    updatedBody = updatedBody.substring(0, i) + addition + updatedBody.substring(i + addition.length);
                }
            }
        }
        // set the new body with the highlighting
        setBody(updatedBody);
    };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            event.target.value += '<br>';
        }
    };

    const sendEmail = () => {
        // loop through senators, send email to each one
        for (const senator of senatorsList) {
            var setBody = body.replace(/<span[^>]*>(.*?)<\/span>/gi, "$1");
            setBody = setBody.replace(/{{firstName}}/g, senator.firstName);
            setBody = setBody.replace(/{{lastName}}/g, senator.lastName);
            setBody = setBody.replace(/{{districtNumber}}/g, senator.district.toString());
            const templateParams = {
                name: getUser().firstName + " " + getUser().lastName,
                subject: subject,
                body: setBody,
                senatorEmail: "emmettleemyers@gmail.com" // senator.email
            };
            emailjs.send(serviceID, templateID, templateParams, userID);
        }
    }

    return (
        <div className="emailEditor w-screen h-screen">
            <div className="flex justify-center">
                <img src="./assets/backArrow.png" className="exit absolute" onClick={() => setPage('emailSetup')} />
                <i className="title font-bold">Create and send your email!</i>
            </div>
            <div className="inputHolder flex justify-center">
                <label className="font-bold text-right">To:</label>
                <input value={concatenatedNames} className="rounded-md" type="text" readOnly />
                <label className="ml-5 font-bold text-right">Subject:</label>
                <input onChange={handleSubjectChange} className="rounded-md" type="text" autoComplete="off" />
            </div>
            <div className="mt-3 flex justify-center">
                <ContentEditable
                    innerRef={divRef}
                    html={body}
                    onChange={handleBodyChange}
                    onKeyDown={handleKeyPress}
                    className="body rounded-md text-black" 
                />
            </div>
            <div className="flex justify-between" style={{marginRight: "152px"}}>
                <p className="infoTxt font-semibold">
                    Type 
                    <span>{` {{firstName}}`}</span>, 
                    <span>{` {{lastName}}`}</span>, or 
                    <span>{` {{districtNumber}} `}</span> 
                    in your email to add information specific to each recipient.
                </p>
                <Button onClick={() => sendEmail()} 
                        text="Send" txtColor={lightGreen} fontSize="20px" 
                        bgColor={solidGreen} width="200px" height="40px" 
                        marginTop="15px" borderRadius="7px"  
                />
            </div>
        </div>
    );
}

export default EmailEditor;