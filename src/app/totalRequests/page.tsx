"use client"
import React, { useEffect, useState } from "react";
import NavBar from "../components/ConsultantScreen/Navbar";
import { IoPerson } from "react-icons/io5";
import { LuArrowLeftRight } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { VscTriangleRight } from "react-icons/vsc";
import axios from "axios";

const statuses = ["Yet to Start", "GTF Pending", "Convo Started", "Pitch", "Completed", "Rejected"];

const TotalRequests: React.FC = () => {
    const [requests, setRequests] = useState([]);

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
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex-grow flex flex-row">
                <div className="flex flex-col gap-4 bg-white shadow-md w-12 items-center">
                    <div className="mt-5">
                        <LuArrowLeftRight size={23} color='grey' />
                    </div>
                    <div className="mt-5">
                        <IoPerson size={23} color='grey' />
                    </div>
                </div>
                <div className="p-4 flex flex-col w-full">
                    <div className="flex flex-row items-center text-2xl text-blue-400 gap-4 mb-4">
                        <IoIosArrowBack size={23} />
                        <div>User Request Management - Total Request</div>
                    </div>
                    <div className="flex-grow overflow-auto">
                        <div className="grid grid-cols-7 bg-gray-50 py-3 px-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider rounded-md sticky top-0 z-10">
                            <div>Request ID</div>
                            <div>From</div>
                            <div>Company</div>
                            <div>When</div>
                            <div>Use Case</div>
                            <div>Query Status</div>
                            <div>Assigned Status</div>
                        </div>
                        {requests.map((request, index) => (
                            <div key={index} className="grid grid-cols-7 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2 ">
                                <div className="flex items-center justify-center">{request.id}</div>
                                <div className="flex items-center justify-center">{request.from_user.first_name}</div>
                                <div className="flex items-center justify-center">{request.to_growthtechfirm.startup_name}</div>
                                <div className="flex items-center justify-center">{formatDate(request.created_at)}</div>
                                <div className="flex items-center justify-center">{request.user_query.query}</div>
                                <div className="flex items-center justify-center">
                                    <select
                                        className="bg-zinc-300 text-gray-800 py-1 px-2 rounded"
                                        defaultValue={request.query_status}
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status} className="bg-white rounded-none">
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button className="bg-blue-500 text-white py-1 px-4 rounded">{request.assignedStatus}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalRequests;
