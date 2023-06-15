import React, { useState } from 'react';
import '../styles/Home.css';
import setPage from '..';

interface TemplateBoxProps {
    name: string;
    onClick: (name: string) => void;
}

const TemplateBox: React.FC<TemplateBoxProps> = ({ onClick, name }) => {
    return (
        <div className="templateBox" onClick={() => onClick(name)}>
            <div className="flex justify-center items-center h-full">
                <p className="font-semibold text-center">{name}</p>
            </div>
        </div>
    );
};

export default TemplateBox;
