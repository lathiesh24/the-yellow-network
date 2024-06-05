import React, { useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { Request } from "../../interfaces";

interface AssignToMeProps {
  assignToMeOpen: boolean;
  setAssignToMeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  request: Request;
  updateAssignedStatus: (
    id: number,
    status: boolean,
    assignedTo: number
  ) => void;
}

const AssignToMe: React.FC<AssignToMeProps> = ({
  setAssignToMeOpen,
  assignToMeOpen,
  request,
  updateAssignedStatus,
}) => {
  const [loading, setLoading] = useState(false);
  const [assigned, setAssigned] = useState(request.assigned_status);

  const changeAssignToMe = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/partnerconnect/${id}`,
        {
          assigned_status: true,
          assigned_to: 1,
        }
      );
      setAssigned(true);
      updateAssignedStatus(id, true, 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="my-6 max-w-3xl">
          <div className="p-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between px-2 rounded-t">
              <h3 className="text-3xl font-semibold py-2 pb-4">
                Request Detail
              </h3>
              <button
                className="bg-transparent opacity-50 py-1 leading-none font-medium"
                onClick={() => setAssignToMeOpen(false)}
              >
                <span className="text-3xl text-black">x</span>
              </button>
            </div>

            <div className="grid grid-cols-2">
              <div className="flex flex-col justify-between">
                <div className="p-2 flex flex-col items-start gap-2">
                  <div className="font-medium text-xl text-blue-400">
                    Usecase
                  </div>
                  <div className="text-base break-words">
                    {request.user_query.query}
                  </div>
                </div>
                <div className="p-2 flex flex-col items-start gap-2">
                  <div className="font-medium text-xl text-blue-400">
                    Growth Tech Firm
                  </div>
                  <div className="flex gap-x-1 items-center">
                    <div className="text-base py-2">
                      {request.to_growthtechfirm.startup_name}
                    </div>
                    <div className="text-sm bg-yellow-400 rounded-xl font-medium text-white">
                      <TiTickOutline size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-8">
                <div className="flex flex-col w-full">
                  <div className="flex text-lg font-medium mb-4 items-start text-blue-400">
                    Nifo User
                  </div>
                  <div className="text-base grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                    <div className="font-medium text-left">User Name</div>
                    <div className="text-left">
                      {request.from_user.first_name}
                    </div>
                    <div className="font-medium text-left">User Mail ID</div>
                    <div className="text-left">anand@abc.com</div>
                    <div className="font-medium text-left">User org</div>
                    <div className="text-left">
                      {request.from_user.organization_name}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex text-lg font-medium mb-4 items-start text-blue-400">
                    GTF User
                  </div>
                  <div className="text-base grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                    <div className="font-medium text-left">SPOC</div>
                    <div className="text-left">Anand</div>
                    <div className="font-medium text-left">Email</div>
                    <div className="text-left">
                      {request.to_growthtechfirm.startup_emails}
                    </div>
                    <div className="font-medium text-left">Firm's Website</div>
                    <div className="text-left">
                      {request.to_growthtechfirm.startup_url}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-10 p-6 rounded-b">
              {assigned ? (
                <div className="bg-blue-400 rounded-lg text-lg text-white font-semibold px-6 py-1.5 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                  Assigned
                </div>
              ) : (
                <button
                  className="bg-blue-400 rounded-lg text-lg text-white background-transparent font-semibold px-6 py-1.5 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => changeAssignToMe(request.id)}
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin" size={24} />
                  ) : (
                    "Assign to me"
                  )}
                </button>
              )}
              <button
                className="bg-white text-blue-400 rounded-lg text-lg border border-blue-400 font-semibold px-6 py-1.5 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setAssignToMeOpen(false)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignToMe;
