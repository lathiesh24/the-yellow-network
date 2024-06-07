"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { VscTriangleRight, VscTriangleDown } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import EditModal from "./EditModal";
import axios from "axios";

interface MyRequestsProps {
  toggleNewlyAdded: () => void;
  newlyAddedOpen: boolean;
  toggleInProgress: () => void;
  inProgressOpen: boolean;
  toggleCompleted: () => void;
  completedOpen: boolean;
  toggleRejected: () => void;
  rejectedOpen: boolean;
}

const MyRequests: React.FC<MyRequestsProps> = ({
  toggleInProgress,
  inProgressOpen,
  toggleCompleted,
  completedOpen,
  rejectedOpen,
  toggleRejected,
}) => {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [requests, setRequests] = useState([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleBackButton = () => {
    router.push("/");
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userEmail = userInfo["email"];

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/partnerconnect/", {
        params: {
          "assigned_to.email": userEmail,
        },
      })
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userEmail]);

  const handleEditClick = (request) => {
    setCurrentRequest(request);
    setEditModalOpen(true);
  };

  return (
    <div className="p-4 flex flex-col w-full">
      <div className="flex flex-row items-center text-2xl text-blue-400 gap-4 mb-4">
        <IoIosArrowBack
          size={23}
          onClick={handleBackButton}
          className="cursor-pointer"
        />
        <div>User Request Management - My Request</div>
      </div>

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
        <div>
          <div className="flex flex-row items-center text-sm mb-2">
            <div onClick={toggleInProgress} className="cursor-pointer">
              {inProgressOpen ? <VscTriangleDown /> : <VscTriangleRight />}
            </div>
            <div className="ml-2 font-semibold">In Progress</div>
          </div>
          {inProgressOpen &&
            requests
              .filter((request) => request.query_status === "requested")
              .map((request, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2"
                >
                  <div className="col-span-1">{request?.id}</div>
                  <div className="col-span-1">
                    {request?.from_user.first_name}
                  </div>
                  <div className="col-span-1">
                    {request?.to_growthtechfirm.startup_name}
                  </div>
                  <div className="col-span-1">
                    {formatDate(request?.created_at)}
                  </div>
                  <div className="col-span-6">{request?.user_query.query}</div>
                  <div className="col-span-1 bg-zinc-300 text-gray-800 py-1 rounded capitalize">
                    {request?.query_status}
                  </div>
                  <div
                    className="col-span-1 text-blue-500 flex items-center justify-center cursor-pointer"
                    onClick={() => handleEditClick(request)}
                  >
                    <CiEdit size={28} />
                  </div>
                   {editModalOpen && currentRequest && (
        <EditModal
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          request={currentRequest}
          formatDate={formatDate}
        />
      )}
                </div>
              ))}
        </div>

        {/* Rejected Requests */}
        <div>
          {requests.filter((request) => request.query_status === "rejected")
            .length > 0 && (
            <div className="flex flex-row items-center text-sm mb-2">
              <div onClick={toggleRejected} className="cursor-pointer">
                {rejectedOpen ? <VscTriangleDown /> : <VscTriangleRight />}
              </div>
              <div className="ml-2 font-semibold">Rejected</div>
            </div>
          )}
          {rejectedOpen &&
            requests
              .filter((request) => request.query_status === "rejected")
              .map((request, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2"
                >
                  <div className="col-span-1">{request?.id}</div>
                  <div className="col-span-1">
                    {request?.from_user.first_name}
                  </div>
                  <div className="col-span-1">
                    {request?.to_growthtechfirm.startup_name}
                  </div>
                  <div className="col-span-1">
                    {formatDate(request?.created_at)}
                  </div>
                  <div className="col-span-6">{request?.user_query.query}</div>
                  <div className="col-span-1 bg-zinc-300 text-gray-800 py-1 rounded capitalize">
                    {request?.query_status}
                  </div>
                  <div
                    className="col-span-1 text-blue-500 flex items-center justify-center cursor-pointer"
                    onClick={() => handleEditClick(request)}
                  >
                    <CiEdit size={28} />
                  </div>
                  
                </div>
              ))}
        </div>

        {/* Completed Requests */}
        <div>
          {requests.filter((request) => request.query_status === "completed")
            .length > 0 && (
            <div className="flex flex-row items-center text-sm mb-2">
              <div onClick={toggleCompleted} className="cursor-pointer">
                {completedOpen ? <VscTriangleDown /> : <VscTriangleRight />}
              </div>
              <div className="ml-2 font-semibold">Completed</div>
            </div>
          )}
          {completedOpen &&
            requests
              .filter((request) => request.query_status === "completed")
              .map((request, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2"
                >
                  <div className="col-span-1">{request?.id}</div>
                  <div className="col-span-1">
                    {request?.from_user.first_name}
                  </div>
                  <div className="col-span-1">
                    {request?.to_growthtechfirm.startup_name}
                  </div>
                  <div className="col-span-1">
                    {formatDate(request?.created_at)}
                  </div>
                  <div className="col-span-6">{request?.user_query.query}</div>
                  <div className="col-span-1 bg-zinc-300 text-gray-800 py-1 rounded capitalize">
                    {request?.query_status}
                  </div>
                  <div
                    className="col-span-1 text-blue-500 flex items-center justify-center cursor-pointer"
                    onClick={() => handleEditClick(request)}
                  >
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
