import React, { useState, useEffect } from "react";
import '../styles/Home.css';

interface YourRepBoxProps {
    senators: Representative[];
    title: string;
    type: JSX.Element;
}

const YourRepBox: React.FC<YourRepBoxProps> = ({ senators, title, type }) => {
    const [bottomText, setBottomText] = useState<JSX.Element | null>(null);

    return (
        <div className="yourRepBox rounded-md relative">
            <div className="title w-full text-center font-bold" 
                dangerouslySetInnerHTML={{ __html: title }} />
            {senators.map((senator: Representative) => (
                <div className="flex justify-center">
                    <div className="repBox rounded-md relative">
                        <div className="topTxt absolute top-0 w-full text-center">
                            <p className="font-semibold">{senator.firstName} {senator.lastName}</p>
                        </div>
                        <div className="flex justify-center items-center mt-7">
                            <img className="rounded-md w-100 opacity-80" src={senator.image} />
                        </div>
                        <i className="bottomTxt absolute bottom-0 w-full text-center">
                            {type} {senator.district != 0 && senator.district}
                        </i>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default YourRepBox;