import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import DefaultCard from "./DefaultCard";

interface PromptProps {
  open: boolean;
  onSaveInput: (input: string) => void;
  defaultPrompt: string;
  renderMessages: () => JSX.Element[];
  inputPrompt: string;
  setInputPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleToggleLeftFrame: () => void;
  openRightFrame: boolean;
  handleToggleRightFrame: () => void;
}

const Prompt: React.FC<PromptProps> = ({ open, onSaveInput, defaultPrompt, renderMessages, inputPrompt, setInputPrompt, handleToggleLeftFrame, handleToggleRightFrame }) => {

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

  const handleTextareaClick = () => {
    handleToggleLeftFrame();
    handleToggleRightFrame();
  };

  console.log("Inputprompt", inputPrompt)

  return (
    <div className=" flex flex-col w-full items-center justify-center ">
      <div className="prompt-container overflow-y-auto">
        {renderMessages().length === 0 ?
          (
            <>
              <div className="flex justify-center items-center font-semibold text-2xl mt-12">
                What problem are you trying to solve?
              </div>
              <div className="xl:mt-28 lg:mt-16">
                <DefaultCard onSelectCard={handleCardSelect} />
              </div>
            </>
          ) : (
            <div className="w-[656px] mb-8 md:mb-16">
              {renderMessages()}
            </div>
          )}
      </div>
      <div className="bg-white w-4/6 rounded-lg shadow-lg ">
        <div className="flex items-center ">
          <textarea
            className="flex-1 focus:outline-none py-4 px-4 rounded-md resize-none overflow-hidden text-[14px]"
            placeholder="Provide your problem statement to be solved..."
            rows={1}
            autoFocus
            value={inputPrompt}
            onChange={handleInputChange}
            onClick={handleTextareaClick}
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
