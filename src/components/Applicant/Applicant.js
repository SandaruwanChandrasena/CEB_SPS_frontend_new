// import { useState } from "react";

// import ApplicantContact from "components/Tabs/ApplicantContact";
// import ApplicantInfo from "components/Tabs/ApplicantInfo";

// const Applicant = () => {
//   const [step, setStep] = useState(1);

//   const nextStep = () => setStep(2);
//   const prevStep = () => setStep(1);
//   const handleSubmit = () => {
//     alert("Form submitted successfully!"); // Replace this with actual form submission logic
//   };

//   return (
//     <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-100">
//       {/* Top Bar */}
//       <div className="px-6 py-6 mb-0 bg-white rounded-t">
//         <div className="flex justify-between text-center">
//           {/* Dynamic Title */}
//           <h6 className="text-xl font-bold text-blueGray-700">
//             {step === 1 ? "Applicant Information" : "Applicant Contact Details"}
//           </h6>

//           {/* Navigation Buttons */}
//           <div>
//             {step > 1 && (
//               <button
//                 onClick={prevStep}
//                 className="px-4 py-2 text-white rounded bg-lightBlue-500 "
//               >
//                 Previous
//               </button>
//             )}
//             {step < 2 ? (
//               <button
//                 onClick={nextStep}
//                 className="px-4 py-2 text-white rounded bg-lightBlue-500 "
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 ml-2 text-white rounded bg-lightBlue-500"
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-6">
//         {step === 1 ? (
//           <div className="relative flex flex-col w-full min-w-0 break-words border-0 rounded-lg shadow-lg bg-blueGray-100">
//             <ApplicantInfo />
//           </div>
//         ) : (
//           <div className="relative flex flex-col w-full min-w-0 break-words border-0 rounded-lg shadow-lg bg-blueGray-100">
//             <ApplicantContact />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Applicant;

import { useState } from "react";
import ApplicantContact from "components/Tabs/ApplicantContact";
import ApplicantInfo from "components/Tabs/ApplicantInfo";
// import { data } from "autoprefixer";
import { useHistory } from "react-router-dom";
//import badgeColors from "@material-tailwind/react/theme/components/badge/badgeColors";
// For named export
//import { ApplicantInfo } from "components/Tabs/ApplicantInfo";

const Applicant = ({
  onFormSubmit,
  handleSearch,
  isModify,
  appData,
  setAppData,
}) => {
  const history = useHistory();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [formData, setFormData] = useState({
    applicantInfo: {},
    applicantContact: {},
  });

  const tabs = [
    {
      id: "info",
      // label: "Applicant Information",
      component: (
        <ApplicantInfo
          onInputChange={(data) => handleInputChange("applicantInfo", data)}
          isModify={isModify}
          data={formData.applicantInfo}
          handleSearch={handleSearch}
          appData={appData}
          setAppData={setAppData}
        />
      ),
    },
    {
      id: "contact",
      // label: "Applicant Contact Details",
      component: (
        <ApplicantContact
          onInputChange={(data) => handleInputChange("applicantContact", data)}
          data={formData.applicantContact}
        />
      ),
    },
  ];

  const handleNext = () => {
    if (currentIndex < tabs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleInputChange = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...data },
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    onFormSubmit(formData);
  };

  const handleUpdateClick = () => {
    history.push("/applicant/modifyapplicant"); // Navigate to /application/modify
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg">
      {/* Stepper */}
      <div className="flex items-center justify-center mt-4">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex flex-col items-center justify-between px-12">
            {/* Step Number */}
            <div>
            <span
              className={"flex flex-col items-center justify-center w-10 h-10 text-lg font-medium rounded-full border-2 mb-2"}
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
              {index + 1}
            </span>
            </div>
            {/* Step Labels */}
            <div>
            {index === 0 && (
              <span className="ml-2 text-sm text-gray-700 ">
                Applicant Information
              </span>
            )}
            {index === 1 && (
              <span className="ml-2 text-sm text-gray-700">
                Applicant Contact Details
              </span>
            )}
            </div>

            {/* Dashed Connecting Line */}
            {/* {index < tabs.length - 1 && (
              <div className="w-16 mx-4 border-t-2 border-dashed border-lightBlue-500"></div>
            )} */}
          </div>
        ))}
      </div>

      {/* <div className="flex justify-between px-12 ml-2">
          <h3 className="block mb-3 font-bold text-blueGray-600 text-m "> */}
      {/* {currentIndex === 0 ? "Applicant Information" : "Applicant Contact Details"} */}
      {/* </h3> */}
      {/* {!isModify && (
          <button
          // /applicant/modifyapplicant
          onClick={handleUpdateClick}
            className="px-6 py-2 mt-2 mb-2 mr-2 text-sm font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 active:bg-emerald-600 hover:shadow-md focus:outline-none"
            style={{
              backgroundColor: "#7c0000",
            }}
          >
            Edit
          </button>
          )} */}
      {/* </div> */}

      <div className="flex justify-center mt-2 mb-2 text-center">
        {currentIndex === 0 && (
          <span className="ml-2 text-sm font-bold text-gray-700">
            Applicant Information
          </span>
        )}
        {currentIndex === 1 && (
          <span className="ml-2 text-sm font-bold text-gray-700">
            Applicant Contact Details
          </span>
        )}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <div className="relative flex flex-col w-full min-w-0 break-words border-0 rounded-b-lg shadow-lg bg-blueGray-100">
          {/* now edited */}

          {/* now edited end */}
          {tabs[currentIndex].id === "info" && (
            <ApplicantInfo
              handleSearch={handleSearch}
              onInputChange={(data) => handleInputChange("applicantInfo", data)}
              applicant={appData || { idNo: "" }}
              appData={appData}
              isModify={isModify}
              setAppData={setAppData}
            />
          )}
          {tabs[currentIndex].id === "contact" && (
            <ApplicantContact
              onInputChange={(data) =>
                handleInputChange("applicantContact", data)
              }
            />
          )}

          {/* Navigation Buttons and bottom white bar */}
          <div className="flex justify-between px-12 mb-0 bg-white rounded-t">
            <div className="ml-2">
              {!isModify && (
                <button
                  // /applicant/modifyapplicant
                  onClick={handleUpdateClick}
                  className="px-6 py-2 mt-2 mb-2 mr-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                  style={{
                    backgroundColor: "#7c0000",
                  }}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="flex items-center justify-end mb-2 ml-2 mr-4">
              {/* Left-aligned "Previous" button */}
              {currentIndex > 0 ? (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-2 mt-2 mr-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 hover:shadow-md focus:outline-none"
                  style={{
                    backgroundColor: "#7c0000",
                  }}
                >
                  Previous
                </button>
              ) : (
                <div></div> // Empty div to maintain spacing when Previous button is hidden
              )}

              {/* Right-aligned "Next" or "Submit" button */}
              {currentIndex < tabs.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 mt-2 mb-2 ml-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                  style={{
                    backgroundColor: "#7c0000",
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 mt-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 bg-green hover:shadow-md focus:outline-none"
                  // style={{
                  //   backgroundColor: "#620000",
                  // }}
                >
                  {isModify ? "Update" : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicant;
