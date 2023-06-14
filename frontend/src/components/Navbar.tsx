import React, { useState, useEffect, useRef } from "react";
import setPage from "../index";
import { loggedIn } from "../authenticator";
import LoginModal from "./LoginModal";
import MenuModal from "./MenuModal";

interface NavbarProps {
    highlight: string;
}

const NavBar: React.FC<NavbarProps> = ({ highlight }) => {
    const [loginModalOpen, setLoginModal] = useState(false);
    const [menuOpen, setMenu] = useState(false);
    const homeRef = useRef<HTMLParagraphElement>(null);
    const emailRef = useRef<HTMLParagraphElement>(null);
    const letterRef = useRef<HTMLParagraphElement>(null);

    const openLogin = ():void => {
        setLoginModal(true);
    }
    const closeLogin = ():void => {
        setLoginModal(false);
    }

    const toggleMenu = ():void => {
        setMenu(!menuOpen);
    }

    useEffect(() => {
        homeRef.current?.style.setProperty('color', 'white');
        emailRef.current?.style.setProperty('color', 'white');
        letterRef.current?.style.setProperty('color', 'white');
        switch(highlight){
            case "home":
                homeRef.current?.style.setProperty('color', 'gold');
                break;
            case "email":
                emailRef.current?.style.setProperty('color', 'gold');
                break;
            case "letter":
                letterRef.current?.style.setProperty('color', 'gold');
                break;
        }
    });

    return (
        <div className="navbar w-screen z-10">
            {loginModalOpen && <LoginModal isOpen={true} onClose={closeLogin} />}
            {menuOpen && <MenuModal isOpen={true} onClose={toggleMenu} />}
            <img src="./assets/logoWhite.png" onClick={() => setPage('home')} className="logo absolute left-0 top-0" />
            <div className="txt-holder flex absolute right-0 top-0 font-medium text-white">
                {loggedIn() ? 
                    <>
                        <p ref={homeRef} onClick={() => setPage('home')}>Home</p>
                        <p ref={emailRef} onClick={() => setPage('emailSetup')}>Email</p>
                        <p ref={letterRef} onClick={() => setPage('letterSetup')}>Letter</p>
                        <img src="./assets/menuLogo.png" className="menu" onClick={toggleMenu} /> 
                    </>
                : 
                    <>
                        <p className="startTxt font-semibold" onClick={() => setPage('register')}>Sign Up</p>
                        <p className="startTxt font-semibold" onClick={openLogin}>Log In</p>
                    </>
                }
            </div>
        </div>
    );
}

export default NavBar;