import React, { useState, useEffect } from "react";
import setPage from "../index";

const NavBar: React.FC = () => {
    return (
        <div className="navbar w-screen z-10">
            <img src="./assets/logoWhite.png" onClick={() => setPage('home')} className="logo absolute left-0 top-0" />
            <div className="txt-holder flex absolute right-0 top-0 text-white">
                <p onClick={() => setPage('home')}>Home</p>
                <p onClick={() => setPage('home')}>Email</p>
                <p onClick={() => setPage('home')}>Letter</p>
                <img src="./assets/menuLogo.png" className="menu" />
            </div>
        </div>
    );
}

export default NavBar;