import React from "react";
import PromptTabMobile from "./PromptTabMobile";
import Image from "next/image";

const SearchMobile = ({
  isInputEmpty,
  inputPrompt,
  setIsInputEmpty,
  setInputPrompt,
  handleToggleRightFrame,
  handleToggleLeftFrame,
  onSaveInput,
  saveQueryData,
}) => {
  return (
    <div className="flex items-center flex-col my-40 gap-20">
      <div className="flex gap-10">
        {/* EclliseRight */}
        <div>
          <Image
            src="/ecllipseright.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
        </div>

        {/* COntent */}

        <div className="font-semibold text-lg flex flex-col gap-6 items-center justify-center">
          <div>What problem you are trying to</div>
          <div>solve?</div>
        </div>

        {/* EcllipseLeft */}
        <div>
          <Image
            src="/ecllipseleft.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
        </div>
      </div>

      <div className="">
        <PromptTabMobile
          isInputEmpty={isInputEmpty}
          inputPrompt={inputPrompt}
          setInputPrompt={setInputPrompt}
          setIsInputEmpty={setIsInputEmpty}
          handleToggleRightFrame={handleToggleRightFrame}
          handleToggleLeftFrame={handleToggleLeftFrame}
          onSaveInput={onSaveInput}
          saveQueryData={saveQueryData}
        />
      </div>
    </div>
  );
};

export default SearchMobile;
