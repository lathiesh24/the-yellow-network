import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { VscTriangleRight, VscTriangleDown } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import AssignToMe from "./AssignToMe";
import axios from "axios";

const AllRequests = ({
  toggleNewlyAdded,
  newlyAddedOpen,
  toggleInProgress,
  inProgressOpen,
  toggleCompleted,
  completedOpen,
}) => {
  const [assignToMeOpen, setAssignToMeOpen] = useState<boolean>(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const router = useRouter();

  const userName = useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/partnerconnect/")
      .then((response) => {
        setRequests(response.data);
        console.log("Fetched requests:", response.data);
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

  const updateAssignedStatus = (
    id: number,
    status: boolean,
    assignedTo: {
      first_name: string;
      email: string;
      organization_name: string;
    }
  ) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? { ...request, assigned_status: status, assigned_to: assignedTo }
          : request
      )
    );
  };

  const handleBackButton = () => {
    router.push("/");
  };

  const truncateText = (text: string, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const handleAssignToMe = (request) => {
    setCurrentRequest(request);
    setAssignToMeOpen(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center text-2xl text-blue-400 gap-4 mb-4">
        <IoIosArrowBack
          size={23}
          onClick={handleBackButton}
          className="cursor-pointer"
        />
        <div>User Request Management - All Request</div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-10 gap-4 py-2.5 px-2 text-center uppercase text-sm text-gray-400 font-bold my-2 bg-gray-100">
          <div>Request ID</div>
          <div>From</div>
          <div>To</div>
          <div>When</div>
          <div className="col-span-4">Use Case</div>
          <div>Status</div>
          <div>Edit</div>
        </div>

        {/* Newly Added Requests */}
        <div>
          <div className="flex flex-row items-center text-sm mb-2">
            <div onClick={toggleNewlyAdded} className="cursor-pointer">
              {newlyAddedOpen ? <VscTriangleDown /> : <VscTriangleRight />}
            </div>
            <div className="ml-2 font-semibold">Newly Added</div>
          </div>
          {newlyAddedOpen &&
            requests
              .filter((request) => request.query_status === "requested")
              .map((request, index) => (
                <div
                  key={index}
                  className="grid grid-cols-10 gap-4 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2"
                >
                  <div className="">{request?.id}</div>
                  <div className="">{request?.from_user?.first_name}</div>
                  <div className="">
                    {request?.to_growthtechfirm?.startup_name}
                  </div>
                  <div className="">{formatDate(request?.created_at)}</div>
                  <div className="col-span-4">
                    {truncateText(request?.user_query?.query, 60)}
                  </div>
                  <div className=" bg-zinc-300 text-gray-800 py-1 rounded capitalize">
                    {request?.query_status}
                  </div>
                  <div className="">
                    {request?.assigned_status == false ? (
                      <button
                        className="bg-blue-500 text-white py-1 px-4 rounded"
                        onClick={() => handleAssignToMe(request)}
                      >
                        Assign To me
                      </button>
                    ) : (
                      <div className="bg-blue-500 text-white py-1 px-4 rounded">
                        {request?.assigned_to?.first_name}
                      </div>
                    )}
                    {assignToMeOpen && currentRequest?.id === request.id ? (
                      <AssignToMe
                        assignToMeOpen={assignToMeOpen}
                        setAssignToMeOpen={setAssignToMeOpen}
                        request={currentRequest}
                        updateAssignedStatus={updateAssignedStatus}
                      />
                    ) : null}
                  </div>
                </div>
              ))}
        </div>

        {/* In Progress Requests */}
        <div>
          {requests.filter((request) => request.query_status === "in_progress")
            .length > 0 && (
            <div className="flex flex-row items-center text-sm mb-2">
              <div onClick={toggleInProgress} className="cursor-pointer">
                {inProgressOpen ? <VscTriangleDown /> : <VscTriangleRight />}
              </div>
              <div className="ml-2 font-semibold">In Progress</div>
            </div>
          )}
          {inProgressOpen &&
            requests
              .filter((request) => request.query_status === "in_progress")
              .map((request, index) => (
                <div
                  key={index}
                  className="grid grid-cols-10 gap-4 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2"
                >
                  <div className="">{request?.id}</div>
                  <div className="">{request?.from_user?.first_name}</div>
                  <div className="">
                    {request?.to_growthtechfirm?.startup_name}
                  </div>
                  <div className="">{formatDate(request?.created_at)}</div>
                  <div className="col-span-4">
                    {truncateText(request?.user_query?.query, 60)}
                  </div>
                  <div className=" bg-zinc-300 text-gray-800 py-1 rounded capitalize">
                    {request?.query_status}
                  </div>
                  <div className="">
                    <div className="bg-blue-500 text-white py-1 px-4 rounded">
                      {request?.assigned_to?.first_name}
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Completed Requests */}
        <div>
          {requests.filter((request) => request.query_status === "completed" || request.query_status ==="rejected")
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
              .filter(
                (request) =>
                  request.query_status === "completed" ||
                  request.query_status === "rejected"
              )
              .map((request, index) => (
                <div
                  key={index}
                  className="grid grid-cols-10 gap-4 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2"
                >
                  <div className="">{request?.id}</div>
                  <div className="">{request?.from_user?.first_name}</div>
                  <div className="">
                    {request?.to_growthtechfirm?.startup_name}
                  </div>
                  <div className="">{formatDate(request?.created_at)}</div>
                  <div className="col-span-4">
                    {truncateText(request?.user_query?.query, 60)}
                  </div>
                  <div className=" bg-zinc-300 text-gray-800 py-1 rounded capitalize">
                    {request?.query_status}
                  </div>
                  <div className="">
                    <div className="bg-blue-500 text-white py-1 px-4 rounded">
                      {request?.assigned_to?.first_name}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AllRequests;
