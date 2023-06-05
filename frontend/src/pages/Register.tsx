import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import NavBar from '../components/Navbar';
import BgImage from '../components/BgImage';
import AccountInput from "../components/AccountInput";
import Button from "../components/Button";
import setPage from "..";
import { lightGreen, solidGreen } from "../styles/colors";
import axios from "axios";
import ProgressBar from "../components/ProgressBar";

const Register: React.FC = () => {
    const [showLoader, setShowLoader] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    const createAccount = async () => {
        const errorInsert = document.getElementById("error") as HTMLElement;
        errorInsert.textContent = "";
        const error = await checkErrors();
        errorInsert.textContent = error;
        if(!error){
            setShowLoader(true);
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
            // make post request to make an account
            setShowLoader(true);
            const createAccPost = await axios.post('/createAccount', userInfo);
            var loginInfo = {
                email: email,
                password: password
            }
            const response = await axios.post('/login', loginInfo);
            localStorage.setItem('sessionToken', response.data.sessionToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setShowLoader(false);
            setPage('home');
        }
    };

    const checkErrors = async () => {
        // verify NE checkbox is checked
        const checkbox = document.getElementById("neCheckbox") as HTMLInputElement;
        if (!checkbox.checked){
            return "Check the box to verify you live in Nebraska.";
        }
        // verify no input is empty
        if (!(firstName && lastName && email && password && address && city && zip)){
            return "Invalid input: there are missing inputs.";
        }
        // verify email is correct format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            return "Invalid email: email is not the correct format.";
        }
        // verify no accounts use that email
        const emailFetch = await axios.post('/checkAccount', { email });
        const emailData = emailFetch.data;
        if (emailData) {
            return "An account with that email already exists.";
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
            { showLoader ?
                <ProgressBar /> :
                <>
                    <img src="./assets/backArrow.png" className="exit absolute" onClick={() => setPage('home')} />
                    <div className="flex justify-center">
                        <div className="registerBox rounded-xl">
                            <h1 className="font-bold">Create an Account</h1>
                            <AccountInput onChange={setFirstName} label="First Name" />
                            <AccountInput onChange={setLastName} label="Last Name" />
                            <AccountInput onChange={setEmail} label="Email" />
                            <AccountInput onChange={setPassword} label="Password" />
                            <AccountInput onChange={setAddress} label="Address" />
                            <AccountInput onChange={setCity} label="City" />
                            <AccountInput onChange={setZip} label="ZIP Code" />
                            <label className="residentCheck flex items-center font-medium">
                                <input id="neCheckbox" type="checkbox" className="form-checkbox mr-2" />
                                <span>I am a resident of the state of Nebraska.</span>
                            </label>
                            <div className="flex justify-between">
                                <p id="error" className="text-red-700 font-semibold"></p>
                                <div style={{marginRight: "90px"}}>
                                    <Button onClick={() => createAccount()} 
                                            text="Submit" txtColor={lightGreen} fontSize="25px" 
                                            bgColor={solidGreen} width="250px" height="50px" 
                                            marginTop="20px" borderRadius="10px"  
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <BgImage opacity={.08} src="./assets/neSenate2.jpg" />
                </>
            }
        </div>
    );
}

export default Register;