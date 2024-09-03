import React from "react";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa6";

const MobileHeader = ({ handleBack }) => {
  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-16 border-b shadow-md bg-white z-50 flex items-center justify-between px-4">
        {/* Left Arrow */}
        <div
          className="text-gray-700 cursor-pointer z-50"
          onClick={handleBack} // This will trigger the handleBack function passed as a prop
          role="button"
          aria-label="Go back"
        >
          <FaAngleLeft size={24} />
        </div>

        {/* Centered Logo */}
        <div className="mx-auto">
          <Image src="/nifoimage.png" width={100} height={100} alt="Tyn Logo" />
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
