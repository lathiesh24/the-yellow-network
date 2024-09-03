"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa";
import Image from "next/image";

const UsecaseDescription = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extracting data from query parameters
  const usecase = searchParams.get("usecase");
  const usecaseDescription = searchParams.get("usecaseDescription");
  const enhancement = searchParams.get("Enhancement");
  const measureOfImpact = searchParams.get("MeasureOfImpact");
  const startups = JSON.parse(searchParams.get("startups") || "[]");

  console.log("useCase startups", startups); // Debugging the startups array

  const handleGoBack = () => {
    router.back(); // Navigate to the previous page
  };

  const handleExploreEcosystem = () => {
    // Construct the query string manually
    const query = new URLSearchParams({
      usecase,
      usecaseDescription,
      startups: JSON.stringify(startups), // Pass startups as a JSON string
      Enhancement: enhancement,
      MeasureOfImpact: measureOfImpact,
    }).toString();

    // Use router.push with the constructed URL
    router.push(`/ecosystem?${query}`);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="relative">
        <div className="fixed top-0 left-0 w-full h-16 border-b shadow-md bg-white z-50 flex items-center justify-between px-4">
          {/* Left Arrow */}
          <div
            className="text-gray-700 cursor-pointer z-50"
            onClick={handleGoBack} // This will trigger the handleGoBack function
            role="button"
            aria-label="Go back"
          >
            <FaAngleLeft size={24} />
          </div>

          {/* Centered Logo */}
          <div className="mx-auto">
            <Image
              src="/nifoimage.png"
              width={100}
              height={100}
              alt="Tyn Logo"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col bg-[#005585] px-4 justify-center items-center text-center gap-8 py-8 mt-16">
        <div className="font-semibold text-white text-3xl">
          {usecase || "No Use Case Title Available"}
        </div>
        <div
          className="text-54 text-lg font-medium bg-white mx-auto px-4 py-2 cursor-pointer rounded-md shadow-md"
          onClick={handleExploreEcosystem}
        >
          Explore Ecosystem
        </div>
      </div>

      <div className="mx-4 py-4 leading-9 text-xl">
        {usecaseDescription && (
          <div>
            <div className="font-semibold text-xl mb-2">Description</div>
            <div className="text-base">{usecaseDescription}</div>
          </div>
        )}

        {enhancement && (
          <div className="mt-4">
            <div className="font-semibold text-xl mb-2">Enhancement</div>
            <div className="text-base">{enhancement}</div>
          </div>
        )}

        {measureOfImpact && (
          <div className="mt-4">
            <div className="font-semibold text-xl mb-2">Measure of Impact</div>
            <div className="text-base">{measureOfImpact}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsecaseDescription;
