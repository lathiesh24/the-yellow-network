"use client";
import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import NavBar from "./Navbar";
import Prompt from "./Prompt";
import axios from "axios";
import CompanyProfilePane from "./CompanyProfilePane";
import { StartupType } from "../interfaces";
import LeftFrame from "./LeftFrame/LeftFrame";

export default function HomePage() {
  const [messages, setMessages] = useState([])
  const [defaultPrompt, setDefaultPrompt] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);
  const [selectedStartup, setSelectedStartup] = useState<StartupType>();
  const [openCompanyPane, setOpenCompanyPane] = useState<boolean>(true);
  const [inputPrompt, setInputPrompt] = useState(defaultPrompt);
  const [openRightFrame, setOpenRightFrame] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      const parsedUserInfo = JSON.parse(userInfoFromStorage);
      setUserInfo(parsedUserInfo);
    }
  }, []);

  useEffect(() => {
    const promptStorage = localStorage.setItem("promptStorage", inputPrompt)
  }, []);

  const handleToggleLeftFrameNavbar = () => {
    setOpen(!open);
  };

  const handleToggleLeftFrame = () => {
    if (open) {
      setOpen(!open);
    }
  };

  const handleToggleRightFrame = () => {
    if (openRightFrame) {
      setOpenRightFrame(!openRightFrame);
    }
  };

  const handleSaveInput = async (input: string) => {


    let userquery = { userquery: input };

    setMessages(prevMessages => [...prevMessages, { question: input, response: "Loading" }]);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/prompt/ragsearch/",
        userquery
      );
      setMessages([...messages, { question: input, response: response.data }]);

    } catch (error) {
      console.log("erroringettingstartups", error);
    }
  };


  const handleClickItem = (item: StartupType) => {
    setSelectedStartup(item);
    setOpenRightFrame(true)
  };

  console.log("messages", messages)
  const renderMessages = () => {
    return messages.map((message: any, index: number) => (
      <div key={index} className=" justify-between mb-4 text-[16px] px-6">
        <div className=" p-6 text-left border-l-4 border-orange-100">
          <span className="font-semibold text-[17px] text-black block mb-1">You:</span>
          <span className='text-[17px]'>{message.question}</span>
        </div>
        <div className=" p-6  text-left border-l-4 border-blue-100">
          <span className="font-semibold text-black block mb-3">GamePlan:</span>
          {message?.response === "Loading" ? (
            <div>
              Loading..
            </div>
          ) : (
            <div>
              <span>
                {message?.response?.chainresult}
              </span>
              <div>
                <div className="grid grid-cols-2 font-semibold text-base">
                  <div>Startup Name</div>
                  <div>Overview</div>
                </div>

                {message?.response?.results && message?.response?.results.map((result: any, indexofresult: number) => {
                  return (
                    <div
                      key={indexofresult}
                      className="grid grid-cols-2 mt-4 rounded shadow-md p-2 bg-blue-100 cursor-pointer"
                      onClick={() => handleClickItem(result)}
                    >
                      <div>{result?.startup_name}</div>
                      <div>{result?.startup_overview}</div>
                    </div>
                  )
                })}
              </div>

            </div>

          )}
        </div>
      </div>
    ));
  };


  return (
    <main className="">
      <div className="">
        <NavBar open={open} handleToggleLeftFrame={handleToggleLeftFrameNavbar} />
      </div>
      <div className="flex">
        <div className="">
          {open && (
            <div className="w-1/4">
              <LeftFrame
                open={open}
                inputPrompt={inputPrompt}
                setInputPrompt={setInputPrompt}
                userInfo={userInfo}
              />
            </div>
          )}
        </div>

        <div className="">
          <Prompt
            onSaveInput={handleSaveInput}
            defaultPrompt={defaultPrompt}
            renderMessages={renderMessages}
            inputPrompt={inputPrompt}
            setInputPrompt={setInputPrompt}
            open={open}
            handleToggleLeftFrame={handleToggleLeftFrame}
            openRightFrame={openRightFrame}
            handleToggleRightFrame={handleToggleRightFrame} />
        </div>

        <div>
          {openRightFrame && selectedStartup && (
            <div>
              <CompanyProfilePane
                companyData={selectedStartup}
                setOpenState={setOpenRightFrame}
                openState={openRightFrame}
                userInfo={userInfo}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
