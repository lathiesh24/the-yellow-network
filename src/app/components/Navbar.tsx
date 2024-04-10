import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface NavbarProps {
    open: boolean;
    handleToggleLeftFrame: () => void;
}

const NavBar: React.FC<NavbarProps> = ({ open, handleToggleLeftFrame }) => {

    return (
        <div
            className={`flex bg-white items-center flex-row  cursor-pointer transition-all pt-4 ${open ? 'ml-[312px] ' : 'ml-2'}`}
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
        </div>
    );
};

export default NavBar;
