"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const UsecaseDescription = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extracting data from query parameters
  const useCaseTitle = searchParams.get("useCaseTitle");
  const description = searchParams.get("description");
  const startups = JSON.parse(searchParams.get("startups") || "[]");
  const enhancement = searchParams.get("enhancement");
  const measureOfImpact = searchParams.get("measureOfImpact");

  const handleExploreEcosystem = () => {
    // Construct the query string manually
    const query = new URLSearchParams({
      useCaseTitle,
      description,
      startups: JSON.stringify(startups),
      enhancement,
      measureOfImpact,
    }).toString();

    // Use router.push with the constructed URL
    router.push(`/ecosystem?${query}`);
  };

  return (
    <div>
      <div className="flex flex-col bg-yellow-300 px-4 justify-center items-center text-center gap-8 py-8">
        <div className="font-semibold text-white text-3xl">
          {useCaseTitle || "No Use Case Title Available"}
        </div>
        <div
          className="text-54 text-lg font-medium bg-white mx-auto px-4 py-2 cursor-pointer rounded-md shadow-md"
          onClick={handleExploreEcosystem}
        >
          Explore Ecosystem
        </div>
      </div>

      <div className="mx-4 py-4 leading-9 text-xl">
        {description && (
          <div>
            <div className="font-semibold text-xl mb-2">Description</div>
            <div className="text-base">{description}</div>
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
