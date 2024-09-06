  import React, { useState } from "react";
  import UsecasesArc from "./UsecasesArc";
  import Usecases from "./Usecases";
  import UsecaseDescription from "./UsecaseDescription";
  import Ecosystem from "./Ecosystem";

  const CombinedComponent = ({
    selectedIndustry,
    selectedTechnology,
    technologyNames,
  }) => {
    const [selectedUseCase, setSelectedUseCase] = useState(null); // Track the selected use case
    const [view, setView] = useState("usecases"); // Track which view is currently active
    const [ecosystemData, setEcosystemData] = useState(null); // Hold the startups data

    
    // Handler for when a use case is selected
    const handleUsecaseClick = (usecase) => {
      setSelectedUseCase(usecase);
      setView("usecaseDescription"); // Switch to UsecaseDescription view
    };

    // Handler for the Explore Ecosystem button
  const handleEcosystem = ({ usecase, usecaseDescription, startups }) => {
    // Store all the data (usecase, usecaseDescription, startups) to be passed to the Ecosystem component
    setEcosystemData({
      usecase,
      usecaseDescription,
      startups
    });
    setView("ecosystem"); // Move to Ecosystem view
  };
    // Handler to go back to use cases list
    const handleBackToUsecases = () => {
      setSelectedUseCase(null); // Reset the selected use case to go back
      setView("usecases"); // Switch back to Usecases view
    };

    // If we are in the Ecosystem view, render the Ecosystem component
    if (view === "ecosystem") {
      return (
        <Ecosystem
          usecase={ecosystemData.usecase}
          usecaseDescription={ecosystemData.usecaseDescription}
          startups={ecosystemData.startups}
        />
      );
    }

    // If we have a selected use case, render the UsecaseDescription component
    if (view === "usecaseDescription") {
      return (
        <UsecaseDescription
          usecase={selectedUseCase.usecase}
          usecaseDescription={selectedUseCase.usecaseDescription}
          enhancement={selectedUseCase.Enhancement || ""}
          measureOfImpact={selectedUseCase["Measure of Impact"] || ""}
          startups={selectedUseCase.startups} // Pass startups data to UsecaseDescription
          onComplete={handleBackToUsecases} // To go back to use cases list
          handleEcosystem={handleEcosystem} // Handle the ecosystem button click
        />
      );
    }

    console.log("ecosystemData", ecosystemData)
    // Default view showing the UsecasesArc and Usecases components
    return (
      <div className="flex flex-col justify-between h-screen">
        {/* UsecasesArc at the top */}
        <div className="flex-grow-0">
          <UsecasesArc
            selectedIndustry={selectedIndustry}
            selectedTechnology={selectedTechnology}
            OriginalTechnologyNames={technologyNames}
          />
        </div>

        {/* Usecases component at the bottom */}
        <div className="flex-grow-0 pb-16">
          <Usecases
            selectedIndustry={selectedIndustry}
            selectedTechnology={selectedTechnology}
            onUsecaseClick={handleUsecaseClick} // Pass handler to receive selected use case
          />
        </div>
      </div>
    );
  };

  export default CombinedComponent;
