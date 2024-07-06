import React from "react";
import { FaRegLightbulb } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";

const BottomBar = () => {
  return (
    <div>
      <div className="fixed bottom-0 border-t border-gray-400 w-full h-24 flex items-center justify-around">    
          {/* Spotlight */}
          <div className="flex flex-col items-center justify-center font-medium gap-2">
            <div>
            <FaRegLightbulb size={24} />
            </div>
            <div className="text-xs">
              Spotlight
            </div>
          </div>

          {/* Search */}
          <div className="flex flex-col items-center justify-center font-medium gap-2">
            <div>
            <FaRegLightbulb size={24} />
            </div>
            <div className="text-xs">
              Search
            </div>
          </div>

          {/* Trends */}
          <div className="flex flex-col items-center justify-center font-medium gap-2">
            <div>
            <FaRegLightbulb size={24} />
            </div>
            <div className="text-xs">
              Trends
            </div>
          </div>

          {/* More */}
          <div className="flex flex-col items-center justify-center font-medium gap-2">
            <div>
            <IoMdMore size={23} />
            </div>
            <div className="text-xs">
              More
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default BottomBar;
