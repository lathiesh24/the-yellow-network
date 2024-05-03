import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdFeedback } from "react-icons/md";
import FeedbackForm from './FeedbackForm'; // Import your FeedbackForm component

interface NavbarProps {
    open: boolean;
    handleToggleLeftFrame: () => void;
}

const NavBar: React.FC<NavbarProps> = ({ open, handleToggleLeftFrame }) => {
    const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);

    const handleFeedbackIconClick = () => {
        setIsFeedbackFormOpen(true);
    };

    const closeFeedbackForm = () => {
        setIsFeedbackFormOpen(false);
    };

    return (
        <div
            className={`flex bg-white items-center flex-row  cursor-pointer transition-all pt-4 ${open ? 'xl:pl-[310px]' : 'pl-2'}`}
        >
            {open ? (
                <div
                    className={`${open ? '' : 'hidden'}`}
                    onClick={handleToggleLeftFrame}>
                    <IoIosArrowBack size={23} />
                </div>
            ) : (
                <div
                    className={`${!open ? '' : 'hidden'}`}
                    onClick={handleToggleLeftFrame}>
                    <IoIosArrowForward size={23} />
                </div>
            )}
            <div
                className='ml-8'
                onClick={handleFeedbackIconClick}>
                <MdFeedback size={23} />
            </div>
            <FeedbackForm isOpen={isFeedbackFormOpen} onRequestClose={closeFeedbackForm} />
        </div>
    );
};

export default NavBar;
