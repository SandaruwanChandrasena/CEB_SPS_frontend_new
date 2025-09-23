import JRCostMeasure from "components/Tabs/JRCostMeasure";
import JRGeneralInfo from "components/Tabs/JRGeneralInfo";
import JRPegging from "components/Tabs/JRPegging";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";

const tabs = [
  {
    id: "general",
    label: "General Information",
    component: <JRGeneralInfo />,
  },
  { id: "cost", label: "Cost & Measurement", component: <JRCostMeasure /> },
  {
    id: "pegging",
    label: "Pegging Structure",
    component: <JRPegging />,
  },
];

const JobRevision = ({
  onFormSubmit,
  isModify,
  formData,
  setFormData,
  handleSearch,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();

  // const validateCurrentTab = () => {
  //   const currentTab = tabs[currentIndex].id;
  //   const currentData = formData[currentTab];
  //   if (!currentData) return false;

  //   // Add validation logic for each tab
  //   switch (currentTab) {
  //     // case "application":
  //     //   return currentData.applicationId && currentData.description;
  //     case "personal":
  //       return currentData.fname && currentData.lname;
  //     // case "locational":
  //     //   return currentData.address && currentData.city;
  //     // case "technical":
  //       // return currentData.techField1 && currentData.techField2;
  //     default:
  //       return true;
  //   }
  // };

  const handleNext = () => {
    if (currentIndex < tabs.length - 1) setCurrentIndex((prev) => prev + 1);
    // if (validateCurrentTab()) {
    //   if (currentIndex < tabs.length - 1) setCurrentIndex((prev) => prev + 1);
    // } else {
    //   alert("Please fill all required fields before proceeding.");
    // }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleInputChange = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...data },
    }));
  };

  const handleSubmit = () => {
    onFormSubmit(formData);
  };

  const handleUpdateClick = () => {
    history.push("/jobrevision/modify");
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
      {/* Stepper */}
      <div className="flex justify-between items-center mb-2 mt-4 relative">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`flex-1 flex flex-col items-center cursor-pointer relative${
              index <= currentIndex
                ? "text-blue-600"
                : index === currentIndex
                ? "text-blue-600"
                : "text-gray-400"
            }`}
          >
            {index > 0 && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gray-300 z-0"></div>
            )}
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all "
              style={{
                backgroundColor:
                  index < currentIndex
                    ? "#34d399"
                    : index === currentIndex
                    ? "#ffd800"
                    : "transparent",
                borderColor:
                  index < currentIndex
                    ? "#34d399"
                    : index === currentIndex
                    ? "#ffd800"
                    : "#d1d5db",
                color:
                  index < currentIndex || index === currentIndex
                    ? "white"
                    : "black",
              }}
            >
              {currentIndex[index] ? (
                <CheckCircle size={20} />
              ) : (
                <span className="font-bold">{index + 1}</span>
              )}
            </div>
            {index < tabs.length - 1 && (
              <div
                className={`h-2 ml-0 flex-1 ${
                  currentIndex[index] ? "bg-lightBlue-500" : "bg-gray-300"
                }`}
              ></div>
            )}
            <span className="text-sm mt-2">{tab.label}</span>
          </div>
        ))}
      </div>
      <div className="text-center flex justify-center mb-2">
        <h6 className="text-blueGray-700 text-sm font-bold">
          {tabs[currentIndex].label}
        </h6>
      </div>
      {/* Content */}
      <div className="p-6 bg-blueGray-100 rounded-lg">
        {tabs[currentIndex].id === "general" && (
          <JRGeneralInfo
            onInputChange={(data) => handleInputChange("jrgeneral", data)}
            isModify={isModify}
            data={formData.appDetails}
            handleSearch={handleSearch}
          />
        )}
        {tabs[currentIndex].id === "cost" && (
          <JRCostMeasure
            onInputChange={(data) => handleInputChange("jrcostmeasure", data)}
            data={formData.personalDetails}
          />
        )}
        {tabs[currentIndex].id === "pegging" && (
          <JRPegging
            onInputChange={(data) =>
              handleInputChange("jrpegging", data)
            }
            data={formData.locationalDetails}
          />
        )}
      </div>

      <div className="flex justify-between px-12 ml-2">
        <div>
          {!isModify && (
            <button
              onClick={handleUpdateClick}
              style={{ backgroundColor: "#7c0000" }}
              className="text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-2"
            >
              Edit
            </button>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mr-1 flex justify-end items-center mt-2 mb-4">
          {currentIndex > 0 ? (
            <button
              onClick={handlePrevious}
              style={{ backgroundColor: "#7c0000" }}
              className="text-white active:bg-lightBlue-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Previous
            </button>
          ) : null}
          {currentIndex < tabs.length - 1 ? (
            <button
              onClick={handleNext}
              style={{ backgroundColor: "#7c0000" }}
              className="text-white active:bg-lightBlue-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-emerald-400 text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              {isModify ? "Update" : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobRevision;
