import React, { useState, useEffect } from "react";
import { HomeLoggedIn, HomeLoggedOut } from './pages/Home';
import Register from "./pages/Register";
import { loggedIn } from "./authenticator";
import Navbar from "./components/Navbar";
import EmailSetup from "./pages/MailSetup";
import EmailEditor from "./pages/EmailEditor";

interface AppProps {
    page: string;
}

const App: React.FC<AppProps> = ({ page }) => {
    let pageComponent;
    let navHighlight = "";

    switch (page) {
        case 'emailEditor':
            pageComponent = <EmailEditor />;
            navHighlight = "email";
            break;
        case 'letterEditor':
            pageComponent = <EmailSetup mailType="letter" />;
            navHighlight = "letter";
            break;
        case 'letterSetup':
            pageComponent = <EmailSetup mailType="letter" />;
            navHighlight = "letter";
            break;
        case 'emailSetup':
            pageComponent = <EmailSetup mailType="email" />;
            navHighlight = "email";
            break;
        case 'register':
            pageComponent = <Register />;
            break;
        case 'home':
            if (loggedIn()){
                pageComponent = <HomeLoggedIn />
                navHighlight = "home";
            } else {
                pageComponent = <HomeLoggedOut />;
            }
            break;
        default:
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