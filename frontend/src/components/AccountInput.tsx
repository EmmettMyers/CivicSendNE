import React, { useState, useEffect } from "react";

interface AccountInputProps {
    label: string;
    onChange: (value: string) => void;
}

const AccountInput: React.FC<AccountInputProps> = ({ label, onChange }) => {  

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="accountInput flex justify-center">
            <label className="font-medium">{label}:</label>
            <input 
                onChange={handleChange} 
                style={{background: "#CBCBCB"}} 
                className="rounded-md" 
                type="text" 
                autoComplete="off" 
            />
        </div>
    );
}

export default AccountInput;