import React, { useState, useEffect } from "react";
import Image from "next/image";

const SpotlightMobile = () => {
  // Helper function to format the date
  function getFormattedDate() {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).replace(',', '');
  }

  // State to store the formatted date
  const [cdate, setCDate] = useState(getFormattedDate());

  // Updating date on component mount (if needed in the future for live updates)
  useEffect(() => {
    const interval = setInterval(() => {
      setCDate(getFormattedDate());
    }, 1000 * 60 * 60 * 12);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-around gap-6 py-7 items-start mx-7 text-lg">
      <div className="font-normal">SPOTLIGHT</div>
      {/* Spotlight video */}
      <div className="flex flex-col gap-4">
        <div>
          <Image
            src="/thirdai-mobile.png"
            width={500}
            height={500}
            alt="spotlight"
          />
        </div>
        <div className="font-light text-sm">{cdate}</div>
      </div>
      {/* Spot light title */}
      <div className="leading-9 tracking-wide line-clamp-4">
        How ThirdAI revolutionizes AI with sparse computing, enabling efficient, cost-effective deep learning on standard CPUs, driving AI accessibility and deployment trends
      </div>
    </div>
  );
};

export default SpotlightMobile;
