import React, { useState } from "react";
import sectorsData from "../../data/sector_data.json"; // Import the JSON data

const Sectors = ({ onSectorClick }) => {
  const radius = 174; // Radius of the circle
  const centerX = 166; // Center of the circle on x-axis
  const centerY = 164; // Center of the circle on y-axis

  // Extract sector names from the sectors data
  const sectorNames = sectorsData.sectors.map((sector) => sector.sectorName);

  const totalPositions = 8; // Number of positions around the circle
  const highlightedPosition = 3; // The index of the position to be highlighted (starting from 0)

  // Initialize the dots with the first 8 sectors or repeat if fewer than 8
  const [dots, setDots] = useState(
    Array.from(
      { length: totalPositions },
      (_, i) => sectorNames[i % sectorNames.length]
    )
  );
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the highlighted dot
  const [rotationOffset, setRotationOffset] = useState(0); // Track rotation
  const [isAnimating, setIsAnimating] = useState(false);
  const [startX, setStartX] = useState(null); // Initialize startX state

  const handleTouchStart = (e) => {
    if (isAnimating) return; // Prevent interaction during animation
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX === null || isAnimating) return;

    const deltaX = e.touches[0].clientX - startX;

    if (Math.abs(deltaX) > 20) {
      // Adjust sensitivity as needed
      handleScroll(deltaX > 0 ? "prev" : "next");
      setStartX(e.touches[0].clientX); // Update startX
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  const handleScroll = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (direction === "next") {
      setRotationOffset(
        (prevOffset) => prevOffset - (2 * Math.PI) / totalPositions
      );
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPositions);
    } else if (direction === "prev") {
      setRotationOffset(
        (prevOffset) => prevOffset + (2 * Math.PI) / totalPositions
      );
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + totalPositions) % totalPositions
      );
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this duration with the CSS transition duration
  };

  return (
    <div
      className="relative h-screen w-screen bg-gray-100 flex justify-end items-end select-none pb-20 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sector image, positioned independently */}
      <div className="absolute bottom-20 right-0 z-40">
        <img src="/circle.svg" alt="Sector" className="w-32" />
      </div>

      {/* Dots rotating around the center */}
      <div className="absolute">
        <div className="relative w-48">
          <div className="relative">
            <img
              src="/circle2.svg"
              alt="Inner Arc"
              className="relative w-48 z-0"
            />
            <div className="absolute bottom-10 right-4 flex justify-center items-center z-50">
              <span className="text-lg font-semibold uppercase text-gray-700">
                Sector
              </span>
            </div>
          </div>
          {Array.from({ length: totalPositions }).map((_, index) => {
            const angle =
              (index / totalPositions) * 2 * Math.PI + rotationOffset;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY - radius * Math.sin(angle);

            // Highlight the dot based on the current index
            const isHighlighted =
              index === (currentIndex + highlightedPosition) % totalPositions;

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  visibility: "visible",
                }}
              >
                <div
                  className={`relative rounded-full  shadow-lg ${
                    isHighlighted
                      ? "bg-[#3AB8FF] border-2 border-[#FFEFA7] w-7 h-7"
                      : "bg-[#D8D8D8] w-6 h-6"
                  }`}
                >
                  <div
                    className={`absolute right-full mr-4 text-black text-sm w-32 text-right  ${
                      isHighlighted
                        ? "font-semibold text-base text-[#3AB8FF]"
                        : ""
                    } cursor-pointer`}
                    onClick={() => onSectorClick(dots[index])}
                  >
                    {dots[index]}
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
