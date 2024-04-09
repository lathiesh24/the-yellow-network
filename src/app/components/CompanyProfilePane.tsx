import React, { useState } from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { StartupType } from "../interfaces";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
interface CompanyProfilePaneProps {
  companyData: StartupType;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
  openState: boolean;
}
const CompanyProfilePane: React.FC<CompanyProfilePaneProps> = ({
  companyData,
  setOpenState,
  openState,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleWidth = () => {
    setExpanded(!expanded);
  };

  const openPane = () => {
    setOpenState(false);
  };

  const sendEmail = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/email/send-email/",
        {
          subject: "Demo",
          template_name: "email_template.html",
          context: { name: "John Doe" },
          recipient_list: "lathiesh@theyellow.network",
        }
      );

      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(openState, "companyData");

  return (
    <>
      {openState && (
        <div
          className={`fixed top-0 right-0  bg-white shadow-md min-h-screen ${
            expanded ? "w-[1000px]" : "max-w-96"
          }`}
        >
          <div className="overflow-y-scroll h-screen">
            <div className="relative">
              {!expanded ? (
                <div
                  className="absolute left-2 top-2 cursor-pointer"
                  onClick={toggleWidth}
                >
                  <MdOutlineKeyboardDoubleArrowLeft size={23} />
                </div>
              ) : (
                <div
                  className="absolute left-2 top-2 cursor-pointer"
                  onClick={toggleWidth}
                >
                  <MdOutlineKeyboardDoubleArrowRight size={23} />
                </div>
              )}
              <div
                className="fixed top-2 right-4 cursor-pointer"
                onClick={openPane}
              >
                <GrFormClose size={23} />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {/* Name and connect button */}
              <div className="flex flex-row justify-between items-center gap-4 text-blue-400 font-semibold text-lg mx-4 mt-10">
                {/* Company name */}
                <div>{companyData?.startup_name}</div>

                {/* Connect button */}
                <div
                  className="flex justify-center items-center px-2 py-1 text-base bg-gray-400 rounded-md text-white font-semibold cursor-pointer"
                  onClick={sendEmail}
                >
                  Connect
                </div>
              </div>

              {/* Various fields */}
              <div className="text-sm flex flex-col gap-3">
                {companyData?.startup_industry && (
                  <div className="flex flex-col px-8">
                    <div className="font-semibold">Industry : </div>
                    <div className="pl-4">{companyData?.startup_industry}</div>
                  </div>
                )}
                {companyData?.startup_technology && (
                  <div className="flex flex-col px-8">
                    <div className="font-semibold">Technology :</div>
                    <div className="pl-4">
                      {companyData?.startup_technology}
                    </div>
                  </div>
                )}
                {companyData?.startup_country && (
                  <div className="flex px-8">
                    <div className="font-semibold">Country : </div>
                    <div className="pl-4">{companyData?.startup_country}</div>
                  </div>
                )}
                {companyData?.startup_company_stage && (
                  <div className="flex px-8">
                    <div className="font-semibold">Company Stage :</div>
                    <div className="pl-4">
                      {companyData?.startup_company_stage}
                    </div>
                  </div>
                )}
                {companyData?.startup_url && (
                  <div className="flex flex-col px-8">
                    <div className="font-semibold">Company profile:</div>
                    <a
                      href={companyData?.startup_url}
                      className="pl-4 underline text-blue-500"
                    >
                      {companyData?.startup_url}
                    </a>
                  </div>
                )}
                {companyData?.startup_description && (
                  <div className="flex flex-col px-8">
                    <div className="font-semibold">Description:</div>
                    <div className="pl-4">
                      {companyData?.startup_description}
                    </div>
                  </div>
                )}
                {companyData?.startup_solutions && (
                  <div className="flex flex-col px-8">
                    <div className="font-semibold">Solutions:</div>
                    <div className="pl-4">{companyData?.startup_solutions}</div>
                  </div>
                )}
                {companyData?.startup_usecases && (
                  <div className="flex flex-col px-8">
                    <div className="font-semibold">Usecases:</div>
                    <div className="pl-4">{companyData?.startup_usecases}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyProfilePane;
