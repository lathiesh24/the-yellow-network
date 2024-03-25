import React, { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';

interface PromptProps {
    onSaveInput: (input: string) => void;
}

const Prompt: React.FC<PromptProps> = ({ onSaveInput }) => {
    const [inputPrompt, setInputPrompt] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputPrompt(event.target.value);
    };

    const handleSendClick = () => {
        onSaveInput(inputPrompt);
        setInputPrompt('');
    };

    useEffect(() => {
        console.log("SavedInput", onSaveInput);
    }, [onSaveInput]);

    return (
        <div className="fixed  bottom-0 flex justify-center items-center bg-white mb-12 w-[800px] rounded-lg shadow-md">
            <div className="flex-1 flex items-center">
                <textarea
                    className="flex-1 focus:outline-none py-5 px-4 rounded-md border-none resize-none overflow-hidden text-[14px]"
                    placeholder="Provide your problem statement to be solved..."
                    rows={1}
                    autoFocus
                    value={inputPrompt}
                    onChange={handleInputChange}
                />
                <div className='px-8 cursor-pointer' onClick={handleSendClick}>
                    <IoMdSend size={23} />
                </div>
            </div>
        </div>
    );
}

export default Prompt;
