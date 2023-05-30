import React, { useState, useEffect } from "react";
import { HomeLoggedIn, HomeLoggedOut } from './pages/Home';
import { isLoggedIn } from "./authenticator";
import Register from "./pages/Register";

interface AppProps {
    page: string;
}

const App: React.FC<AppProps> = ({ page }) => {
    switch (page) {
        case 'register':
            return <Register />;
        case 'home':
            if(isLoggedIn()){
                return <HomeLoggedIn />
            } 
            return <HomeLoggedOut />;
        default:
            return <HomeLoggedOut />;
    }
}

export default App;