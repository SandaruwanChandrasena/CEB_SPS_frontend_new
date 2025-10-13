import AppDetails from "components/Tabs/AppDetail";
import LocationalDetails from "components/Tabs/LocationalDetail";
import PersonalDetails from "components/Tabs/PersonalDetail";
import TechDetails from "components/Tabs/TechDetails";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";

// Order: 1) Personal, 2) Application, 3) Service Location, 4) Technical
const tabs = [
  { id: "personal",    label: "Personal Details",         component: <PersonalDetails /> },
  { id: "application", label: "Application Details",      component: <AppDetails /> },
  { id: "locational",  label: "Service Location Details", component: <LocationalDetails /> },
  { id: "technical",   label: "Technical Details",        component: <TechDetails /> },
];

const NewApplication = ({
  onFormSubmit,
  isModify,
  formData,
  setFormData,
  handleSearch,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();

  const handleNext = () => {
    if (currentIndex < tabs.length - 1) setCurrentIndex((prev) => prev + 1);
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

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
      {/* Stepper */}
      <div className="relative flex items-center justify-between mt-4 mb-2">
        {tabs.map((tab, index) => {
          const isDone = index < currentIndex;
          const isActive = index === currentIndex;
          return (
            <div
              key={tab.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-1 flex flex-col items-center cursor-pointer relative ${
                isActive || isDone ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {index > 0 && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gray-300 z-0"></div>
              )}
              <div
                className="flex items-center justify-center w-10 h-10 transition-all border-2 rounded-full"
                style={{
                  backgroundColor: isDone ? "#34d399" : isActive ? "#ffd800" : "transparent",
                  borderColor:     isDone ? "#34d399" : isActive ? "#ffd800" : "#d1d5db",
                  color:           isDone || isActive ? "white" : "black",
                }}
              >
                {isDone ? <CheckCircle size={20} /> : <span className="font-bold">{index + 1}</span>}
              </div>
              {index < tabs.length - 1 && (
                <div className={`h-2 ml-0 flex-1 ${isDone ? "bg-lightBlue-500" : "bg-gray-300"}`}></div>
              )}
              <span className="mt-2 text-sm">{tab.label}</span>
            </div>
          );
        })}
      </div>

      {/* Title */}
      <div className="flex justify-center mb-2 text-center">
        <h6 className="text-xl font-bold text-blueGray-700">
          {tabs[currentIndex].label}
        </h6>
      </div>

      {/* Content */}
      <div className="p-6 rounded-lg bg-blueGray-50">
        {tabs[currentIndex].id === "personal" && (
          <PersonalDetails
            onInputChange={(data) => handleInputChange("personalDetails", data)}
            data={formData.personalDetails}
          />
        )}

        {tabs[currentIndex].id === "application" && (
          <AppDetails
            onInputChange={(data) => handleInputChange("appDetails", data)}
            isModify={isModify}
            data={formData.appDetails}
            handleSearch={handleSearch}
          />
        )}

        {tabs[currentIndex].id === "locational" && (
          <LocationalDetails
            onInputChange={(data) => handleInputChange("locationalDetails", data)}
            data={formData.locationalDetails}
          />
        )}

        {tabs[currentIndex].id === "technical" && (
          <TechDetails
            onInputChange={(data) => handleInputChange("techDetails", data)}
            // data={formData.TechDetails}
          />
        )}
      </div>

      {/* Nav buttons only */}
      <div className="flex justify-end px-12 ml-2">
        <div className="flex items-center justify-end mt-2 mb-4 mr-1">
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              style={{ backgroundColor: "#7c0000" }}
              className="px-6 py-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
            >
              Previous
            </button>
          )}

          {currentIndex < tabs.length - 1 ? (
            <button
              onClick={handleNext}
              style={{ backgroundColor: "#7c0000" }}
              className="px-6 py-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 active:bg-emerald-600 hover:shadow-md focus:outline-none"
            >
              {isModify ? "Update" : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewApplication;
