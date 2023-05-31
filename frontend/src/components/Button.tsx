import React, { useState, useEffect } from "react";
import setPage from "..";

interface ButtonProps {
    onClick: () => void;
    text: string;
    txtColor: string;
    fontSize: string;
    bgColor: string;
    width: string;
    height: string;
    marginTop: string;
    borderRadius: string;
}

const Button: React.FC<ButtonProps> = 
({ onClick, text, txtColor, fontSize, bgColor, width, height, marginTop, borderRadius }) => {

    const btn_dynamic_styles = {
        width: width,
        color: txtColor,
        background: bgColor,
        height: height,
        fontSize: fontSize,
        marginTop: marginTop,
        borderRadius: borderRadius
    };

    return (
        <div onClick={onClick} style={btn_dynamic_styles} className="button font-bold">
            {text}
        </div>
    );
}

export default Button;