import React from "react";
import NavBar from "../components/ConsultantScreen/Navbar";
import { IoPerson } from 'react-icons/io5';
import { LuArrowLeftRight } from 'react-icons/lu';
import { IoIosArrowBack } from "react-icons/io";

// Sample data
const requests = [
    { id: 123456, from: "John David", company: "1QBit", date: "22-01-2024", useCase: "Lorem Ipsum is simply dummy text...", queryStatus: "Yet to Start", assignedStatus: "Assign to me" },
    { id: 123457, from: "Jane Smith", company: "2QBit", date: "23-01-2024", useCase: "Lorem Ipsum is simply dummy text...", queryStatus: "GTF Pending", assignedStatus: "AK" },
    { id: 123458, from: "Robert Brown", company: "3QBit", date: "24-01-2024", useCase: "Lorem Ipsum is simply dummy text...", queryStatus: "Convo Started", assignedStatus: "SG" },
    { id: 123459, from: "Emily White", company: "4QBit", date: "25-01-2024", useCase: "Lorem Ipsum is simply dummy text...", queryStatus: "Pitch", assignedStatus: "SE" },
    { id: 123460, from: "Michael Green", company: "5QBit", date: "26-01-2024", useCase: "Lorem Ipsum is simply dummy text...", queryStatus: "Completed", assignedStatus: "GG" },
    { id: 123461, from: "Sarah Black", company: "6QBit", date: "27-01-2024", useCase: "Lorem Ipsum is simply dummy text...", queryStatus: "Rejected", assignedStatus: "AK" },
];

const TotalRequests: React.FC = () => {
    return (
        <div>
            <NavBar />
            <div className="flex flex-col h-screen">
                <div className="flex-grow flex flex-row">
                    <div className="flex flex-col gap-4 bg-white shadow-md w-12 items-center">
                        <div className="mt-5">
                            <LuArrowLeftRight size={23} color='grey' />
                        </div>
                        <div className="mt-5">
                            <IoPerson size={23} color='grey' />
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
                                <div key={request.id} className="flex flex-row border rounded-lg ">
                                    <div className="">{request.id}</div>
                                    <div className="">{request.from}</div>
                                    <div className="">{request.company}</div>
                                    <div className="">{request.date}</div>
                                    <div className="">{request.useCase}</div>
                                    <div className="">
                                        <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded">{request.queryStatus}</span>
                                    </div>
                                    <div className="">
                                        <button className="bg-blue-500 text-white py-1 px-4 rounded">{request.assignedStatus}</button>
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
