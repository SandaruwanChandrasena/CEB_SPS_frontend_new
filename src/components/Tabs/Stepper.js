import React from "react";

const Stepper = ({ tabs, currentIndex }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-center items-center">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex flex-col items-center">
            {/* Step Number */}
            <span
              className={`flex items-center justify-center w-10 h-10 text-lg font-medium rounded-full border-2 mb-2 ${
                currentIndex === index
                  ? "bg-lightBlue-500 text-white border-black"
                  : "bg-gray-200 text-gray-700 border-gray-400"
              }`}
            >
              {index + 1}
            </span>
            {/* Step Labels */}
            {index === 0 && <span className="text-sm text-gray-700">Applicant Information</span>}
            {index === 1 && <span className="text-sm text-gray-700">Applicant Contact Details</span>}
            {/* Dashed Connecting Line */}
            {index < tabs.length - 1 && (
              <div className="w-16 border-t-2 border-lightBlue-500 border-dashed mx-4"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
