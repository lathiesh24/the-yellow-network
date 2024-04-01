"use client";
import React, { useState } from 'react';
import DefaultCard from "./components/DefaultCard";
import Navbar from "./components/Navbar";
import Prompt from "./components/Prompt";
import { RxAvatar } from 'react-icons/rx';
import HistoryBar from './components/HistoryBar';
import CompanyProfilePane from './components/CompanyProfilePane';

export default function Page() {
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [systemResponses, setSystemResponses] = useState<string[]>([]);
  const [defaultPrompt, setDefaultPrompt] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleSaveInput = (input: string) => {
    setUserMessages([...userMessages, input]);
    const systemResponse = `System response to "${input}"`;
    setSystemResponses([...systemResponses, systemResponse]);
  };

  const handleSelectPrompt = (prompt: string) => {
    setDefaultPrompt(prompt);
  };

  const handleToggleHistory = () => {
    setOpen(!open);
  }

  const renderMessages = () => {
    const messages = [];
    for (let i = 0; i < userMessages.length || i < systemResponses.length; i++) {
      if (userMessages[i]) {
        messages.push(
          <div key={`user-${i}`} className="flex flex-col gap-y-2 my-6 py-2 px-4 shadow-blue-200 shadow-sm rounded-lg">
            <div className='flex gap-x-1'>
              <div className="text-sky-400">
                <RxAvatar size={23} />
              </div>
              <div className='font-semibold text-black'>You</div>
            </div>
            <div>
              {userMessages[i]}
            </div>
          </div>
        );
      }
      if (systemResponses[i]) {
        messages.push(
          <div key={`system-${i}`} className="flex flex-col gap-y-2 my-6 py-2 px-4 bg-gray-700 shadow-yellow-200 shadow-sm rounded-lg">
            <div className='flex gap-x-1'>
              <div className="text-yellow-400">
                <RxAvatar size={23} />
              </div>
              <div className='font-semibold text-white'>System</div>
            </div>
            <div className='text-white'>
              {systemResponses[i]}
            </div>
          </div>
        );
      }
    }
    return messages;
  };

  return (
    <main className="">
      <div className="">
        <Navbar open={open} handleToggleHistory={handleToggleHistory} />
      </div>
      <div className='flex'>
        <div className="">
          {open && (
            <div className="w-1/4">
              <HistoryBar open={open} />
            </div>
          )}
        </div>
        <div className=''>
          <Prompt onSaveInput={handleSaveInput} defaultPrompt={defaultPrompt} />
        </div>
        <div>
          <CompanyProfilePane />
        </div>
      </div>
    </main>
  );
}
