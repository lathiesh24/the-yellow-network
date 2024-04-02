import React from 'react';

interface HistoryBarProps {
    open: boolean;
}

const HistoryBar: React.FC<HistoryBarProps> = ({ open }) => {
    const chatHistory = [
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

    return (
        <>
            <div className='fixed inset-0 max-w-56 shadow-md bg-white h-screen '>
                <div className="flex flex-col ">
                    <div className='mt-4 flex justify-center items-center'>
                        <img
                            src='/tyn-logo.png'
                            alt='The Yellow Network'
                            width={160}
                        />
                    </div>
                    <div className='h-screen overflow-y-auto mt-4'>
                        <div className='text-sm py-3 px-2 text-gray-400 font-semibold'>
                            Chat History
                        </div>
                        <div className=''>
                            {chatHistory.map((item, index) => {
                                return (
                                    <div key={index} className="mx-1 px-3 py-2.5 overflow-hidden overflow-ellipsis  whitespace-nowrap text-[14px] hover:bg-gray-200 font-normal hover:font-medium rounded-sm hover:text-gray-600">
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HistoryBar