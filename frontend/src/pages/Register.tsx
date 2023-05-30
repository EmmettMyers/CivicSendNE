import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import NavBar from '../components/Navbar';
import BgImage from '../components/BgImage';
import AccountInput from "../components/AccountInput";
import GreenButton from "../components/GreenButton";

const Register: React.FC = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    const createAccount = (): void => {
        if(verifyInputs()){
            let userAddress: Address = { 
                line1: address,
                city: city,
                state: "NE",
                zip: Number(zip)
            };
            let userInfo: User = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                address: userAddress
            };
            // make post request to make an account
            fetch('/createAccount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo)
            }) .then(response => response.json()) .then(responseData => {
                alert(responseData);
            }) .catch(error => {
                console.error(error);
            });
        }
    };

    const verifyInputs = (): boolean => {
        // verify NE checkbox is checked
        const checkbox = document.getElementById("neCheckbox") as HTMLInputElement;
        if (!checkbox.checked){
            return false;
        }
        // verify no input is empty
        if (!(firstName && lastName && email && password && address && city && zip)){
            return false;
        }
        // verify email is correct format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            return false;
        }
        // verify password is at least 8 characters long
        if (password.length < 8){
            return false;
        }
        // verify user location
        fetch('/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(zip)
        }) .then(response => response.json()) .then(responseData => {
            if (responseData == "False"){
                return false;
            }
        }) .catch(error => {
            console.error(error);
        });
        return true;
    };

    return (
        <div className="w-screen h-screen">
        <NavBar />
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
                <div className="float-right" style={{marginRight: "90px"}}>
                    <p id="errorMessage">Incorrect first name input.</p>
                    <GreenButton 
                        onClick={() => createAccount()} 
                        text="Submit" 
                        width="250px" 
                        height="50px" 
                        fontSize="25px" 
                        marginTop="20px"
                        borderRadius="10px"  
                    />
                </div>
            </div>
        </div>
        <BgImage src="./assets/neSenate2.jpg" />
        </div>
    );
}

export default Register;