"use client"
import React, { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import NavBar from './Navbar';
import DefaultCard from './DefaultCard';
import Prompt from './Prompt';

export default function HomePage() {
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [systemResponses, setSystemResponses] = useState<string[]>([]);

  const handleSaveInput = (input: string) => {
    setUserMessages([...userMessages, input]);
    const systemResponse = `System response to "${input}"`;
    setSystemResponses([...systemResponses, systemResponse]);
  };

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
    <main className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <NavBar />
      </div>
      {!userMessages.length && (
        <>
          <div className="flex justify-center items-center mb-16 font-semibold text-2xl">
            What problem are you trying to solve?
          </div>
          <div className="mt-auto flex justify-center items-center">
            <DefaultCard />
          </div>
        </>
      )}
      <div className="mt-auto flex flex-col justify-start items-center overflow-y-auto">
        <div className=" mb-32 w-[656px] ">
          {renderMessages()}
        </div>
        <Prompt onSaveInput={handleSaveInput} />
      </div>
    </main>
  );
}
