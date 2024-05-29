"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/ConsultantScreen/Navbar";
import { IoPerson } from "react-icons/io5";
import { LuArrowLeftRight } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { VscTriangleRight, VscTriangleDown } from "react-icons/vsc";
import axios from "axios";

const statuses = [
    "Yet to Start",
    "GTF Pending",
    "Convo Started",
    "Pitch",
    "Completed",
    "Rejected",
];

const progress = [
    "Newly Added",
    "In Progress",
    "Completed",
];

const TotalRequests: React.FC = () => {
    const [requests, setRequests] = useState([]);
    const [newlyAddedOpen, setNewlyAddedOpen] = useState<boolean>(true);
    const [inProgressOpen, setInProgressOpen] = useState<boolean>(true);
    const [completedOpen, setCompletedOpen] = useState<boolean>(true);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/partnerconnect/")
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
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

    const toggleInProgess = () => {
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
                    <div className="mt-5">
                        <LuArrowLeftRight size={23} color="grey" />
                    </div>
                    <div className="mt-5">
                        <IoPerson size={23} color="grey" />
                    </div>
                </div>
                <div className="p-4 flex flex-col w-full">
                    <div className="flex flex-row items-center text-2xl text-blue-400 gap-4 mb-4">
                        <IoIosArrowBack size={23} />
                        <div>User Request Management - Total Request</div>
                    </div>
                    <div className="flex-grow overflow-auto">
                        <div>
                            <div className="flex flex-row items-center text-sm">
                                {!newlyAddedOpen ? (
                                    <div onClick={toggleNewlyAdded} className="cursor-pointer">
                                        <VscTriangleRight />
                                    </div>
                                ) : (
                                    <div onClick={toggleNewlyAdded} className="cursor-pointer">
                                        <VscTriangleDown />
                                    </div>
                                )}
                                <div>Newly Added</div>
                            </div>
                            {requests.filter(request => request.query_status === "requested").map((request, index) => (
                                <div
                                    key={index}
                                    className={`grid-cols-7 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2 ${newlyAddedOpen ? 'grid' : 'hidden'}`}
                                >
                                    <div className="flex items-center justify-center">
                                        {request?.id}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {request?.from_user.first_name}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {request?.to_growthtechfirm.startup_name}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {formatDate(request?.created_at)}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {request?.user_query.query}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <select
                                            className="bg-zinc-300 text-gray-800 py-1 px-2 rounded"
                                            defaultValue={request?.query_status}
                                        >
                                            {statuses.map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                    className="bg-white rounded-none"
                                                >
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {requests.filter(request => request.query_status === "in_progress").length > 0 &&
                                <div className="flex flex-row items-center text-sm">
                                    {!inProgressOpen ? (
                                        <div onClick={toggleInProgess} className="cursor-pointer">
                                            <VscTriangleRight />
                                        </div>
                                    ) : (
                                        <div onClick={toggleInProgess} className="cursor-pointer">
                                            <VscTriangleDown />
                                        </div>
                                    )}
                                    <div>In Progress</div>
                                </div>}

                            {requests.filter(request => request.query_status === "in_progress").map((request, index) => (
                                <div
                                    key={index}
                                    className={`grid-cols-7 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2 ${inProgressOpen ? 'grid' : 'hidden'}`}
                                >
                                    <div className="flex items-center justify-center">
                                        {request?.id}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {request?.from_user.first_name}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {request?.to_growthtechfirm.startup_name}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {formatDate(request?.created_at)}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {request?.user_query.query}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <select
                                            className="bg-zinc-300 text-gray-800 py-1 px-2 rounded"
                                            defaultValue={request?.query_status}
                                        >
                                            {statuses.map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                    className="bg-white rounded-none"
                                                >
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {requests.filter(request => request.query_status === "completed").length > 0 &&
                                <div className="flex flex-row items-center text-sm">
                                    {!completedOpen ? (
                                        <div onClick={toggleCompleted} className="cursor-pointer">
                                            <VscTriangleRight />
                                        </div>
                                    ) : (
                                        <div onClick={toggleCompleted} className="cursor-pointer">
                                            <VscTriangleDown />
                                        </div>
                                    )}
                                    <div>Completed</div>
                                </div>}

                            {requests.filter(request => request.query_status === "completed").map((request, index) => (
                                <div
                                    key={index}
                                    className={`grid-cols-7 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2 ${completedOpen ? 'grid' : 'hidden'}`}
                                >
                                    <div className="flex items-center justify-center">
                                        {request?.id}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {request?.from_user.first_name}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {request?.to_growthtechfirm.startup_name}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {formatDate(request?.created_at)}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {request?.user_query.query}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <select
                                            className="bg-zinc-300 text-gray-800 py-1 px-2 rounded"
                                            defaultValue={request?.query_status}
                                        >
                                            {statuses.map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                    className="bg-white rounded-none"
                                                >
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
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
