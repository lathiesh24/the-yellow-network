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
    assignedTo: {
      first_name: string;
      email: string;
      organization_name: string;
    }
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

  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  const userEmail = userInfo?.email;
  const userCompany = userInfo?.organization_name;
  const userName = userInfo?.first_name;

  const changeAssignToMe = async (id: number) => {
    setLoading(true);
    const jwtAccessToken = localStorage.getItem("jwtAccessToken");

    if (jwtAccessToken) {
      try {
        await axios.put(
          `http://127.0.0.1:8000/partnerconnect/${id}`,
          {
            assigned_status: true,
            assigned_to: {
              first_name: userName,
              email: userEmail,
              organization_name: userCompany,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${jwtAccessToken}`,
            },
          }
        );
        setAssigned(true);
        updateAssignedStatus(id, true, {
          first_name: userName,
          email: userEmail,
          organization_name: userCompany,
        });
        setAssignToMeOpen(false);
      } catch (error) {
        console.error(
          "Error in PUT request:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    } else {
      console.error("JWT token not found in localStorage");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="max-w-5xl">
        <div className="p-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-row justify-between">
              <div className="text-xl font-semibold py-2 pb-4">
                Request Detail
              </div>
              <button
                className="text-gray-300"
                onClick={() => setAssignToMeOpen(false)}
              >
                <span className="text-3xl text-black">x</span>
              </button>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                <div className="relative">
                  <div className="absolute text-xs transform left-4 -translate-y-1/2 bg-white">
                    Usecase
                  </div>
                  <div className="p-2 shadow-lg rounded-lg border break-words whitespace-normal text-left">
                    {request.user_query.query}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute text-xs transform left-4 -translate-y-1/2 bg-white">
                    Growth Tech Firm
                  </div>
                  <div className="p-2 shadow-lg rounded-lg border flex items-center gap-x-1">
                    <div>{request.to_growthtechfirm.startup_name}</div>
                    <div className="text-sm bg-yellow-400 rounded-xl text-white">
                      <TiTickOutline size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-y-4">
                  <div className="text-lg font-semibold text-blue-400">
                    Nifo User
                  </div>
                  <div className="relative">
                    <div className="absolute text-xs transform left-4 -translate-y-1/2 bg-white">
                      User Name
                    </div>
                    <div className="p-2 shadow-lg rounded-lg border">
                      {request.from_user.first_name}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute text-xs transform left-4 -translate-y-1/2 bg-white">
                      User Mail ID
                    </div>
                    <div className="p-2 shadow-lg rounded-lg border">
                      anand@abc.com
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute text-xs transform left-4 -translate-y-1/2 bg-white">
                      User Organization
                    </div>
                    <div className="p-2 shadow-lg rounded-lg border">
                      {request.from_user.organization_name}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-y-4">
                  <div className="text-lg font-semibold text-blue-400">
                    GTF User
                  </div>
                  <div className="relative">
                    <div className="absolute text-xs transform left-4 -translate-y-1/2 bg-white">
                      SPOC
                    </div>
                    <div className="p-2 shadow-lg rounded-lg border">Anand</div>
                  </div>
                  <div className="relative">
                    <div className="absolute text-xs transform left-4 -translate-y-1/2 bg-white">
                      Email
                    </div>
                    <div className="p-2 shadow-lg rounded-lg border">
                      {request.to_growthtechfirm.startup_emails}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute text-xs transform left-4 -translate-y-1/2 bg-white">
                      Firm's Website
                    </div>
                    <div className="p-2 shadow-lg rounded-lg border break-words whitespace-normal text-left">
                      {request.to_growthtechfirm.startup_url}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4 gap-4">
              {assigned ? (
                <div className="bg-blue-400 rounded-lg text-lg text-white font-semibold px-6 py-1.5 outline-none focus:outline-none ease-linear transition-all duration-150">
                  Assigned
                </div>
              ) : (
                <button
                  className="bg-blue-400 rounded-lg text-sm text-white font-semibold px-4 py-1.5 outline-none focus:outline-none ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => changeAssignToMe(request.id)}
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin" size={24} />
                  ) : (
                    "Assign self"
                  )}
                </button>
              )}
              <button
                className="bg-white text-blue-400 rounded-lg text-sm border border-blue-400 font-semibold px-4 py-1.5 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => setAssignToMeOpen(false)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignToMe;
