import React from 'react';

interface HistoryBarProps {
    onSelectHistory: (value: string) => void;
}

const HistoryBar: React.FC<HistoryBarProps> = ({ onSelectHistory }) => {
    const data = [
        "which company contribute to seamless health information integration?",
        "Give me list of startups leveraging AI in Quantum computing",
        "I need a platform which is capable to manage 'n' number of clouds in single platform and migration should be simple to do",
        "In my organisation if anything happened, I need to recover the data.",
        "Give me the startups provide innovative services, to empower IoT initiatives across diverse industries, ensuring seamless integration",
        "I am facing access control challenges with full manually. I need a startup who can help me",
        "I am facing a problem in complex search, I need a platfrom to enhance my search",
        "I need to change data from document into applicable understanding",
        "I need to build a GenAI application in my cloud in less time"
    ]

    const sendQueryHistory = (value: string) => {
        onSelectHistory(value);
    };

    return (
        <>
            <div className=''>
                <div className='text-sm py-3 px-2 text-gray-400 font-semibold'>
                    Query History
                </div>
                <div className=''>
                    {data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="mx-1 px-3 py-2.5 overflow-hidden overflow-ellipsis  whitespace-nowrap text-[14px] hover:bg-gray-200 font-normal hover:font-medium rounded-sm hover:text-gray-600 cursor-pointer"
                                onClick={() => sendQueryHistory(item)}
                            >
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default HistoryBar