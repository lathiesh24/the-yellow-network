import React, { useState } from "react";
import Sectors from "../../components/Trends/Sectors";
import SubSectors from "../../components/Trends/SubSectors";
import Industries from "../../components/Trends/Industries";
import CombinedComponent from "../../components/Trends/UsecasesCombined"; // Import CombinedComponent
import Ecosystem from "../../components/Trends/Ecosystem";

const TrendsMobile = ({
  selectedSector,
  selectedIndustry,
  selectedTechnology,
  handleSectorClick,
  handleIndustryClick,
  handleTechnologyClick,
  currentStep,
  setCurrentStep,
}) => {
  const [technologyNames, setTechnologyNames] = useState([]);
  const [ecosystemData, setEcosystemData] = useState([]); // Store startups for Ecosystem

  const handleEcosystem = (startups) => {
    setEcosystemData(startups); 
    setCurrentStep("ecosystem"); 
  };

  const handleBackToUsecases = () => {
    setCurrentStep("usecases");
  };

  return (
    <div>
      {currentStep === "ecosystem" ? (
        // Render Ecosystem view when currentStep is 'ecosystem'
        <Ecosystem startups={ecosystemData} />
      ) : currentStep === "usecasesCombined" ? (
        // Render CombinedComponent when currentStep is 'usecases'
        <CombinedComponent
          selectedIndustry={selectedIndustry}
          selectedTechnology={selectedTechnology}
          technologyNames={technologyNames}
          handleEcosystem={handleEcosystem} // Pass handleEcosystem for transitioning to Ecosystem
        />
      ) : currentStep === "industries"? (
        // Render Industries if industry is selected
        <Industries
          selectedSector={selectedSector}
          selectedIndustry={selectedIndustry}
          onTechnologyClick={(technology) => {
            handleTechnologyClick(technology);
            setCurrentStep("usecases");
          }}
          setTechnologyNames={setTechnologyNames}
        />
      ) : currentStep === "subSectors" ? (
        // Render SubSectors if sector is selected
        <SubSectors
          selectedSector={selectedSector}
          onIndustryClick={handleIndustryClick}
        />
      ) : (
        <Sectors onSectorClick={handleSectorClick} />
      )}
    </div>
  );
};

export default TrendsMobile;
