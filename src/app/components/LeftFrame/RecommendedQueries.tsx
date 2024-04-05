import React from 'react';
import data from '../../data/recommendedQueries'

interface RecommendedQueriesProps {
    onSelectHistory: (value: string) => void;
}



const RecommendedQueries: React.FC<RecommendedQueriesProps> = ({ onSelectHistory }) => {

    const sendQueryHistory = (value: string) => {
        onSelectHistory(value);
    };

    return (
        <div className='h-screen overflow-y-auto scrollbar'>
            <div className='text-sm py-3 px-2 text-gray-400 font-semibold'>
                Recommended Queries
            </div>
            <div className=''>
                {data.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="mx-1 px-3 py-2.5 overflow-hidden overflow-ellipsis  whitespace-nowrap text-[14px] hover:bg-gray-200 font-normal hover:font-medium rounded-sm hover:text-gray-600"
                            onClick={() => sendQueryHistory(item.prompt)}>
                            {item.shortName}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecommendedQueries;