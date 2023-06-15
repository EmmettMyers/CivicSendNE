import React, { useState } from 'react';
import '../styles/Home.css';
import setPage from '..';
import TemplateBox from './TemplateBox';
import { setOption } from '../pages/MailSetup';
import { actionTemplate, advocateTemplate, appreciationTemplate, concernsTemplate, emailEnd, letterStart, opposeTemplate, supportTemplate } from '../storedInfo';
import { getUser } from '../authenticator';

interface AIModalProps {
    mailType: string;
    isOpen: boolean;
    onClose: () => void;
}

const AIModal: React.FC<AIModalProps> = ({ mailType, isOpen, onClose }) => {
    const closeModal = () => { onClose(); };
    if (!isOpen) { return null; }

    const enterPrompt = (name: string) => {
        var content = "";
        switch(name){
            case "Expressing Concerns":
                setOption(mailType, "", content);
                break;
            case "Asking for Support":
                setOption(mailType, "", content);
                break;
            case "Requesting Action":
                setOption(mailType, "", content);
                break;
            case "Advocating Legislation":
                setOption(mailType, "", content);
                break;
            case "Opposing Legislation":
                setOption(mailType, "", content);
                break;
            case "Appreciation and Feedback":
                setOption(mailType, "", content);
                break;
        }
        closeModal();
    }
 
    return (
        <div className="w-screen h-screen absolute left-0 top-0">
            <div className="aiModal">
                <div className="overlay z-10" onClick={closeModal} />
                <div className="modal z-20 rounded-xl absolute">
                    <div className="modal-content">
                        <h1 className="title absolute top-1 left-1 font-bold">Prompt an AI Writer</h1>
                        <p className="close absolute right-5 top-3 font-bold" onClick={closeModal}>X</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIModal;
