import React, { useState } from "react";
import sectorsData from "../../data/sector_data.json"; // Import the JSON data

const Sectors = ({ onSectorClick }) => {
  const radius = 174; // Radius of the circle
  const centerX = 166; // Center of the circle on x-axis
  const centerY = 164; // Center of the circle on y-axis

  // Extract sector names from the sectors data
  const sectorNames = sectorsData.sectors.map((sector) => sector.sectorName);

  // Define the fixed positions for the three dots along the curve
  const fixedAngles = [
    Math.PI, // Leftmost position (180°)
    (3 * Math.PI) / 4, // Middle position (135°)
    Math.PI / 2, // Rightmost position (90°)
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const middleIndex = Math.floor(fixedAngles.length / 2); // Find the middle dot index

  const handleTouchStart = (e) => {
    if (isAnimating) return; // Prevent interaction during animation
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX === null || isAnimating) return;

    const deltaX = e.touches[0].clientX - startX;

    if (deltaX > 50) {
      handleScroll("prev");
      setStartX(e.touches[0].clientX); // Reset startX to the new position
    } else if (deltaX < -50) {
      handleScroll("next");
      setStartX(e.touches[0].clientX); // Reset startX to the new position
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  const handleScroll = (direction) => {
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        direction === "next"
          ? (prevIndex + 1) % sectorNames.length
          : (prevIndex - 1 + sectorNames.length) % sectorNames.length
      );
      setIsAnimating(false);
    }, 500); // Match this duration with the CSS transition duration
  };

  return (
    <div
      className="relative h-screen bg-gray-100 flex justify-end items-end select-none pb-20"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div>
        <img src="/circle.svg" alt="" className="w-32" />
      </div>

      <div className="absolute">
        <div className="relative w-48 animate-atom-spin">
          {" "}
          {/* Add animation class here */}
          <div className="relative">
            <img src="/circle2.svg" alt="" className="relative w-48" />
            <div className="absolute bottom-10 right-4 flex justify-center items-center">
              <span className="text-lg font-semibold uppercase text-gray-700">
                Sector
              </span>
            </div>
          </div>
          {fixedAngles.map((angle, index) => {
            const isMiddleDot = index === middleIndex; // Check if this is the middle dot
            const newAngle = angle + (isAnimating ? Math.PI / 4 : 0); // Adjust angle during animation
            const x = centerX + radius * Math.cos(newAngle);
            const y = centerY - radius * Math.sin(newAngle);

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out`}
                style={{ left: `${x}px`, top: `${y}px` }}
              >
                <div
                  className={`relative rounded-full shadow-lg ${
                    isMiddleDot
                      ? "bg-[#3AB8FF] border-2 border-[#FFEFA7] w-7 h-7"
                      : "bg-[#D8D8D8] w-6 h-6"
                  }`}
                >
                  <div
                    className={`absolute right-full mr-4 text-black text-sm w-32 text-right  ${
                      isMiddleDot ? "font-semibold text-base" : ""
                    } cursor-pointer`}
                    onClick={() =>
                      onSectorClick(
                        sectorNames[(currentIndex + index) % sectorNames.length]
                      )
                    } // Pass the selected sector name on click
                  >
                    {sectorNames[(currentIndex + index) % sectorNames.length]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sectors;
