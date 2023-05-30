import React, { useState, useEffect } from "react";
import setPage from "..";

interface GreenButtonProps {
    onClick: () => void;
    text: string;
    width: string;
    height: string;
    fontSize: string;
    marginTop: string;
    borderRadius: string;
}

const GreenButton: React.FC<GreenButtonProps> = ({ onClick, text, width, height, fontSize, marginTop, borderRadius }) => {

    const btn_dynamic_styles = {
        width: width,
        height: height,
        fontSize: fontSize,
        marginTop: marginTop,
        borderRadius: borderRadius
    };

    return (
        <div onClick={onClick} style={btn_dynamic_styles} className="greenBtn font-bold">
            {text}
        </div>
    );
}

export default GreenButton;