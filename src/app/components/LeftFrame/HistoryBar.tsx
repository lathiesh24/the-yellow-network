import axios from "axios";
import React, { useState, useEffect } from "react";

interface HistoryBarProps {
  onSelectHistory: (value: string) => void;
  historyData: any[]
}


const HistoryBar: React.FC<HistoryBarProps> = ({ onSelectHistory, historyData }) => {

  const sendQueryHistory = (value: string) => {
    onSelectHistory(value);
  };



  return (
    <>
      <div className="text-sm py-3 px-2 text-gray-400 font-semibold">
        Query History
      </div>
      <div>
        {Object.entries(historyData).map(([timePeriod, queries]) => (
          queries.length > 0 && (
            <div key={timePeriod}>
              <div className="text-sm py-2 px-2 text-gray-500 font-semibold">
                {timePeriod}
              </div>
              {queries.map((query, index) => (
                <div
                  key={index}
                  className="mx-1 px-3 py-2.5 overflow-hidden overflow-ellipsis whitespace-nowrap text-[14px] hover:bg-gray-200 font-normal hover:font-medium rounded-sm hover:text-gray-600 cursor-pointer"
                  onClick={() => sendQueryHistory(query)}
                >
                  {query}
                </div>
              ))}
            </div>
          )
        ))}
      </div>
    </>
  );
};

export default HistoryBar;
