import { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";

export const Loader = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Searching national databases...",
    "Verifying service records...",
    "Analyzing for potential inconsistencies...",
    "Compiling your report...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center transition-all duration-75">
      <div className="">
        <div className=" text-center  flex items-center justify-center py-7">
 
          <Triangle
            visible={true}
            height="60"
            width="80"
            color="#FB8C00"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>

        <p className="text-md font-medium text-gray-700 animate-pulse transition-all duration-100">
          {steps[currentStep]}
        </p>
      </div>
    </div>
  );
};
