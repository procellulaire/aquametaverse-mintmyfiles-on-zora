import React, { useContext, useEffect } from "react";
import Stepper from "react-stepper-horizontal/lib/Stepper";
import { StepContext } from "../../context/StepContext";
import MintMetadata from "./MintMetadata";
import UploadFile from "./UploadFile";

export default function Minter() {
  const { step } = useContext(StepContext);
  useEffect(() => {
    console.log("step",step)
  }, [])
  
  const RenderCurrentStep = () => {
    switch (step) {
      case 0:
        return <UploadFile />;
      case 1:
        return <MintMetadata />;
      case 2:
        return <UploadFile />;
      case 3:
        return <UploadFile />;

      default:
        return <UploadFile />;
    }
  };
  return (
    <div>
      <Stepper
        steps={[
          { title: "Upload File to IPFS" },
          { title: "Upload Metadata" },
          { title: "Mint NFT" },
          { title: "Get Ready for sale" },
        ]}
        activeStep={step}
      />
     <RenderCurrentStep/>
    </div>
  );
}
