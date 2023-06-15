import React, { useState, useEffect } from "react";
import '../styles/Mail.css';
import { softBrown } from "../styles/colors";
import Button from "./Button";
import { setOption } from "../pages/MailSetup";
import TemplateModal from "./TemplateModal";
import AIModal from "./AIModal";
import { getUser } from "../authenticator";
import { letterStart } from "../storedInfo";

interface OptionsContainerProps {
    mailType: string;
}

const OptionsContainer: React.FC<OptionsContainerProps> = ({ mailType }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [modalOpen, setModalOpen] = useState<string>('');

    const closeModal = ():void => {
        setModalOpen('');
    }

    const handleClick = (option: string) => {
        setSelectedOption(prevSelectedOption => {
            if (prevSelectedOption === option) {
                return '';
            } else {
                return option;
            }
        });
        if (selectedOption == ''){
            switch (option){
                case "blank":
                    var user = getUser();
                    if (mailType == "email"){
                        setOption(option, "", 
                            "Dear {{firstName}} {{lastName}},<br/><br/><br/><br/>" +
                            "Sincerely, <br />" + 
                            user.firstName + " " + user.lastName + "<br/>" +
                            user.address.city + ", NE" + "<br/>" +
                            user.email
                        );
                    } else {
                        setOption(option, "",
                            letterStart + 
                            "Dear {{firstName}} {{lastName}},&nbsp;<br/><br/><br/><br/>" +
                            "Sincerely,<br/>" + 
                            user.firstName + " " + user.lastName
                        );
                    }
                    break;
                case "template":
                    setModalOpen('template');
                    break;
                case "ai":
                    setModalOpen('ai');
                    break;
            }
        }
    };
    const isOptionSelected = (option: string) => {
        return selectedOption === option;
    };
    const getButtonStyle = (option: string) => {
        return isOptionSelected(option) ? clickedStyle : {};
    };

    const clickedStyle = {
        border: '10px solid goldenrod',
    };

    return (
        <div className="optionsContainer rounded-md">
            {modalOpen == "template" && <TemplateModal mailType={mailType} isOpen={true} onClose={closeModal}  />}
            {modalOpen == "ai" && <AIModal mailType={mailType} isOpen={true} onClose={closeModal}  />}
            <p className="title font-semibold">Select an {mailType} option:</p>
            <div className="flex justify-center">
                <div style={{marginTop: "5px", ...getButtonStyle('blank')}} 
                    onClick={() => handleClick("blank")} 
                    className="optionBtn font-bold text-white">
                        Start Blank
                </div>
            </div>
            <div className="flex justify-center">
                <div style={{marginTop: "25px", ...getButtonStyle('template')}} 
                    onClick={() => handleClick("template")} 
                    className="optionBtn font-bold text-white">
                        Choose Template
                </div>
            </div>
            <div className="flex justify-center">
                <div style={{marginTop: "25px", ...getButtonStyle('ai')}} 
                    onClick={() => handleClick("ai")} 
                    className="optionBtn font-bold text-white">
                        Prompt AI Writer
                </div>
            </div>
        </div>
    );
}

export default OptionsContainer;