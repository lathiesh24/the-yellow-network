import React from 'react';

interface DefaultCardProps {
    onSelectCard: (value: string) => void;
    isInputEmpty: boolean;
    setIsInputEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}

const DefaultCard: React.FC<DefaultCardProps> = ({ onSelectCard, isInputEmpty, setIsInputEmpty }) => {

    const cardData = [
        "Give me list of startups leveraging AI in Quantumcomputing",
        "Seeking AI-driven platforms for talent acquisition and HR analytics.",
        "Looking for platforms enhancing remote collaboration with VR.",
        "Which company contribute to seamless health information integration?"
    ];

    const handleCardClick = (value: string) => {
        onSelectCard(value);
        setIsInputEmpty(false);
    };

    return (
        <div className="flex justify-center mb-12 gap-x-4 text-[12px] ">
            <div className="flex flex-col">
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
            <div className="flex flex-col">
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
