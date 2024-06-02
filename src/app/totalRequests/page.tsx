"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/ConsultantScreen/Navbar";
import { IoPerson } from "react-icons/io5";
import { LuArrowLeftRight } from "react-icons/lu";
import axios from "axios";
import MyRequests from "../components/ConsultantScreen/MyRequests";
import AllRequests from "../components/ConsultantScreen/AllRequests";

const progress = ["Newly Added", "In Progress", "Completed"];

const TotalRequests: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const [newlyAddedOpen, setNewlyAddedOpen] = useState<boolean>(true);
  const [inProgressOpen, setInProgressOpen] = useState<boolean>(true);
  const [completedOpen, setCompletedOpen] = useState<boolean>(true);
  const [assignToMeOpen, setAssignToMeOpen] = useState<boolean>(false);
  const [view, setView] = useState<string>("allRequests");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/partnerconnect/")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const toggleNewlyAdded = () => {
    setNewlyAddedOpen(!newlyAddedOpen);
  };

  const toggleInProgress = () => {
    setInProgressOpen(!inProgressOpen);
  };

  const toggleCompleted = () => {
    setCompletedOpen(!completedOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex-grow flex flex-row">
        <div className="flex flex-col gap-4 bg-white shadow-md w-12 items-center">
          <div
            className={`mt-5 cursor-pointer ${
              view === "allRequests" ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => setView("allRequests")}
          >
            <LuArrowLeftRight size={23} />
          </div>
          <div
            className={`mt-5 cursor-pointer ${
              view === "allRequests" ? "text-gray-500" : "text-yellow-400"
            }`}
            onClick={() => setView("myRequests")}
          >
            <IoPerson size={23} />
          </div>
        </div>

        <div>{view === "allRequests" 
        ? <AllRequests
        requests={requests} 
        newlyAddedOpen={newlyAddedOpen}  
        toggleNewlyAdded={toggleNewlyAdded}
        toggleInProgress={toggleInProgress}
        completedOpen ={completedOpen}
        inProgressOpen={inProgressOpen}
        toggleCompleted={toggleCompleted}
        />
        :<MyRequests 
         requests={requests} 
         newlyAddedOpen={newlyAddedOpen}  
         toggleNewlyAdded={toggleNewlyAdded}
         toggleInProgress={toggleInProgress}
         completedOpen ={completedOpen}
         inProgressOpen={inProgressOpen}
         toggleCompleted={toggleCompleted}
         />
         }
         </div>
      </div>
    </div>
  );
};

export default TotalRequests;
