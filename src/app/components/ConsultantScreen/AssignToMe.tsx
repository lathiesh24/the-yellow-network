import React from "react";
import { TiTickOutline } from "react-icons/ti";
import axios from "axios";

interface Request {
  id: number;
  assigned_to: any; // You may want to specify a more specific type here
  query_status: string;
  created_at: string;
  assigned_status: boolean;
  to_growthtechfirm: {
    startup_id: number;
    startup_name: string;
    startup_url: string;
    startup_analyst_rating: string;
    startup_gsi: any; // You may want to specify a more specific type here
    startup_partners: any; // You may want to specify a more specific type here
    startup_customers: any; // You may want to specify a more specific type here
    startup_usecases: string;
    startup_solutions: string;
    startup_industry: string;
    startup_technology: string;
    startup_overview: string;
    startup_description: string;
    startup_company_stage: string;
    startup_country: string;
    startup_founders_info: string;
    startup_emails: string;
  };
  from_user: {
    id: number;
    first_name: string;
    organization_name: string;
  };
  user_query: {
    id: number;
    query: string;
    timestamp: string;
    user: number;
  };
}

interface AssignToMeProps {
  assignToMeOpen: boolean;
  setAssignToMeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  request: Request;
}

const AssignToMe: React.FC<AssignToMeProps> = ({
  setAssignToMeOpen,
  assignToMeOpen,
  request,
}) => {
  const handleAssignToMe = (id: number) => {
    setAssignToMeOpen(false);
    axios
      .put(`http://127.0.0.1:8000/partnerconnect/${id}`, {
        assigned_status: true,
        assigned_to: 1,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="my-6 max-w-3xl">
          {/*content*/}
          <div className="p-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
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
              <button
                className="bg-blue-400 rounded-lg text-lg text-white background-transparent font-semibold  px-6 py-1.5 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleAssignToMe(request.id)}
              >
                Assign to me
              </button>
              <button
                className="bg-white text-blue-400 rounded-lg text-lg border border-blue-400  font-semibold  px-6 py-1.5 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
  );
};

export default AssignToMe;
