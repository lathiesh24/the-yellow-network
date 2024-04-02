import React, { useState } from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { StartupType } from '../interfaces';


interface CompanyProfilePaneProps {
    companyData: StartupType; 
}
const CompanyProfilePane: React.FC<CompanyProfilePaneProps> = ({
    companyData
}) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const toggleWidth = () => {
        setExpanded(!expanded);
    };
    console.log(companyData,"companyData")

    return (
        <>
            <div className={`fixed top-0 right-0 bg-white shadow-md min-h-screen ${expanded ? 'w-[1000px]' : 'max-w-96'}`}>
                <div className='flex flex-col gap-y-4 py-8'>
                    <div className='flex flex-col gap-y-5 px-8 -mt-5'>
                        {!expanded ?
                            (<div className=' -ml-2 cursor-pointer' onClick={toggleWidth}>
                                <MdOutlineKeyboardDoubleArrowLeft size={23} />
                            </div>) :
                            (<div className=' -ml-2 cursor-pointer' onClick={toggleWidth}>
                                <MdOutlineKeyboardDoubleArrowRight size={23} />
                            </div >)}
                        <div className='flex flex-row justify-between items-center -mt-3 text-blue-400 font-semibold text-xl'>
                            <div>
                                {companyData?.startup_name}
                            </div>
                            <div className='flex justify-center items-center px-4 py-1.5 bg-gray-400 rounded-md text-white font-semibold cursor-pointer'>
                                Connect
                            </div>
                        </div>
                        <div className='border bg-white rounded-md px-4 py-4 shadow-sm'>
                            {companyData?.startup_overview}
                        </div>
                    </div>
                    {companyData?.startup_industry && (
                            <div className='flex flex-col gap-y-1.5 px-8'>
                                <div className='font-semibold'>Industry</div>
                                <div>{companyData?.startup_industry}</div>
                            </div>
                        )}
                    {companyData?.startup_technology && (
                            <div className='flex flex-col gap-y-1.5 px-8'>
                                <div className='font-semibold'>Technology</div>
                                <div>{companyData?.startup_technology}</div>
                            </div>
                        )}
                    {companyData?.startup_country && (
                            <div className='flex flex-col gap-y-1.5 px-8'>
                                <div className='font-semibold'>Country</div>
                                <div>{companyData?.startup_country}</div>
                            </div>
                        )}
                    {companyData?.startup_company_stage && (
                            <div className='flex flex-col gap-y-1.5 px-8'>
                                <div className='font-semibold'>Company Stage</div>
                                <div>{companyData?.startup_company_stage}</div>
                            </div>
                    )}
                    {companyData?.startup_url && (
                            <div className='flex flex-col gap-y-1.5 px-8'>
                                <div className='font-semibold'>Company profile</div>
                                <div>{companyData?.startup_url}</div>
                            </div>
                        )}
                    {companyData?.startup_description && (
                            <div className='flex flex-col gap-y-1.5 px-8'>
                                <div className='font-semibold'>Description</div>
                                <div>{companyData?.startup_description}</div>
                            </div>
                    )}
                    {companyData?.startup_solutions && (
                            <div className='flex flex-col gap-y-1.5 px-8'>
                                <div className='font-semibold'>Solutions provided</div>
                                <div>{companyData?.startup_solutions}</div>
                            </div>
                    )}
                    {companyData?.startup_usecases && (
                            <div className='flex flex-col gap-y-1.5 px-8'>
                                <div className='font-semibold'>Usecases</div>
                                <div>{companyData?.startup_usecases}</div>
                            </div>
                    )}
                    {companyData?.startup_founders_info && (
                            <div className='flex flex-col gap-y-1.5 px-8'>
                                <div className='font-semibold'>Founders Info</div>
                                <div>{companyData?.startup_founders_info}</div>
                            </div>
                    )}
                    {companyData?.startup_emails && (
                            <div className='flex flex-col gap-y-1.5 px-8'>
                                <div className='font-semibold'>Emails</div>
                                <div>{companyData?.startup_emails}</div>
                            </div>
                    )}
                  
                </div>
            </div>
        </>
    );
};

export default CompanyProfilePane;
