import React from 'react';

const DefaultCard: React.FC = () => {

    const cardData = [
        "Need AI platforms improving patient diagnosis accuracy in healthcare.",
        "Looking for IoT solutions to enhance smart home security.",
        "Looking for platforms enhancing remote collaboration with VR.",
        "Seeking startups improving pharmaceutical R&D with machine learning."
    ]

    return (
        <div className="flex justify-center ml-[350px] mr-[330px] mb-8">
            <div className="flex flex-col">
                {cardData.slice(0, 2).map((item, index) => {
                    return (
                        <div key={index} className="border rounded-md bg-white mb-4 p-6">{item}</div>
                    )
                })}
            </div>
            <div className="flex flex-col mx-4">
                {cardData.slice(2).map((item, index) => {
                    return (
                        <div key={index} className="border rounded-md bg-white mb-4 p-6">{item}</div>
                    )
                })}
            </div>
        </div>
    );
}

export default DefaultCard;
