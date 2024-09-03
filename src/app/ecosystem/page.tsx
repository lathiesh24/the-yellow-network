"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CiGlobe } from "react-icons/ci";
import { TbLocation } from "react-icons/tb";
import { FaAngleLeft } from "react-icons/fa";
import Image from "next/image";

export const Ecosystem = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const useCaseTitle = searchParams.get("usecase");
  const description = searchParams.get("usecaseDescription");
  const startups = JSON.parse(searchParams.get("startups") || "[]");

  const handleGoBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <>
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
      <div className="flex flex-col gap-4">
        <div className="bg-[#005585] p-4 w-full z-50 mt-16">
          {" "}
          {/* Adjusted for navbar height */}
          <div className="text-lg font-semibold text-white">
            {useCaseTitle || "Ecosystem Overview"}
          </div>
          <div className="text-base mt-4 text-white">
            {description ||
              "Learn about the startups and technologies revolutionizing the industry."}
          </div>
        </div>

        <div className="mx-3 flex flex-col gap-8">
          {startups && startups.length > 0 ? (
            startups.map((startup, index) => (
              <div
                key={index}
                className="shadow-md border-2 rounded-md px-3 py-4"
              >
                <div className="font-bold">{startup.name}</div>{" "}
                {/* Correctly display the startup name */}
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm">
                    {/* Display the startup description */}
                    {startup.description}
                  </div>
                  <div className="relative -mt-7 flex justify-center">
                    {/* Placeholder image */}
                    <img src="/placeholder-image.png" alt="placeholder" />
                  </div>
                </div>
                <div className="flex justify-between mt-3">
                  <button className="inline-flex items-center text-[#0081CA] py-1 px-2 rounded border border-[#0081CA]">
                    Explore <CiGlobe className="ml-2" />
                  </button>

                  <button className="bg-[#0081CA] text-white py-1 px-2 rounded inline-flex items-center">
                    Connect <TbLocation className="ml-2" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No startups found for this use case.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Ecosystem;
