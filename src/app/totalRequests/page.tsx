"use client";

import React, { useState } from "react";
import NavBar from "../components/ConsultantScreen/Navbar";
import { IoPerson } from "react-icons/io5";
import { LuArrowLeftRight } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";

// Sample data
const requests = [
  {
    id: 123456,
    from: "John David",
    company: "1QBit",
    date: "22-01-2024",
    useCase: "Lorem Ipsum is simply dummy text...",
    queryStatus: "Yet to Start",
    assignedStatus: "Assign to me",
  },
  {
    id: 123457,
    from: "Jane Smith",
    company: "2QBit",
    date: "23-01-2024",
    useCase: "Lorem Ipsum is simply dummy text...",
    queryStatus: "GTF Pending",
    assignedStatus: "AK",
  },
  {
    id: 123458,
    from: "Robert Brown",
    company: "3QBit",
    date: "24-01-2024",
    useCase: "Lorem Ipsum is simply dummy text...",
    queryStatus: "Convo Started",
    assignedStatus: "SG",
  },
  {
    id: 123459,
    from: "Emily White",
    company: "4QBit",
    date: "25-01-2024",
    useCase: "Lorem Ipsum is simply dummy text...",
    queryStatus: "Pitch",
    assignedStatus: "SE",
  },
  {
    id: 123460,
    from: "Michael Green",
    company: "5QBit",
    date: "26-01-2024",
    useCase: "Lorem Ipsum is simply dummy text...",
    queryStatus: "Completed",
    assignedStatus: "GG",
  },
  {
    id: 123461,
    from: "Sarah Black",
    company: "6QBit",
    date: "27-01-2024",
    useCase: "Lorem Ipsum is simply dummy text...",
    queryStatus: "Rejected",
    assignedStatus: "AK",
  },
];

const TotalRequests: React.FC = () => {
  const [assignToMeOpen, setAssignToMeOpen] = useState<boolean>(false);

  console.log("assigntomeopen", assignToMeOpen);

  const handleAssignToMe = () => {};

  return (
    <div>
      <NavBar />
      <div className="flex flex-col h-screen">
        <div className="flex-grow flex flex-row">
          <div className="flex flex-col gap-4 bg-white shadow-md w-12 items-center">
            <div className="mt-5">
              <LuArrowLeftRight size={23} color="grey" />
            </div>
            <div className="mt-5">
              <IoPerson size={23} color="grey" />
            </div>
          </div>
          <div className="flex-grow p-4">
            <div className="flex flex-row items-center text-2xl text-blue-400 gap-4 mb-4">
              <IoIosArrowBack size={23} />
              <div>User Request Management - Total Request</div>
            </div>
            <div className=" flex flex-col gap-8">
              <div className="flex flex-row text-gray-400 ">
                <div className="">Request ID</div>
                <div className="">From</div>
                <div className="">Company</div>
                <div className="">When</div>
                <div className="">Use Case</div>
                <div className="">Query Status</div>
                <div className="">Assigned Status</div>
              </div>
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-row border rounded-lg "
                >
                  <div className="">{request.id}</div>
                  <div className="">{request.from}</div>
                  <div className="">{request.company}</div>
                  <div className="">{request.date}</div>
                  <div className="">{request.useCase}</div>
                  <div className="">
                    <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded">
                      {request.queryStatus}
                    </span>
                  </div>
                  <div className="">
                    <button
                      className="bg-blue-500 text-white py-1 px-4 rounded"
                      onClick={() => setAssignToMeOpen(true)}
                    >
                      {request.assignedStatus}
                    </button>
                    {assignToMeOpen ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="p-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                              {/*header*/}
                              <div className="flex items-start justify-between p-5  rounded-t">
                                <h3 className="text-3xl font-semibold">
                                  Request Detail
                                </h3>
                                <button
                                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                  onClick={() => setAssignToMeOpen(false)}
                                >
                                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                  </span>
                                </button>
                              </div>

                              {/* body */}
                              <div className="flex flex-row justify-around gap-14 p-3">
                                <div className="flex flex-col justify-between">
                                  <div className="flex flex-col gap-2">
                                    <div className="font-medium text-xl text-blue-400 flex flex-col gap-2">
                                      Usecase
                                    </div>
                                    <div className="">{request.useCase}</div>
                                  </div>

                                  <div className="flex flex-col gap-2">
                                    <div className="font-medium text-xl text-blue-400">
                                      Growth Tech Firm
                                    </div>
                                    <div className="flex gap-3 justify-start items-center">
                                      <div>The Yellow Network</div>
                                      <div className="text-sm rounded-xl p-2 bg-yellow-400 font-medium text-white">
                                        Verified
                                      </div>
                                    </div>
                                    <div></div>
                                  </div>
                                </div>

                                <div className="text-xl">
                                  <div className="flex flex-col gap-4">
                                    <div>
                                      <div className="font-medium mb-4 text-blue-400">
                                        Nifo User
                                      </div>

                                      <div className="text-base flex flex-row gap-4">
                                        <div className="flex font-medium flex-col gap-4">
                                          <div>User Name</div>
                                          <div>User Mail ID</div>
                                          <div>User org</div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                          <div>Anand</div>
                                          <div>anand@abc.com</div>
                                          <div>TYN</div>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <div className="font-medium mb-4 text-blue-400">
                                        GTF User
                                      </div>
                                      <div className="text-base flex flex-row gap-4 ">
                                        <div className="flex font-medium flex-col gap-4">
                                          <div>SPOC</div>
                                          <div>Email</div>
                                          <div>Phone Number</div>
                                          <div>Firm's Website</div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                          <div>Anand</div>
                                          <div>anand@abc.com</div>
                                          <div>997868960</div>
                                          <div>TYN</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/*footer*/}
                              <div className="flex items-center justify-center gap-10 p-6 rounded-b">
                                <button
                                  className="bg-blue-400 rounded-lg text-lg text-white background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setAssignToMeOpen(false)}
                                >
                                  Assign to me
                                </button>
                                <button
                                  className="bg-white text-blue-400 rounded-lg text-lg border border-blue-400  font-bold uppercase px-6 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setAssignToMeOpen(false)}
                                >
                                  Back
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalRequests;
