import React, { useState, useEffect } from "react";

interface BgImageProps {
    src: string;
}

const BgImage: React.FC<BgImageProps> = ({ src }) => {    
    return (
        <img src={src} className="bgImage fixed left-0 bottom-0 w-full h-full object-cover" />
    );
}

export default BgImage;