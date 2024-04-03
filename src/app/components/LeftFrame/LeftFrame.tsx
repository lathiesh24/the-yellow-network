import React, { useState } from 'react';
import HistoryBar from './HistoryBar';
import RecommendedQueries from './RecommendedQueries';
import ChatWindow from './ChatWindow';
import Connects from './Connects';
import Spotlight from './Spotlight';
import { IoChatbubblesSharp } from "react-icons/io5";
import { FiLink } from "react-icons/fi";
import { LuLampDesk } from "react-icons/lu";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";

interface LeftFrameProps {
    open: boolean;
}

const LeftFrame: React.FC<LeftFrameProps> = ({ open }) => {
    const [activeTab, setActiveTab] = useState<string>('history');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='fixed left-0 top-0 w-1/5 shadow-md bg-white h-screen z-50'>
            <div className="flex flex-col">
                <div className='mt-4 flex justify-center items-center'>
                    <img
                        src='/tyn-logo.png'
                        alt='The Yellow Network'
                        width={160}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-between mx-4 mt-6 mb-3">
                <div className={` cursor-pointer ${activeTab === 'recommended' ? 'text-gray-500' : 'text-yellow-500'}`} onClick={() => handleTabClick('recommended')} title="Recommended Queries">
                    <BsFillSearchHeartFill size={23} />
                </div>
                <div className={` cursor-pointer ${activeTab === 'history' ? 'text-gray-500' : 'text-yellow-500'}`} onClick={() => handleTabClick('history')} title="Chat History">
                    <FaHistory size={23} />
                </div>
                <div className={` cursor-pointer ${activeTab === 'spotlight' ? 'text-gray-500' : 'text-yellow-500'}`} onClick={() => handleTabClick('spotlight')} title="Startup Spotlight">
                    <LuLampDesk size={23} />
                </div>
                <div className={` cursor-pointer ${activeTab === 'chat' ? 'text-gray-500' : 'text-yellow-500'}`} onClick={() => handleTabClick('chat')} title="Chat Window">
                    <IoChatbubblesSharp size={23} />
                </div>
                <div className={` cursor-pointer ${activeTab === 'connects' ? 'text-gray-500' : 'text-yellow-500'}`} onClick={() => handleTabClick('connects')} title="Connects">
                    <FiLink size={23} />
                </div>
            </div>
            <div>
                {activeTab === 'history' && <HistoryBar />}
                {activeTab === 'recommended' && <RecommendedQueries />}
                {activeTab === 'chat' && <ChatWindow />}
                {activeTab === 'connects' && <Connects />}
                {activeTab === 'spotlight' && <Spotlight />}
            </div>
        </div>
    );
}

export default LeftFrame;
