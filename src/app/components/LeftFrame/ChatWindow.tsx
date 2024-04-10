import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const ChatWindow: React.FC = () => {
    const messages = [
        { sender: "Kissflow", message: "Need platforms for developing a low code no code tool" },
        { sender: "Third AI", message: "I need to use AI platform in my CPU" },
        { sender: "Jane", message: "Hi! How can I help you?" },
    ];

    return (
        <>
            <div className='text-sm py-3 px-2 text-gray-400 font-semibold'>
                Chat Window
            </div>
            <div>
                {messages.map((message, index) => (
                    <div className='border bg-gray-100 flex flex-row items-center py-3 cursor-pointer hover:bg-yellow-300 text-gray-400 hover:text-black' key={index}>
                        <div className=''>
                            <FaUserCircle className=" h-10 w-10" />
                        </div>
                        <div className='overflow-hidden flex flex-col ml-1.5 text-black'>
                            <div className='mt-1 text-sm font-medium '>{message.sender}</div>
                            <div className='text-[13px] whitespace-nowrap font-light'>{message.message}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ChatWindow;
