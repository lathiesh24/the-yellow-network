"use client"
import React, { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import NavBar from './Navbar';
import DefaultCard from './DefaultCard';
import Prompt from './Prompt';
import axios from 'axios';

export default function HomePage() {
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [systemResponses, setSystemResponses] = useState([]);

  const handleSaveInput = async (input: string) => {
    console.log("inputinhomepage",input)
    let userquery = {"userquery":input}
    console.log("userquery",userquery)

    setUserMessages([...userMessages, input]); 

    try{
      console.log("input in url",input)
      console.log("api is called")
      const response = await axios.post("http://127.0.0.1:8000/api/prompt/ragsearch/",userquery)
      let startupResults = response.data
      console.log("startupResults",startupResults)
      setSystemResponses(prevResponses => [...prevResponses, startupResults]);
      console.log("responseinprompt",response)
    } catch(error) {
      console.log("erroringettingstartups",error)
    }

 
  };
  console.log("systemResponsess",systemResponses)
  console.log("userMessages",userMessages)
  const renderMessages = () => {
    const messages = [];
    for (let i = 0; i < userMessages.length || i < systemResponses.length; i++) {
      if (userMessages[i]) {
        messages.push(
          <div key={`user-${i}`} className="flex flex-col gap-y-2 my-6 py-2 px-4 shadow-sm rounded-lg">
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
          <div key={`system-${i}`} className="flex flex-col gap-y-2 my-6 py-2 px-4 bg-white shadow-sm rounded-lg">
            <div className='flex gap-x-1'>
              <div className="text-yellow-400">
                <RxAvatar size={23} />
              </div>
              <div className='font-semibold text-black'>Game plan</div>
            </div>
            <div className='text-black' key={`system-${i}`}>
              <div>
                <div className='grid grid-cols-3 font-semibold text-base'>
                      <div>Startup Name</div>
                      <div>Product/Service</div>
                      <div>Website</div>
                </div>
                {systemResponses[i] && systemResponses[i].results.map((result:any,index:number)=> (
                  <div className='grid grid-cols-3 mt-4 rounded shadow-md p-2'>
                        <div>{result?.startup_name}</div>
                        <div>{result?.startup_technology}</div>
                        <div>{result?.startup_url}</div>
                    </div>
                ))}
              </div>
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
