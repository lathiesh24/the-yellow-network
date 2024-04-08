import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { BsLinkedin } from 'react-icons/bs';

const Spotlight: React.FC = () => {

    const spotlightInfo = () => {

    }

    return (
        <div className='h-screen overflow-y-auto'>
            <div className='text-sm py-3 px-2 text-gray-400 font-semibold'>
                Spotlight
            </div>
            <div className='mx-4'>
                <div
                    className='font-medium cursor-pointer'
                    onClick={spotlightInfo}>
                    Third AI
                </div>
                <div
                    className="flex justify-center items-center cursor-pointer"
                    onClick={spotlightInfo}>
                    <Image
                        src="/thirdai-logo.png"
                        alt='Third AI'
                        width={100}
                        height={50} />
                </div>
                <div className='text-balance'>
                    We are excited to present our second startup spotlight & in this edition, we shine the spotlight on ThirdAI Corp. and its disruption in GenAi tech.

                    Our emphasis is on showcasing innovative tech startups dedicated to addressing real-world challenges & we believe ThirdAi's commitment to democratize Ai is commendable by making AI more affordable and cost effective while retaining the latency & accuracy.

                    If you have particular inquiries on startups or would like insights into the co-innovation ecosystem in a specific domain, we are happy to assist you.
                </div>
                <div className='flex flex-row mt-4 gap-x-3 justify-center'>
                    <a
                        className=""
                        href='https://www.linkedin.com/feed/update/urn:li:activity:7167401470131130368/'>
                        <BsLinkedin size={23} color="#0077B5" />
                    </a>
                    <div>
                        <a className=' text-sky-700 font-medium' href='https://www.linkedin.com/feed/update/urn:li:activity:7167401470131130368/'>LinkedIn Post</a>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Spotlight;
