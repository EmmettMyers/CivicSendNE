import React, { useState, useEffect } from "react";
import setPage from "../index";
import { loggedIn } from "../authenticator";
import LoginModal from "./LoginModal";

const NavBar: React.FC = () => {
    const [loginModalOpen, setLoginModal] = useState(false);

    const openModal = ():void => {
        setLoginModal(true);
    }
    const closeModal = ():void => {
        setLoginModal(false);
    }

    return (
        <div className="navbar w-screen z-10">
            {loginModalOpen && <LoginModal isOpen={true} onClose={closeModal} />}
            <img src="./assets/logoWhite.png" onClick={() => setPage('home')} className="logo absolute left-0 top-0" />
            <div className="txt-holder flex absolute right-0 top-0 text-white">
                <p onClick={() => setPage('home')}>Home</p>
                <p onClick={() => setPage('home')}>Email</p>
                <p onClick={() => setPage('home')}>Letter</p>
                {loggedIn() ? 
                    <img src="./assets/menuLogo.png" className="menu" /> 
                    : <p className="text-yellow-400 font-semibold" onClick={openModal}>Log In</p>
                }
            </div>
        </div>
    );
}

export default NavBar;