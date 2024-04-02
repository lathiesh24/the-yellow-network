import React from 'react';

interface DefaultCardProps {
    onSelectCard: (value: string) => void;
}

const DefaultCard: React.FC<DefaultCardProps> = ({ onSelectCard }) => {

    const cardData = [
        "Need AI platforms improving patient diagnosis accuracy in healthcare.",
        "Looking for IoT solutions to enhance smart home security.",
        "Looking for platforms enhancing remote collaboration with VR.",
        "Seeking startups improving pharmaceutical R&D with machine learning."
    ];

    const handleCardClick = (value: string) => {
        onSelectCard(value);
    };

    return (
        <div className="flex justify-center mb-12 gap-x-4 text-[12px] ">
            <div className="flex flex-col w-[356px]">
                {cardData.slice(0, 2).map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="border rounded-md bg-white mb-4 p-6 shadow-md cursor-pointer hover:bg-blue-50 hover:font-medium transition duration-150 ease-in-out"
                            onClick={() => handleCardClick(item)}
                        >
                            {item}
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col w-[356px] ">
                {cardData.slice(2).map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="border rounded-md bg-white mb-4 p-6 shadow-md cursor-pointer hover:bg-blue-50 hover:font-medium transition duration-150 ease-in-out"
                            onClick={() => handleCardClick(item)}
                        >
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DefaultCard;
