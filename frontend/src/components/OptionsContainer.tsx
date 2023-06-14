import React, { useState, useEffect } from "react";
import '../styles/Mail.css';
import { softBrown } from "../styles/colors";
import Button from "./Button";
import { setOption } from "../pages/MailSetup";

interface OptionsContainerProps {
    mailType: string;
}

const OptionsContainer: React.FC<OptionsContainerProps> = ({ mailType }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleClick = (option: string) => {
        setSelectedOption(prevSelectedOption => {
            if (prevSelectedOption === option) {
                return '';
            } else {
                setOption(option, "");
                return option;
            }
        });
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