import React, { useState, useEffect } from "react";

interface BgImageProps {
    opacity: number;
    src: string;
}

const BgImage: React.FC<BgImageProps> = ({ opacity, src }) => {    

    const bgImage_dynamic_styles = {
        opacity: opacity
    };

    return (
        <img 
            src={src} 
            style={bgImage_dynamic_styles} 
            className="bgImage fixed left-0 bottom-0 w-full h-full object-cover" 
        />
    );
}

export default BgImage;