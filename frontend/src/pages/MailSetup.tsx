import React, { useState, useEffect } from "react";
import '../styles/Mail.css';
import setPage from "..";
import { lightGreen, solidGreen } from "../styles/colors";
import Button from "../components/Button";
import RecipientsContainer from "../components/RecipientsContainer";
import OptionsContainer from "../components/OptionsContainer";

// Selected Senators storage
export const selectedSenators: Map<string, Representative> = new Map<string, Representative>();
export const addSelectedSenator = (name: string, senator: Representative) => {
  selectedSenators.set(name, senator);
}
export const removeSelectedSenator = (name: string) => {
  selectedSenators.delete(name);
}
export const clearSelectedSenators = () => {
  selectedSenators.clear();
}

// Option storage
export const option: { type: string, content: string } = {
  type: "",
  content: ""
};
export const setOption = (type: string, content: string) => {
  option.type = type;
  option.content = content;
}

interface MailSetupProps {
  mailType: string;
}

const MailSetup: React.FC<MailSetupProps> = ({ mailType }) => {
  const [createPage, setCreatePage] = useState<string>('');

  useEffect(() => {
    (mailType === "email") ? setCreatePage("emailEditor") : setCreatePage("letterEditor");
    clearSelectedSenators();
    setOption("", "");
  }, []);

  return (
    <div className="mailSetup w-screen h-screen">
        <div className="flex justify-center">
            <img src="./assets/backArrow.png" className="exit absolute" onClick={() => setPage('home')} />
            <i className="setupTitle font-bold">Let's set up your {mailType}.</i>
        </div>
        <div className="boxesContainer flex justify-center">
            <RecipientsContainer />
            <div style={{width: "20px"}}></div>
            <div>
                <OptionsContainer mailType={mailType} />
                <Button onClick={() => setPage(createPage)} 
                        text="Create" txtColor={lightGreen} fontSize="35px" 
                        bgColor={solidGreen} width="500px" height="80px" 
                        marginTop="20px" borderRadius="7px"  
                />
            </div>
        </div>
    </div>
  );
}

export default MailSetup;