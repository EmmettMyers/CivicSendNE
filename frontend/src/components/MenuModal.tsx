import React, { useState } from 'react';
import '../styles/Home.css';
import { lightGreen, lightGrey, solidGreen } from '../styles/colors';
import Button from './Button';
import setPage from '..';
import axios from 'axios';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
    const closeModal = () => { onClose(); };
    if (!isOpen) { return null; }

    const handleClick = (page: string):void => {
        closeModal();
        setPage(page);
    }

    return (
        <div className="menuModal">
            <div className="overlay z-10" onClick={closeModal} />
            <div className="modal z-20 rounded-bl-lg absolute right-0">
                <div className="modal-content text-center font-semibold text-white">
                    <p onClick={() => handleClick('sentEmails')}>Sent Emails</p>
                    <p onClick={() => handleClick('downloadedLetters')}>Downloaded Letters</p>
                    <p onClick={() => handleClick('yourRepresentatives')}>Your Representatives</p>
                    <p onClick={() => handleClick('yourAccount')}>Your Account</p>
                    <p onClick={() => handleClick('logOut')}>Log Out</p>
                </div>
            </div>
        </div>
    );
};

export default MenuModal;
