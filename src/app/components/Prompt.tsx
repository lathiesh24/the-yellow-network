import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import DefaultCard from "./DefaultCard";

interface PromptProps {
  onSaveInput: (input: string) => void;
  defaultPrompt: string;
  renderMessages: () => JSX.Element[];
}

const Prompt: React.FC<PromptProps> = ({
  onSaveInput,
  defaultPrompt,
  renderMessages,
}) => {
  const [inputPrompt, setInputPrompt] = useState(defaultPrompt);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputPrompt(event.target.value);
  };

  const handleSendClick = () => {
    onSaveInput(inputPrompt);
    setInputPrompt("");
  };

  const handleCardSelect = (value: string) => {
    setInputPrompt(value);
  };

  return (
    <div className="fixed bottom-0 w-full flex flex-col items-center justify-center mb-6 md:mb-12 lg:mb-24 overflow-y-scroll">
      {renderMessages().length === 0 ? (
        <>
          <div className="font-semibold text-2xl mb-4 md:mb-8 lg:mb-16">
            What problem are you trying to solve?
          </div>
          <div className="mb-4 md:mb-8 lg:mb-16">
            <DefaultCard onSelectCard={handleCardSelect} />
          </div>
        </>
      ) : (
        <div className="w-[656px] mb-8 md:mb-16">{renderMessages()}</div>
      )}
      <div className="bg-white w-[656px] rounded-lg shadow-lg ">
        <div className="flex items-center ">
          <textarea
            className="flex-1 focus:outline-none py-4 px-4 rounded-md resize-none overflow-hidden text-[14px]"
            placeholder="Provide your problem statement to be solved..."
            rows={1}
            autoFocus
            value={inputPrompt}
            onChange={handleInputChange}
          />
          <div className="px-8 cursor-pointer" onClick={handleSendClick}>
            <IoMdSend size={23} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
