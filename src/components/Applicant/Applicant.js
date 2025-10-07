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
// src/components/Applicant/Applicant.js
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ApplicantContact from "components/Tabs/ApplicantContact";
import ApplicantInfo from "components/Tabs/ApplicantInfo";
import { fetchApplicantById } from "api/applicants";

const nicRegex = /^(\d{9}[Vv]|\d{12})$/;

const Applicant = ({ onFormSubmit, isModify = false, appData, setAppData }) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Search UI state
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Optional split form data (we’ll also keep a single top-level appData as the source of truth)
  const [formData, setFormData] = useState({
    applicantInfo: {},
    applicantContact: {},
  });

  const handleInputChange = (section, patch) => {
    // keep per-tab local
    setFormData((prev) => ({ ...prev, [section]: { ...prev[section], ...patch } }));
    // keep top-level single object in sync (source of truth used by both tabs)
    setAppData?.((prev) => ({ ...(prev || {}), ...patch }));
  };

  const handleSearch = async () => {
    setSearchError("");
    const idNo = (appData?.idNo || "").trim();

    if (!idNo) return setSearchError("Please enter an ID number.");
    if (!nicRegex.test(idNo))
      return setSearchError("Invalid NIC format. Use 9 digits with V/v or 12 digits.");

    setSearching(true);
    const resp = await fetchApplicantById(idNo);
    setSearching(false);

    if (!resp.ok) {
      setSearchError(resp.message || "Search failed.");
      return;
    }

    const dto = resp.data || {};

    // 1) Put entire DTO in top-level shared state so both tabs render immediately
    setAppData?.(dto);

    // 2) (Optional) Also split into tab buckets for any tab-specific logic
    const infoPatch = {
      idType: dto.idType,
      idNo: dto.idNo,
      firstName: dto.firstName,
      lastName: dto.lastName,
      fullName: dto.fullName,
      personalCorporate: dto.personalCorporate,
      cebEmployee: dto.cebEmployee,
      preferredLanguage: dto.preferredLanguage,
    };

    const contactPatch = {
      mobileNo: dto.mobileNo,
      email: dto.email,
      telephoneNo: dto.telephoneNo,
      streetAddress: dto.streetAddress,
      suburb: dto.suburb,
      city: dto.city,
      postalCode: dto.postalCode,
    };

    setFormData((prev) => ({
      ...prev,
      applicantInfo: { ...(prev.applicantInfo || {}), ...infoPatch },
      applicantContact: { ...(prev.applicantContact || {}), ...contactPatch },
    }));
  };

  const handleNext = () => currentIndex < 1 && setCurrentIndex((i) => i + 1);
  const handlePrevious = () => currentIndex > 0 && setCurrentIndex((i) => i - 1);

  const handleSubmit = () => onFormSubmit?.(formData);
  const handleUpdateClick = () => history.push("/applicant/modifyapplicant");

  const tabs = [
    {
      id: "info",
      component: (
        <ApplicantInfo
          onInputChange={(data) => handleInputChange("applicantInfo", data)}
          isModify={isModify}
          data={formData.applicantInfo}
          handleSearch={handleSearch}
          appData={appData}
          setAppData={setAppData}
          loading={searching}
          searchError={searchError}
        />
      ),
    },
    {
      id: "contact",
      component: (
        <ApplicantContact
          appData={appData} // IMPORTANT: render from the same source of truth as info tab
          setAppData={setAppData}
          onInputChange={(data) => handleInputChange("applicantContact", data)}
        />
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg">
      {/* Stepper */}
      <div className="flex items-center justify-center mt-4">
        {["Applicant Information","Applicant Contact Details"].map((label, index) => (
          <div key={label} className="flex flex-col items-center justify-between px-12">
            <span
              className={"flex flex-col items-center justify-center w-10 h-10 text-lg font-medium rounded-full border-2 mb-2"}
              style={{
                backgroundColor: index < currentIndex ? "#34d399" : index === currentIndex ? "#ffd800" : "transparent",
                borderColor: index < currentIndex ? "#34d399" : index === currentIndex ? "#ffd800" : "#d1d5db",
                color: index <= currentIndex ? "white" : "black",
              }}
            >
              {index + 1}
            </span>
            <span className="ml-2 text-sm text-gray-700">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-2 mb-2 text-center">
        <span className="ml-2 text-xl font-bold text-gray-700">
          {currentIndex === 0 ? "Applicant Information" : "Applicant Contact Details"}
        </span>
      </div>

      <div className="p-6">
        <div className="relative flex flex-col w-full min-w-0 break-words border-1 border-gray-200 rounded-b-lg shadow-lg bg-blueGray-50">
          {tabs[currentIndex].component}

          {/* Footer buttons */}
          <div className="flex justify-between px-12 mb-0 bg-white rounded-t">
            <div className="ml-2">
              {!isModify && (
                <button
                  onClick={handleUpdateClick}
                  className="px-6 py-2 mt-2 mb-2 mr-2 text-sm text-white rounded shadow outline-none"
                  style={{ backgroundColor: "#7c0000" }}
                >
                  Edit
                </button>
              )}
            </div>

            <div className="flex items-center justify-end mb-2 ml-2 mr-4">
              {currentIndex > 0 ? (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-2 mt-2 mr-2 text-sm text-white rounded shadow outline-none"
                  style={{ backgroundColor: "#7c0000" }}
                >
                  Previous
                </button>
              ) : <div />}

              {currentIndex < 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 mt-2 mb-2 ml-2 text-sm text-white rounded shadow outline-none"
                  style={{ backgroundColor: "#7c0000" }}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 mt-2 text-sm text-white rounded shadow outline-none"
                  style={{ backgroundColor: "#7c0000" }}
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
