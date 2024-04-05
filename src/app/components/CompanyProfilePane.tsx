import React, { useState } from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { StartupType } from '../interfaces';
import { GrFormClose } from "react-icons/gr";
import Link from 'next/link';
import axios from "axios";
interface CompanyProfilePaneProps {
    companyData: StartupType;
    setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
    openState: boolean
}
const CompanyProfilePane: React.FC<CompanyProfilePaneProps> = ({
    companyData,
    setOpenState,
    openState
}) => {
    const [expanded, setExpanded] = useState<boolean>(false);


    const toggleWidth = () => {
        setExpanded(!expanded);
    };

    const openPane = () => {
        setOpenState(false)
    }

    const sendEmail = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/email/send-email/', {
                subject: 'Demo',
                template_name: 'email_template.html',
                context: { name: 'John Doe' },
                recipient_list: 'lathiesh@theyellow.network',
            });

            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };


    console.log(openState, "companyData")

    return (
        <>
           {openState &&
            (
                <div className={`fixed top-0 right-0 bg-white shadow-md min-h-screen ${expanded ? 'w-[1000px]' : 'max-w-96'}`}>
                <div className='flex flex-col gap-y-4 py-8 overflow-auto h-screen'>
                    <div className=''>
                            <div className='mx-6 flex flex-col -mt-5 gap-6'>
                                <div className='flex justify-between'>
                                        {!expanded ?
                                            (<div className=' -ml-2 cursor-pointer' onClick={toggleWidth}>
                                                <MdOutlineKeyboardDoubleArrowLeft size={23} />
                                            </div>) :
                                            (<div className=' -ml-2 cursor-pointer' onClick={toggleWidth}>
                                                <MdOutlineKeyboardDoubleArrowRight size={23} />
                                            </div >)}
                                        <div className='mx-4 cursor-pointer' onClick={openPane}>
                                            <GrFormClose size={23} />
                                        </div>
                                    </div>

                                <div className='flex flex-col gap-2 text-sm'>
                                        <div className='flex flex-row justify-between items-center -mt-3 text-blue-400 font-semibold text-xl'>
                                            <div>
                                                {companyData?.startup_name}
                                            </div>
                                            <div
                                                className='flex justify-center items-center px-4 py-1.5 bg-gray-400 rounded-md text-white font-semibold cursor-pointer'
                                                onClick={sendEmail}>
                                                Connect
                                            </div>
                                        </div>
                                        <div className='border bg-white rounded-md px-4 py-4 shadow-sm'>
                                            {companyData?.startup_overview}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                {companyData?.startup_industry && (
                                    <div className='flex flex-col px-8'>
                                        <div className='font-semibold'>Industry : </div>
                                        <div className='pl-4'>{companyData?.startup_industry}</div>
                                    </div>
                                )}
                                {companyData?.startup_technology && (
                                    <div className='flex flex-col px-8'>
                                        <div className='font-semibold'>Technology :</div>
                                        <div className='pl-4'>{companyData?.startup_technology}</div>
                                    </div>
                                )}
                                {companyData?.startup_country && (
                                    <div className='flex px-8'>
                                        <div className='font-semibold'>Country : </div>
                                        <div className='pl-4'>{companyData?.startup_country}</div>
                                    </div>
                                )}
                                {companyData?.startup_company_stage && (
                                    <div className='flex px-8'>
                                        <div className='font-semibold'>Company Stage :</div>
                                        <div className='pl-4'>{companyData?.startup_company_stage}</div>
                                    </div>
                                )}
                                {companyData?.startup_url && (
                                    <div className='flex flex-col px-8'>
                                        <div className='font-semibold'>Company profile:</div>
                                        <a href={companyData?.startup_url} className='pl-4 underline text-blue-500'>{companyData?.startup_url}</a>
                                    </div>
                                )}
                                {companyData?.startup_description && (
                                    <div className='flex flex-col px-8'>
                                        <div className='font-semibold'>Description:</div>
                                        <div className='pl-4'>{companyData?.startup_description}</div>
                                    </div>
                                )}
                                {companyData?.startup_solutions && (
                                    <div className='flex flex-col px-8'>
                                        <div className='font-semibold'>Solutions:</div>
                                        <div className='pl-4'>{companyData?.startup_solutions}</div>
                                    </div>
                                )}
                                {companyData?.startup_usecases && (
                                    <div className='flex flex-col px-8'>
                                        <div className='font-semibold'>Usecases:</div>
                                        <div className='pl-4'>{companyData?.startup_usecases}</div>
                                    </div>
                                )}
                                {/* {companyData?.startup_founders_info && (
                                    <div className='flex flex-col px-8'>
                                        <div className='font-semibold'>Founders Info</div>
                                        <div className='pl-4'>{companyData?.startup_founders_info}</div>
                                    </div>
                                )}
                                {companyData?.startup_emails && (
                                    <div className='flex flex-col px-8'>
                                        <div className='font-semibold'>Emails</div>
                                        <div className='pl-4'>{companyData?.startup_emails}</div>
                                    </div>
                                )} */}
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    );
};

export default CompanyProfilePane;
