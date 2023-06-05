import React, { useState, useEffect, useRef } from "react";
import setPage from "../index";
import { loggedIn } from "../authenticator";
import LoginModal from "./LoginModal";

interface NavbarProps {
    highlight: string;
}

const NavBar: React.FC<NavbarProps> = ({ highlight }) => {
    const [loginModalOpen, setLoginModal] = useState(false);
    const homeRef = useRef<HTMLParagraphElement>(null);
    const emailRef = useRef<HTMLParagraphElement>(null);
    const letterRef = useRef<HTMLParagraphElement>(null);

    const openModal = ():void => {
        setLoginModal(true);
    }
    const closeModal = ():void => {
        setLoginModal(false);
    }

    useEffect(() => {
        homeRef.current?.style.setProperty('color', 'white');
        emailRef.current?.style.setProperty('color', 'white');
        letterRef.current?.style.setProperty('color', 'white');
        switch(highlight){
            case "home":
                homeRef.current?.style.setProperty('color', 'yellow');
                break;
            case "email":
                emailRef.current?.style.setProperty('color', 'yellow');
                break;
            case "letter":
                letterRef.current?.style.setProperty('color', 'yellow');
                break;
        }
    });

    return (
        <div className="navbar w-screen z-10">
            {loginModalOpen && <LoginModal isOpen={true} onClose={closeModal} />}
            <img src="./assets/logoWhite.png" onClick={() => setPage('home')} className="logo absolute left-0 top-0" />
            <div className="txt-holder flex absolute right-0 top-0 text-white font-medium">
                <p ref={homeRef} onClick={() => setPage('home')}>Home</p>
                <p ref={emailRef} onClick={() => setPage('emailSetup')}>Email</p>
                <p ref={letterRef} onClick={() => setPage('letterSetup')}>Letter</p>
                {loggedIn() ? 
                    <img src="./assets/menuLogo.png" className="menu" /> 
                    : <p className="text-yellow-400 font-semibold" onClick={openModal}>Log In</p>
                }
            </div>
        </div>
    );
}

export default NavBar;