import React, { useEffect, useState } from 'react';
import BgImage from './BgImage';

const ProgressBar: React.FC = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const delay = setTimeout(() => {
            setWidth(100);
          }, 100);
          return () => clearTimeout(delay);
    }, []);

    return (
        <div className="progBar">
            <p className="title font-bold">Creating your account, 
            <i className="font-black text-red-800"> don't exit the page</i>.</p>
                <div className="outerContainer">
                <div
                    className="innerBar"
                    style={{ width: `${width}%`, transition: 'width 24s linear' }}
                ></div>
            </div>
            <BgImage opacity={.3} src="./assets/neScenery.jpg" />
        </div>
    );
};

export default ProgressBar;