import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import BgImage from '../components/BgImage';
import AccountInput from "../components/AccountInput";
import Button from "../components/Button";
import setPage from "..";
import { lightBlue, lightGreen, solidBlue, solidGreen } from "../styles/colors";
import axios from "axios";
import { getUser } from "../authenticator";

const YourAccount: React.FC = () => {
    const [editing, setEditing] = useState<boolean>(false);

    const [firstName, setFirstName] = useState(getUser().firstName);
    const [lastName, setLastName] = useState(getUser().lastName);
    const [email, setEmail] = useState(getUser().email);
    const [password, setPassword] = useState(getUser().password);
    const [address, setAddress] = useState(getUser().address.line1);
    const [city, setCity] = useState(getUser().address.city);
    const [zip, setZip] = useState(getUser().address.zip);

    const startEditing = async () => {
        setEditing(true);
    };

    const setAccount = async () => {
        const errorInsert = document.getElementById("error") as HTMLElement;
        errorInsert.textContent = "";
        const error = await checkErrors();
        errorInsert.textContent = error;
        if(!error){
            setPage('home')
            let userInfo: User = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                address: {
                    line1: address,
                    city: city,
                    state: "NE",
                    zip: Number(zip)
                }
            };
            const editAccountPost = await axios.post('/setAccount', userInfo);
            var loginInfo = {
                email: email,
                password: password
            }
            const response = await axios.post('/login', loginInfo);
            localStorage.setItem('sessionToken', response.data.sessionToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setEditing(false);
        }
    };

    const checkErrors = async () => {
        // verify no input is empty
        if (!(firstName && lastName && email && password && address && city && zip)){
            return "Invalid input: there are missing inputs.";
        }
        // verify password is at least 8 characters long
        if (password.length < 8){
            return "Password must be at least 8 characters long.";
        }
        // verify user location is real
        const verifyFetch = await axios.post('/verifyLocation', { zip });
        const locationData = verifyFetch.data;
        if (!locationData) {
            return "User location is invalid or not located in Nebraska.";
        }
        return "";
    }

    return (
        <div className="w-screen h-screen">
            <img src="./assets/backArrow.png" className="exit absolute" onClick={() => setPage('home')} />
            <div className="flex justify-center">
                <div className="registerBox rounded-xl">
                    <h1 className="font-bold" style={{marginBottom: "20px"}}>My Account</h1>
                    <AccountInput disabled={!editing} value={firstName} onChange={setFirstName} label="First Name" />
                    <AccountInput disabled={!editing} value={lastName} onChange={setLastName} label="Last Name" />
                    <AccountInput disabled={true} value={email} onChange={setEmail} label="Email" />
                    <AccountInput disabled={!editing} value={password} onChange={setPassword} label="Password" />
                    <AccountInput disabled={!editing} value={address} onChange={setAddress} label="Address" />
                    <AccountInput disabled={!editing} value={city} onChange={setCity} label="City" />
                    <AccountInput disabled={!editing} value={zip} onChange={setZip} label="ZIP Code" />
                    <div className="flex justify-between">
                        <p id="error" className="text-red-700 font-semibold"></p>
                        <div style={{marginRight: "90px"}}>
                            {editing ?
                                <Button onClick={() => setAccount()} 
                                        text="Submit" txtColor={lightGreen} fontSize="25px" 
                                        bgColor={solidGreen} width="250px" height="50px" 
                                        marginTop="30px" borderRadius="10px"  
                                />
                            :
                                <Button onClick={() => startEditing()} 
                                        text="Edit" txtColor={lightBlue} fontSize="25px" 
                                        bgColor={solidBlue} width="250px" height="50px" 
                                        marginTop="30px" borderRadius="10px"  
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <BgImage opacity={.08} src="./assets/neSenate2.jpg" />
        </div>
    );
}

export default YourAccount;