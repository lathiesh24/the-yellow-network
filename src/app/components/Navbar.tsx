import Image from "next/image";
import React, { useState } from "react";
import {
    BsClockFill,
    BsPersonCircle,
    BsCaretDownFill
} from "react-icons/bs";

const NavBar: React.FC = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="flex bg-white h-max w-full items-center flex-row justify-between shadow-md py-3">
            <div className="ml-8">
                <Image
                    src="/tyn-logo.png"
                    alt="The Yellow Network Logo"
                    width={160}
                    height={40}
                />
            </div>
            <div className="text-gray-800 grid grid-flow-col gap-x-16 mr-14">
                <div className="flex flex-col items-center mt-0.5">
                    <div>
                        <BsClockFill size={24} />
                    </div>
                    <div className="text-[10px] mt-1.5">History</div>
                </div>
                <div className="relative inline-block text-left">
                    <div className="flex flex-col items-center mt-0.5" onClick={toggleDropdown}>
                        <div>
                            <BsPersonCircle size={24} />
                        </div>
                        <div className="flex flex-row">
                            <div className="text-[10px]  cursor-pointer mt-1">Me</div>
                            <div className="mt-2">
                                <BsCaretDownFill size={8} />
                            </div>
                        </div>
                    </div>

                    {dropdownVisible && (
                        <div className="absolute z-10 -ml-4 mt-2 w-24 bg-white rounded-md shadow-lg">
                            <ul className="py-1">
                                <li className="text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer">Profile</li>
                                <li className="text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer">Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
