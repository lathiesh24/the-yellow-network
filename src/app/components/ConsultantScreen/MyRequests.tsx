"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { VscTriangleRight, VscTriangleDown } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";

const MyRequests = ({toggleNewlyAdded,newlyAddedOpen, requests, toggleInProgress, inProgressOpen, toggleCompleted, completedOpen }) => {
    const router = useRouter()
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };
    
      const handleBackButton = () => {
        router.push('/')
      }
    return (
      <div className="p-4 flex flex-col w-full">
        <div className="flex flex-row items-center text-2xl text-blue-400 gap-4 mb-4">
        <IoIosArrowBack size={23} onClick={handleBackButton} className="cursor-pointer" />
          <div>User Request Management - My Request</div>
        </div>
  
        {/* header of table */}
        <div className="grid grid-cols-12 py-2.5 px-2 text-center uppercase text-sm text-gray-400 font-bold my-2">
          <div className="col-span-1">Request ID</div>
          <div className="col-span-1">From</div>
          <div className="col-span-1">To</div>
          <div className="col-span-1">When</div>
          <div className="col-span-6">Use Case</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Edit</div>
        </div>
  
        <div className="flex-grow overflow-auto">
          {/* Newly Added Requests */}
          <div>
            <div className="flex flex-row items-center text-sm mb-2">
              <div onClick={toggleNewlyAdded} className="cursor-pointer">
                {newlyAddedOpen ? <VscTriangleDown /> : <VscTriangleRight />}
              </div>
              <div className="ml-2 font-semibold">Newly Added</div>
            </div>
            {newlyAddedOpen && requests
              .filter((request) => request.query_status === "requested")
              .map((request, index) => (
                <div
                  key={index}
                  className="w-[95vw] grid grid-cols-12 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2"
                >
                  <div className="col-span-1">{request?.id}</div>
                  <div className="col-span-1">{request?.from_user.first_name}</div>
                  <div className="col-span-1">{request?.to_growthtechfirm.startup_name}</div>
                  <div className="col-span-1">{formatDate(request?.created_at)}</div>
                  <div className="col-span-6">{request?.user_query.query}</div>
                  <div className="col-span-1 bg-zinc-300 text-gray-800 py-1 rounded capitalize">{request?.query_status}</div>
                  <div className="col-span-1 text-blue-500 flex items-center justify-center">
                    <CiEdit size={28} />
                  </div>
                </div>
              ))}
          </div>
  
          {/* In Progress Requests */}
          <div>
            {requests.filter((request) => request.query_status === "in_progress").length > 0 && (
              <div className="flex flex-row items-center text-sm mb-2">
                <div onClick={toggleInProgress} className="cursor-pointer">
                  {inProgressOpen ? <VscTriangleDown /> : <VscTriangleRight />}
                </div>
                <div className="ml-2 font-semibold">In Progress</div>
              </div>
            )}
            {inProgressOpen && requests
              .filter((request) => request.query_status === "in_progress")
              .map((request, index) => (
                <div
                  key={index}
                  className="w-[95vw] grid grid-cols-12 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2"
                >
                  <div className="col-span-1">{request?.id}</div>
                  <div className="col-span-1">{request?.from_user.first_name}</div>
                  <div className="col-span-1">{request?.to_growthtechfirm.startup_name}</div>
                  <div className="col-span-1">{formatDate(request?.created_at)}</div>
                  <div className="col-span-6">{request?.user_query.query}</div>
                  <div className="col-span-1 bg-zinc-300 text-gray-800 py-1 rounded capitalize">{request?.query_status}</div>
                  <div className="col-span-1 text-blue-500 flex items-center justify-center">
                    <CiEdit size={28} />
                  </div>
                </div>
              ))}
          </div>
  
          {/* Completed Requests */}
          <div>
            {requests.filter((request) => request.query_status === "completed").length > 0 && (
              <div className="flex flex-row items-center text-sm mb-2">
                <div onClick={toggleCompleted} className="cursor-pointer">
                  {completedOpen ? <VscTriangleDown /> : <VscTriangleRight />}
                </div>
                <div className="ml-2 font-semibold">Completed</div>
              </div>
            )}
            {completedOpen && requests
              .filter((request) => request.query_status === "completed")
              .map((request, index) => (
                <div
                  key={index}
                  className="w-[95vw] grid grid-cols-12 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2"
                >
                  <div className="col-span-1">{request?.id}</div>
                  <div className="col-span-1">{request?.from_user.first_name}</div>
                  <div className="col-span-1">{request?.to_growthtechfirm.startup_name}</div>
                  <div className="col-span-1">{formatDate(request?.created_at)}</div>
                  <div className="col-span-6">{request?.user_query.query}</div>
                  <div className="col-span-1 bg-zinc-300 text-gray-800 py-1 rounded capitalize">{request?.query_status}</div>
                  <div className="col-span-1 text-blue-500 flex items-center justify-center">
                    <CiEdit size={28} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
};

export default MyRequests;