"use client"
import React, { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import NavBar from './Navbar';
import DefaultCard from './DefaultCard';
import Prompt from './Prompt';
import axios from 'axios';
import HistoryBar from './LeftFrame/HistoryBar';
import CompanyProfilePane from './CompanyProfilePane';
import { StartupType } from '../interfaces';
import LeftFrame from './LeftFrame/LeftFrame';

export default function HomePage() {
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [systemResponses, setSystemResponses] = useState([]);
  const [defaultPrompt, setDefaultPrompt] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [selectedStartup, setSelectedStartup] = useState<StartupType>()
  const [openCompanyPane, setOpenCompanyPane] = useState<boolean>(true);
  const [inputPrompt, setInputPrompt] = useState(defaultPrompt);

  const handleToggleHistory = () => {
    setOpen(!open);
  }

  const handleSaveInput = async (input: string) => {
    console.log("inputinhomepage", input)
    let userquery = { "userquery": input }
    console.log("userquery", userquery)

    setUserMessages([...userMessages, input]);

    try {
      console.log("input in url", input)
      console.log("api is called")
      const response = await axios.post("http://127.0.0.1:8000/api/prompt/ragsearch/", userquery)
      let startupResults = response.data
      console.log("apiresponse", response)
      setSystemResponses(prevResponses => [...prevResponses, startupResults]);
    } catch (error) {
      console.log("erroringettingstartups", error)
    }
  };


  const handleClickItem = (item: StartupType) => {
    setSelectedStartup(item)
    setOpenCompanyPane(true)
  }




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
            {systemResponses[i] && systemResponses[i]?.chainresult && systemResponses[i].results < 1 &&
              <div>
                {systemResponses[i]?.chainresult}
              </div>
            }
            <div className='text-black' key={`system-${i}`}>
              <div>
                {
                  systemResponses[i] && systemResponses[i].results.length >= 1 &&
                  (
                    <div className='grid grid-cols-2 font-semibold text-base'>
                      <div>Startup Name</div>
                      <div>Overview</div>
                      {/* <div>Website</div> */}
                    </div>
                  )
                }
                {systemResponses[i] && systemResponses[i].results && systemResponses[i].results.map((result: StartupType, index: number) => (
                  <div key={index} className='grid grid-cols-2 mt-4 rounded shadow-md p-2 bg-blue-100 cursor-pointer'
                    onClick={() => handleClickItem(result)}
                  >
                    <div>{result?.startup_name}</div>
                    <div>{result?.startup_overview}</div>
                    {/* <div>{result?.startup_url}</div> */}
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
    <main className="">
      <div className="">
        <NavBar open={open} handleToggleHistory={handleToggleHistory} />
      </div>
      <div className='flex'>

        <div className="">
          {open && (
            <div className="w-1/4">
              < LeftFrame
                open={open}
                inputPrompt={inputPrompt}
                setInputPrompt={setInputPrompt} />
            </div>
          )}
        </div>

        <div className=''>
          <Prompt
            onSaveInput={handleSaveInput}
            defaultPrompt={defaultPrompt}
            renderMessages={renderMessages}
            inputPrompt={inputPrompt}
            setInputPrompt={setInputPrompt} />
        </div>


        <div>
          {
            selectedStartup && (
              <div>
                <CompanyProfilePane
                  companyData={selectedStartup}
                  setOpenState={setOpenCompanyPane}
                  openState={openCompanyPane}
                />
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
}
