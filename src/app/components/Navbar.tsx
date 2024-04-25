import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface NavbarProps {
    open: boolean;
    handleToggleLeftFrame: () => void;
}

const NavBar: React.FC<NavbarProps> = ({ open, handleToggleLeftFrame }) => {
    return (
        <div className="flex bg-white items-center flex-row cursor-pointer transition-all pt-4 relative">
            <div
                className={`${open ? '' : 'hidden'} absolute left-0`}
                style={{ zIndex: 1 }}>
                <IoIosArrowBack size={23} onClick={handleToggleLeftFrame} />
            </div>
            <div
                className={`${!open ? '' : 'hidden'} absolute left-0`}
                style={{ zIndex: 1 }}>
                <IoIosArrowForward size={23} onClick={handleToggleLeftFrame} />
            </div>
        </div>
    );
};

export default NavBar;
