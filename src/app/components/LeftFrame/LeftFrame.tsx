import React, { useState, useRef, useEffect } from 'react';
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
import { GrLogout } from "react-icons/gr";
import { useRouter } from 'next/navigation';

interface UserInfo {
    email: string;
    first_name: string;
}

interface LeftFrameProps {
    open: boolean;
    inputPrompt: string;
    setInputPrompt: React.Dispatch<React.SetStateAction<string>>;
    userInfo: UserInfo;
}


const LeftFrame: React.FC<LeftFrameProps> = ({ open, inputPrompt, setInputPrompt, userInfo }) => {

    const [activeTab, setActiveTab] = useState<string>('spotlight');
    const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);
    const logoutRef = useRef<HTMLDivElement>(null);
    const navigate = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (logoutRef.current && !logoutRef.current.contains(event.target as Node)) {
                setIsLogoutOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleHistorySelect = (value: string) => {
        setInputPrompt(value);
    };

    const showDropdown = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsLogoutOpen(!isLogoutOpen);
    };

    const handleLogout = (event: React.MouseEvent) => {
        event.stopPropagation();
        localStorage.removeItem("userInfo");
        setIsLogoutOpen(false);
        navigate.push('/login');
    };

    return (
        <div className='h-screen z-50 flex flex-col bg-white relative top-0 left-0'>
            <div className='flex justify-center items-center bg-white shadow-md p-4 z-20'>
                <img
                    src='/tyn-logo.png'
                    alt='The Yellow Network'
                    width={160}
                />
            </div>
            <div className='flex-grow overflow-y-auto scrollbar-thin'>
                <div className="flex flex-row justify-between mx-4 mt-6 mb-3">
                    <div className={`cursor-pointer ${activeTab === 'recommended' ? 'text-yellow-500' : 'text-gray-500'}`} onClick={() => handleTabClick('recommended')} title="Recommended Queries">
                        <BsFillSearchHeartFill size={23} />
                    </div>
                    <div className={`cursor-pointer ${activeTab === 'history' ? 'text-yellow-500' : 'text-gray-500'}`} onClick={() => handleTabClick('history')} title="Chat History">
                        <FaHistory size={23} />
                    </div>
                    <div className={`cursor-pointer ${activeTab === 'spotlight' ? 'text-yellow-500' : 'text-gray-500'}`} onClick={() => handleTabClick('spotlight')} title="Startup Spotlight">
                        <LuLampDesk size={23} />
                    </div>
                    <div className={`cursor-pointer ${activeTab === 'connects' ? 'text-yellow-500' : 'text-gray-500'}`} onClick={() => handleTabClick('connects')} title="Connects">
                        <FiLink size={23} />
                    </div>
                    <div className={`cursor-pointer ${activeTab === 'chat' ? 'text-yellow-500' : 'text-gray-500'}`} onClick={() => handleTabClick('chat')} title="Chat Window">
                        <IoChatbubblesSharp size={23} />
                    </div>
                </div>
                {activeTab === 'history' && <HistoryBar onSelectHistory={handleHistorySelect} />}
                {activeTab === 'recommended' && <RecommendedQueries onSelectHistory={handleHistorySelect} />}
                {activeTab === 'chat' && <ChatWindow />}
                {activeTab === 'connects' && <Connects />}
                {activeTab === 'spotlight' && <Spotlight />}
            </div>
            <div className='px-8 py-3 shadow-md flex items-center justify-between z-20 cursor-pointer border' onClick={showDropdown} ref={logoutRef}>
                {userInfo?.first_name}
                {isLogoutOpen && (
                    <div className="absolute flex justify-between bottom-0 left-0 mb-12 bg-white border  px-8 py-3 z-10 w-full" onClick={handleLogout}>
                        <div>Logout</div>
                        <div><GrLogout size={23} /></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LeftFrame;
