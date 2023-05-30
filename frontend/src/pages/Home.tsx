import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import NavBar from '../components/Navbar';
import MottoSection from '../components/MottoSection';
import BgImage from '../components/BgImage';

export const HomeLoggedOut: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="flex justify-center">
        <MottoSection />
        {/* two right side images */}
        <div className="screenshots">
          <img src="./assets/temporary.jpg" />
          <img src="./assets/temporary.jpg" className="mt-10" />
        </div>
      </div>
      <BgImage src="./assets/neSenate.jpg" />
    </div>
  );
}

export const HomeLoggedIn: React.FC = () => {

  return (
    <div></div>
  );

}
