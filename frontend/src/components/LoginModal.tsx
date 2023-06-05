import React, { useState } from 'react';
import '../styles/Home.css';
import { lightGreen, lightGrey, solidGreen } from '../styles/colors';
import Button from './Button';
import setPage from '..';
import axios from 'axios';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const closeModal = () => { onClose(); };
    if (!isOpen) { return null; }

    const login = async () => {
        const errorInsert = document.getElementById("error") as HTMLElement;
        errorInsert.textContent = "";
        var userInfo = {
            email: email,
            password: password
        }
        const response = await axios.post('/login', userInfo);
        if (response.data.message == "Success"){
            localStorage.setItem('sessionToken', response.data.sessionToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            closeModal();
            setPage('home');
        } else {
            errorInsert.textContent = "Failed to login. Invalid email or password.";
        }
    };

    return (
        <div className="modalHolder">
            <div className="overlay z-10" onClick={closeModal} />
            <div className="modal z-20 rounded-xl absolute">
                <div className="modal-content">
                    <h1 className="loginTxt absolute left-9 top-4 font-bold">Log In</h1>
                    <p className="close absolute right-5 top-3 font-bold" onClick={closeModal}>X</p>
                    <div className="inputs">
                        <div className="loginInput flex justify-center">
                            <label className="font-medium mr-4">Email:</label>
                            <input onChange={handleEmailChange} id="email" className="rounded-md" type="text" autoComplete="off"/>
                        </div>
                        <div className="loginInput flex justify-center mt-4">
                            <label className="font-medium mr-4">Password:</label>
                            <input onChange={handlePasswordChange} id="password" className="rounded-md" type="text" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p id="error" className="text-red-700 font-semibold"></p>
                        <div style={{marginRight: "55px"}}>
                            <Button onClick={() => login()} 
                                text="Log In" txtColor={lightGreen} fontSize="20px" 
                                bgColor={solidGreen} width="150px" height="40px" 
                                marginTop="20px" borderRadius="8px"  
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
