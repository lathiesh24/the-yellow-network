import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface NavbarProps {
    open: boolean;
    handleToggleLeftFrame: () => void;
}

const NavBar: React.FC<NavbarProps> = ({ open, handleToggleLeftFrame }) => {

    return (
        <div
            className={`fixed flex z-[999] h-max w-max items-center flex-row mt-3 cursor-pointer transition-all ${open ? 'sm:ml-36  md:ml-[180px] lg:ml-[220px] xl:ml-[270px]' : 'ml-4'}`}
            onClick={handleToggleLeftFrame}>
            {open ? (
                <div className={`${open ? '' : 'hidden'}`}>
                    <IoIosArrowBack size={23} />
                </div>
            ) : (
                <div className={`${!open ? '' : 'hidden'}`}>
                    <IoIosArrowForward size={23} />
                </div>
            )}
        </div>
    );
};

export default NavBar;
