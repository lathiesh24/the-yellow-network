import React, { useState } from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const CompanyProfilePane: React.FC = () => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const toggleWidth = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <div className={`fixed top-0 right-0 bg-white shadow-md ${expanded ? 'w-[1000px]' : 'max-w-96'}`}>
                <div className='flex flex-col gap-y-4 py-8'>
                    <div className='flex flex-col gap-y-5 px-8 -mt-5'>
                        {!expanded ?
                            (<div className=' -ml-2 cursor-pointer' onClick={toggleWidth}>
                                <MdOutlineKeyboardDoubleArrowLeft size={23} />
                            </div>) :
                            (<div className=' -ml-2 cursor-pointer' onClick={toggleWidth}>
                                <MdOutlineKeyboardDoubleArrowRight size={23} />
                            </div >)}
                        <div className='flex flex-row justify-between items-center -mt-3'>
                            <div>
                                Spyne
                            </div>
                            <div className='flex justify-center items-center px-4 py-1.5 bg-gray-400 rounded-md text-white font-semibold cursor-pointer'>
                                Connect
                            </div>
                        </div>
                        <div className='border bg-white rounded-md px-4 py-4 shadow-sm'>
                            AgNext revolutionizes AgTech, employing AI-based food assessment tech for transparent, rapid, and chemical-free quality analysis across the agriculture value chain.
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-1.5 px-8'>
                        <div>Industry</div>
                        <div>Company Industry</div>
                    </div>
                    <div className='flex flex-col gap-y-1.5 px-8'>
                        <div>Technology</div>
                        <div>Virtual Reality</div>
                    </div>
                    <div className='flex flex-col gap-y-1.5 px-8'>
                        <div>Country</div>
                        <div>United States of America</div>
                    </div>
                    <div className='flex flex-col gap-y-1.5 px-8'>
                        <div>Company Stage</div>
                        <div>Series B</div>
                    </div>
                    <div className='flex flex-col gap-y-1.5 px-8'>
                        <div>Website Url</div>
                        <div>www.demosite.com</div>
                    </div>
                    <div className='flex flex-col gap-y-1.5 px-8'>
                        <div>Founder's Information</div>
                        <div className='border bg-white rounded-md px-4 py-4 shadow-sm'>
                            Hedva Feldman (CoFounder & CEO, . Harvard University Ronen Feldman(CoFounder, E1984,Cornell University PhD 1993)
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-1.5 px-8'>
                        <div>Email</div>
                        <div className='border bg-white rounded-md px-4 py-4 shadow-sm'>
                            avishai.wool@algosec.com, yuval.baron@algosec.com
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyProfilePane;
