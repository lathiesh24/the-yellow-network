"use client";

import React from 'react';
import { encryptURL } from '../../utils/shareUtils';

interface SuggestionProps {
  suggestion: {
    startup_id: number;
    startup_name: string;
  };
}

const Suggestions: React.FC<SuggestionProps> = ({ suggestion }) => {
  const handleSuggestionClick = (id: string) => {
    const encryptedID = encryptURL(id);
    window.location.href = `/companies/${encryptedID}`;
  };

  return (
    <div>
      <div
        key={suggestion.startup_id}
        className="p-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => handleSuggestionClick(suggestion.startup_id.toString())}
      >
        {suggestion.startup_name}
      </div>
    </div>
  );
};

export default Suggestions;
