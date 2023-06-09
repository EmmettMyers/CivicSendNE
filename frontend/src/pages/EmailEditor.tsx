import React, { useState, useEffect, useRef } from "react";
import '../styles/Mail.css';
import { option, selectedSenators } from "./MailSetup";
import setPage from "..";
import Button from "../components/Button";
import { lightGreen, solidGreen } from "../styles/colors";
import ContentEditable from "react-contenteditable";
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { getUser } from "../authenticator";
import axios from "axios";

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

    const highlightPlaceholders = (body: string) => {
        const placeholders = ["{{firstName}}", "{{lastName}}", "{{districtNumber}}"];
        const endings = [" ", ".", ","];
        let highlightedBody = body;
        placeholders.forEach((placeholder) => {
            endings.forEach((ending) => {
            const regex = new RegExp(`${placeholder}\\${ending}`, "g");
            highlightedBody = highlightedBody.replace(
                regex,
                `<span class="text-green-600 font-bold">${placeholder}</span>${ending}`
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

    const sendEmail = async () => {
        setPage('emailSent');
        // loop through senators, send email to each one
        for (const senator of senatorsList) {
            // remove spans
            var setBody = body.replace(/<span[^>]*>(.*?)<\/span>/gi, "$1");
            setBody = setBody.replace(/{{firstName}}/g, senator.firstName);
            setBody = setBody.replace(/{{lastName}}/g, senator.lastName);
            setBody = setBody.replace(/{{districtNumber}}/g, senator.district.toString());
            // send email
            const templateParams = {
                name: getUser().firstName + " " + getUser().lastName,
                subject: subject,
                body: setBody,
                senatorEmail: "emmettleemyers@gmail.com" // senator.email
            };
            emailjs.send(serviceID, templateID, templateParams, userID);
        }
        // save email
        var saveInfo: Email = {
            sender: getUser(),
            recipients: concatenatedNames,
            subject: subject,
            content: body
        }
        const response = await axios.post('/saveEmail', saveInfo);
    }

    useEffect(() => {
        setBody(highlightPlaceholders("Dear {{firstName}} {{lastName}},&nbsp;"));
    }, []);

    return (
        <div className="mailEditor w-screen h-screen">
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
                    className="body emailH rounded-md text-black" 
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