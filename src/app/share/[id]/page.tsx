"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import CryptoJS from "crypto-js";
import Link from "next/link";
import NavBar from "../../components/Navbar";

const ShareSessionPage = () => {
  const [messages, setMessages] = useState([]);
  const params = useParams();
  let encryptedSessionId = params.id;

  // Ensure encryptedSessionId is a string
  if (Array.isArray(encryptedSessionId)) {
    encryptedSessionId = encryptedSessionId[0];
  }

  if (typeof encryptedSessionId !== "string") {
    console.error("Invalid ID in URL");
    return null;
  }

  const secretKey = "urlencrypt";
  const decodedEncryptedSessionId = decodeURIComponent(encryptedSessionId);

  const decryptSessionId = (encryptedId, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedId, key);
      const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedId;
    } catch (error) {
      console.error("Error decrypting session ID:", error);
      return null;
    }
  };

  const decryptedSessionId = decryptSessionId(
    decodedEncryptedSessionId,
    secretKey
  );

  const fetchSessionMessages = async (id) => {
    try {
      const jwtAccessToken = localStorage.getItem("jwtAccessToken");
      if (jwtAccessToken) {
        const res = await axios.get(
          `http://127.0.0.1:8000/prompt/convo/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtAccessToken}`,
            },
          }
        );
        setMessages(res.data.conversations); // Adjust this to match your response structure
        console.log("Response:", res);
      } else {
        console.error("JWT token not found in localStorage.");
      }
    } catch (error) {
      console.error("Error fetching session messages:", error);
    }
  };

  useEffect(() => {
    if (decryptedSessionId) {
      fetchSessionMessages(decryptedSessionId);
    }
  }, [decryptedSessionId]);

  const renderSolutionOrchestration = (message) => {
    return (
      <div>
        {message?.response?.steps?.map((step, index) => (
          <div key={index}>
            {" "}
            {/* Ensure key is used on the outermost element */}
            <div className="flex gap-2 m-2 mt-4">
              <div>Step: {step?.step_number}</div>
              <div>{step?.step_description}</div>
            </div>
            {step?.startups?.map((startup, sIndex) => (
              <div
                key={sIndex}
                className="grid grid-cols-3 mt-4 rounded shadow-md p-2 bg-blue-100 cursor-pointer"
              >
                <div className="text-sm">{startup?.name}</div>
                <div className="text-sm col-span-2">{startup?.description}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderOtherCategories = (message) => {
    const startups = message?.response?.startups;

    if (!startups || startups?.length === 0) return null;

    return (
      <div>
        <div className="grid grid-cols-3 font-semibold text-base">
          <div>Startup Name</div>
          <div>Reason</div>
        </div>

        {startups.map((startup, index) => (
          <div
            key={index}
            className="grid grid-cols-3 mt-4 rounded shadow-md p-2 bg-blue-100 cursor-pointer"
          >
            <div className="text-sm">{startup?.name}</div>
            <div className="text-sm col-span-2">{startup?.description}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div key={index} className="justify-between mb-4 text-[16px] px-6">
        <div className="p-6 text-left border-l-4 border-orange-100">
          <span className="font-semibold text-[17px] text-black block mb-1">
            You:
          </span>
          <span className="text-[17px]">{message?.question}</span>
        </div>
        <div className="p-6 text-left border-l-4 border-blue-100">
          <span className="font-semibold text-black block mb-3">NIFO:</span>
          {message?.response === "Loading" ? (
            <div>Loading..</div>
          ) : (
            <div>
              {message?.response?.response === "No specific details available."
                ? null
                : message?.response?.response}
              {message?.response?.category ===
              "business problem(solution orchestration)"
                ? renderSolutionOrchestration(message)
                : renderOtherCategories(message)}
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div>
       {/* <NavBar/> */}
      </div>

      <div className="sm:mx-10 md:mx-80 xl:mx-[400px] my-4 flex flex-col gap-2 pb-32">
        {renderMessages()}
      </div>

      <div className="fixed bottom-10 left-[35%] sm:left-[48%]"> 
          <button className="bg-blue-400 sm:bg-yellow-400 px-2 py-2 rounded-lg text-white font-semibold">
           <Link href="/login">Log into Nifo</Link> 
          </button>
      </div>
    </div>
  );
};

export default ShareSessionPage;
