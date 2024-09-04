import React, { useState } from "react";
import Sectors from "../../components/Trends/Sectors";
import SubSectors from "../../components/Trends/SubSectors";
import Industries from "../../components/Trends/Industries";
import UseCasesCombined from "../../components/Trends/UsecasesCombined";

const TrendsMobile = ({
  selectedSector,
  selectedIndustry,
  selectedTechnology,
  handleSectorClick,
  handleIndustryClick,
  handleTechnologyClick,
}) => {
  const [technologyNames, setTechnologyNames] = useState([]);

  return (
    <div>
      {selectedTechnology ? (
        <UseCasesCombined
          selectedTechnology={selectedTechnology}
          selectedIndustry={selectedIndustry}
          technologyNames={technologyNames} // Pass technologyNames here
        />
      ) : selectedIndustry ? (
        <Industries
          selectedSector={selectedSector}
          selectedIndustry={selectedIndustry}
          onTechnologyClick={handleTechnologyClick}
          setTechnologyNames={setTechnologyNames} // Pass the updater function here
        />
      ) : selectedSector ? (
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
