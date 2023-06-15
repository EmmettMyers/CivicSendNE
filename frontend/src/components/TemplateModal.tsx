import React, { useState } from 'react';
import '../styles/Home.css';
import setPage from '..';
import TemplateBox from './TemplateBox';
import { setOption } from '../pages/MailSetup';
import { actionTemplate, advocateTemplate, appreciationTemplate, concernsTemplate, emailEnd, letterStart, opposeTemplate, supportTemplate } from '../storedInfo';
import { getUser } from '../authenticator';

interface TemplateModalProps {
    mailType: string;
    isOpen: boolean;
    onClose: () => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ mailType, isOpen, onClose }) => {
    const closeModal = () => { onClose(); };
    if (!isOpen) { return null; }

    const boxClick = (name: string) => {
        var start = ""
        if(mailType == "letter"){
            start = letterStart;
        }
        var end = getUser().firstName + " " + getUser().lastName + "<br />";
        if(mailType == "email"){
            end += emailEnd;
        }
        switch(name){
            case "Expressing Concerns":
                setOption("template", concernsTemplate.subject, start + concernsTemplate.content + end);
                break;
            case "Asking for Support":
                setOption("template", supportTemplate.subject, start + supportTemplate.content + end);
                break;
            case "Requesting Action":
                setOption("template", actionTemplate.subject, start + actionTemplate.content + end);
                break;
            case "Advocating Legislation":
                setOption("template", advocateTemplate.subject, start + advocateTemplate.content + end);
                break;
            case "Opposing Legislation":
                setOption("template", opposeTemplate.subject, start + opposeTemplate.content + end);
                break;
            case "Appreciation and Feedback":
                setOption("template", appreciationTemplate.subject, start + appreciationTemplate.content + end);
                break;
        }
        closeModal();
    }
 
    return (
        <div className="w-screen h-screen absolute left-0 top-0">
            <div className="templateModal">
                <div className="overlay z-10" onClick={closeModal} />
                <div className="modal z-20 rounded-xl absolute">
                    <div className="modal-content">
                        <h1 className="title absolute top-1 left-1 font-bold">Select a template:</h1>
                        <p className="close absolute right-5 top-3 font-bold" onClick={closeModal}>X</p>
                    </div>
                    <div className="flex flex-wrap justify-evenly" style={{marginTop:"90px"}}>
                        <TemplateBox onClick={boxClick} name="Expressing Concerns" />
                        <TemplateBox onClick={boxClick} name="Asking for Support" />
                        <TemplateBox onClick={boxClick} name="Requesting Action" />
                        <TemplateBox onClick={boxClick} name="Advocating Legislation" />
                        <TemplateBox onClick={boxClick} name="Opposing Legislation" />
                        <TemplateBox onClick={boxClick} name="Appreciation and Feedback" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateModal;
