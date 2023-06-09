import React, { useState, useEffect } from "react";
import { HomeLoggedIn, HomeLoggedOut } from './pages/Home';
import Register from "./pages/Register";
import { loggedIn } from "./authenticator";
import Navbar from "./components/Navbar";
import EmailEditor from "./pages/EmailEditor";
import MailComplete from "./pages/MailComplete";
import LetterEditor from "./pages/LetterEditor";
import MailSetup from "./pages/MailSetup";
import DownloadedLetters from "./pages/DownloadedLetters";

interface AppProps {
    page: string;
}

const App: React.FC<AppProps> = ({ page }) => {
    let pageComponent;
    let navHighlight = "";

    switch (page) {
        case 'downloadedLetters':
            pageComponent = <DownloadedLetters />;
            break;
        case 'letterSent':
            pageComponent = <MailComplete mailType="letter" />;
            navHighlight = "letter";
            break;
        case 'emailSent':
            pageComponent = <MailComplete mailType="email" />;
            navHighlight = "email";
            break;
        case 'letterEditor':
            pageComponent = <LetterEditor />;
            navHighlight = "letter";
            break;
        case 'emailEditor':
            pageComponent = <EmailEditor />;
            navHighlight = "email";
            break;
        case 'letterSetup':
            pageComponent = <MailSetup mailType="letter" />;
            navHighlight = "letter";
            break;
        case 'emailSetup':
            pageComponent = <MailSetup mailType="email" />;
            navHighlight = "email";
            break;
        case 'register':
            pageComponent = <Register />;
            break;
        default:
            if (loggedIn()){
                pageComponent = <HomeLoggedIn />
                navHighlight = "home";
            } else {
                pageComponent = <HomeLoggedOut />;
            }
            break;
    }

    return (
        <>
            <Navbar highlight={navHighlight} />
            {pageComponent}
        </>
    );
}

export default App;