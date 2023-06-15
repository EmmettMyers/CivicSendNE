import React, { useState } from 'react';
import '../styles/Home.css';
import { setOption } from '../pages/MailSetup';
import Button from './Button';
import { lightGreen, solidBrown, solidGreen } from '../styles/colors';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import { getUser } from '../authenticator';

interface AIModalProps {
    mailType: string;
    isOpen: boolean;
    onClose: () => void;
}

const AIModal: React.FC<AIModalProps> = ({ mailType, isOpen, onClose }) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [text, setText] = useState('');

    const handleChange = (event: any) => {
        setText(event.target.value);
    };

    const closeModal = () => { onClose(); };
    if (!isOpen) { return null; }

    const enterPrompt = async () => {
        setShowSpinner(true);
        var user = getUser();
        const response = await axios.post('/generateAIMail', { user, text });
        setOption("ai", "", response.data);
        setShowSpinner(false);
        closeModal();
    }
 
    return (
        <div className="w-screen h-screen absolute left-0 top-0">
            <div className="aiModal">
                <div className="overlay z-10" onClick={closeModal} />
                <div className="modal z-20 rounded-xl absolute">
                    <div className="modal-content">
                        {showSpinner ? 
                            <>
                                <div className="flex justify-center">
                                    <p className="spinnerAlert font-black text-center">Creating...<br/>Do not exit.</p>
                                </div>
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
                            </>
                        :
                            <>
                                <h1 className="title font-bold mt-2">Prompt an AI Writer</h1>
                                <p className="close absolute right-5 top-3 font-bold" onClick={closeModal}>X</p>
                                <p className="description font-medium mt-1">
                                    Tell the AI what you want to be written to your recipients.<br/>
                                    You can include what tone and/or writing style you prefer.
                                </p>
                                <p className="reminder font-normal mt-4">
                                    * You do not need to mention the mail type, state, or any other <br/>
                                    basic information, the AI already knows what it is writing. *
                                </p>
                                <p className="exampleTitle font-light italic mt-3">An Example Prompt:</p>
                                <p className="example font-normal pt-1">
                                    Not supporting the recent passing of a state bill related to government spending
                                </p>
                                <div className="flex justify-center">
                                    <textarea className="rounded-sm mt-6" value={text} onChange={handleChange} />
                                </div>
                                <div className="flex justify-end" style={{marginRight:"15px"}}>
                                    <Button onClick={() => enterPrompt()} 
                                            text="Submit" txtColor={lightGreen} fontSize="20px" 
                                            bgColor={solidGreen} width="200px" height="40px" 
                                            marginTop="15px" borderRadius="5px"  
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIModal;
