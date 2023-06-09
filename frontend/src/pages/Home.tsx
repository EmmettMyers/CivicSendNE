import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import NavBar from '../components/Navbar';
import MottoSection from '../components/MottoSection';
import BgImage from '../components/BgImage';
import Button from "../components/Button";
import setPage from "..";
import { lightBlue, lightGreen, solidBlue, solidGreen } from "../styles/colors";
import { getUser } from "../authenticator";

export const HomeLoggedOut: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center">
        <MottoSection />
        {/* two right side images */}
        <div className="screenshots">
          <img src="./assets/temporary.jpg" />
          <img src="./assets/temporary.jpg" className="mt-10" />
        </div>
      </div>
      <BgImage opacity={.08} src="./assets/neSenate.jpg" />
    </div>
  );
}

export const HomeLoggedIn: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    //localStorage.setItem('sessionToken', ''); localStorage.setItem('user', '');
    // Admin Logout ^

    // set name
    setFirstName(getUser().firstName);
    // set greeting and background by current time
    var today = new Date();
    if (today.getHours() < 12){
      setBgSrc("./assets/fields/morning2.jpg");
      setGreeting("Good morning");
    } else if (today.getHours() < 19){
      setBgSrc("./assets/fields/afternoon.jpg");
      setGreeting("Good afternoon");
    } else {
      setBgSrc("./assets/fields/evening.jpg");
      setGreeting("Good evening");
    }
  });

  return (
    <div className="w-screen h-screen">
      <div>
        <div className="flex justify-center">
          <i className="morningTxt font-bold">{greeting}, {firstName}!</i>
        </div>
        <div className="flex justify-center">
          <Button onClick={() => setPage('emailSetup')} 
                  text="Send Email" txtColor={lightGreen} fontSize="45px"
                  bgColor={solidGreen} width="700px" height="135px" 
                  marginTop="30px" borderRadius="10px"  
          />
        </div>
        <div className="flex justify-center">
          <Button onClick={() => setPage('letterSetup')} 
                  text="Download Letter" txtColor={lightGreen} fontSize="45px"
                  bgColor={solidGreen} width="700px" height="135px" 
                  marginTop="30px" borderRadius="10px"  
          />
        </div>
        <div className="flex justify-center">
          <Button onClick={() => setPage('home')} 
                  text="Emails Sent" txtColor={lightBlue} fontSize="25px"
                  bgColor={solidBlue} width="300px" height="100px" 
                  marginTop="30px" borderRadius="10px"  
          />
          <div style={{width: "15px"}}></div>
          <Button onClick={() => setPage('downloadedLetters')} 
                  text="Letters Downloaded" txtColor={lightBlue} fontSize="25px"
                  bgColor={solidBlue} width="300px" height="100px" 
                  marginTop="30px" borderRadius="10px"  
          />
          <div style={{width: "15px"}}></div>
          <Button onClick={() => setPage('home')} 
                  text="My Representatives" txtColor={lightBlue} fontSize="25px"
                  bgColor={solidBlue} width="300px" height="100px" 
                  marginTop="30px" borderRadius="10px"  
          />
        </div>
      </div>
      <BgImage opacity={.3} src={bgSrc} />
    </div>
  );
}
