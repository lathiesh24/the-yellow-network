import React, { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import DefaultCard from './DefaultCard';

interface PromptProps {
    onSaveInput: (input: string) => void;
    defaultPrompt: string;
}

const Prompt: React.FC<PromptProps> = ({ onSaveInput, defaultPrompt }) => {
    const [inputPrompt, setInputPrompt] = useState(defaultPrompt); // Set initial value to defaultPrompt

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
        <div className="fixed bottom-0  w-full flex flex-col items-center justify-center mb-6 md:mb-12 lg:mb-24">
            <div className="font-semibold text-2xl mb-4 md:mb-8 lg:mb-16">
                What problem are you trying to solve?
            </div>
            <div className="mb-4 md:mb-8 lg:mb-16">
                <DefaultCard />
            </div>
            <div className="bg-white w-[656px] rounded-lg shadow-md">
                <div className="flex items-center">
                    <textarea
                        className="flex-1 focus:outline-none py-4 px-4 rounded-md border-none resize-none overflow-hidden text-[14px]"
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
        </div>
    );
}

export default Prompt;
