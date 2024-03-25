import React from 'react';
import { IoMdSend } from "react-icons/io";

const Prompt: React.FC = () => {
    return (
        <div className="flex items-center bg-white mb-24 mx-80 rounded-lg shadow-md">
            <div className="flex-1 flex items-center">
                <textarea
                    className="flex-1 focus:outline-none py-4 px-4 rounded-md border-none resize-none overflow-hidden"
                    placeholder="Provide your problem statement to be solved..."
                    rows={1}
                    autoFocus
                />
                <div className='px-8'>
                    <IoMdSend size={23} />
                </div>
            </div>
        </div>
    );
}

export default Prompt;
