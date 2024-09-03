"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { CiGlobe } from "react-icons/ci";
import { TbLocation } from "react-icons/tb";

export const Ecosystem = () => {
  const searchParams = useSearchParams();
  const useCaseTitle = searchParams.get("usecase");
  const description = searchParams.get("usecaseDescription");
  const startups = JSON.parse(searchParams.get("startups") || "[]");

  return (
    <div className="flex flex-col">
      <div className="bg-[#005585] p-4 fixed w-full z-50">
        <div className="text-lg font-semibold text-white">
          {useCaseTitle || "Ecosystem Overview"}
        </div>
        <div className="text-base mt-4 text-white">
          {description ||
            "Learn about the startups and technologies revolutionizing the industry."}
        </div>
      </div>

      <div className="mx-3 flex flex-col gap-8 pt-48 pb-8">
        {startups && startups.length > 0 ? (
          startups.map((startup, index) => (
            <div key={index} className="shadow-md border-2 rounded-md px-3 py-4">
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
  );
};

export default Ecosystem;
