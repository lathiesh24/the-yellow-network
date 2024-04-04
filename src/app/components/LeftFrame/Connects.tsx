import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const Connects: React.FC = () => {
    const [expandedConnections, setExpandedConnections] = useState(false);
    const [expandedInvitations, setExpandedInvitations] = useState(false);
    const [expandedRequests, setExpandedRequests] = useState(false);

    const toggleConnections = () => {
        setExpandedConnections(!expandedConnections);
    };

    const toggleInvitations = () => {
        setExpandedInvitations(!expandedInvitations);
    };

    const toggleRequests = () => {
        setExpandedRequests(!expandedRequests);
    };

    return (
        <div className='h-screen overflow-y-auto'>
            <div className='text-sm py-3 px-2 text-gray-400 font-semibold'>
                Connects
            </div>
            <div className=''>
                <div className={`border bg-gray-100 flex flex-row items-center py-3 cursor-pointer hover:bg-blue-100 text-gray-400 hover:text-black mb-1`} onClick={toggleConnections}>
                    <div className='flex flex-col ml-1.5 text-black'>
                        <div className='mt-1 text-sm font-medium'>Connections</div>
                    </div>
                    <div className='flex items-center ml-auto mr-2'>
                        <span className='text-xs text-gray-500 mr-1'>3</span>
                        <FaAngleDown className={`text-gray-500 transition-transform transform ${expandedConnections ? 'rotate-0' : 'rotate-180'}`} />
                    </div>
                </div>
                <div className={`border bg-gray-100 flex flex-row items-center py-3 cursor-pointer hover:bg-blue-100 text-gray-400 hover:text-black mb-1`} onClick={toggleInvitations}>
                    <div className='flex flex-col ml-1.5 text-black'>
                        <div className='mt-1 text-sm font-medium'>Invitations</div>
                    </div>
                    <div className='flex items-center ml-auto mr-2'>
                        <span className='text-xs text-gray-500 mr-1'>12</span>
                        <FaAngleDown className={`text-gray-500 transition-transform transform ${expandedInvitations ? 'rotate-0' : 'rotate-180'}`} />
                    </div>
                </div>
                <div className={`border bg-gray-100 flex flex-row items-center py-3 cursor-pointer hover:bg-blue-100 text-gray-400 hover:text-black mb-1`} onClick={toggleRequests}>
                    <div className='flex flex-col ml-1.5 text-black'>
                        <div className='mt-1 text-sm font-medium'>Request Sent</div>
                    </div>
                    <div className='flex items-center ml-auto mr-2'>
                        <span className='text-xs text-gray-500 mr-1'>7</span>
                        <FaAngleDown className={`text-gray-500 transition-transform transform ${expandedRequests ? 'rotate-0' : 'rotate-180'}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Connects;
