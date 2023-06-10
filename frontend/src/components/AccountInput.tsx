import React, { useState, useEffect } from "react";
import { lightGrey } from "../styles/colors";

interface AccountInputProps {
    disabled: boolean;
    value: string;
    label: string;
    onChange: (value: string) => void;
}

const AccountInput: React.FC<AccountInputProps> = ({ disabled, value, label, onChange }) => {  

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="accountInput flex justify-center">
            <label className="font-medium">{label}:</label>
            <input 
                value={value}
                onChange={handleChange} 
                style={{background: lightGrey}} 
                className="rounded-md" 
                type="text" 
                autoComplete="off" 
                disabled={disabled}
            />
        </div>
    );
}

export default AccountInput;