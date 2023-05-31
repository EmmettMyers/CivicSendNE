import React, { useState, useEffect } from "react";
import { HomeLoggedIn, HomeLoggedOut } from './pages/Home';
import Register from "./pages/Register";
import { loggedIn } from "./authenticator";

interface AppProps {
    page: string;
}

const App: React.FC<AppProps> = ({ page }) => {
    switch (page) {
        case 'register':
            return <Register />;
        case 'home':
            if(loggedIn()){
                return <HomeLoggedIn />
            } 
            return <HomeLoggedOut />;
        default:
            return <HomeLoggedOut />;
    }
}

export default App;