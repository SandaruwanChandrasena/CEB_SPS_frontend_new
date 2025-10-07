import { useState } from "react";
import { useHistory } from "react-router-dom";
import ApplicantContact from "components/Tabs/ApplicantContact";
import ApplicantInfo from "components/Tabs/ApplicantInfo";
import { fetchApplicantById, saveApplicant, updateApplicant } from "api/applicants";

const nicRegex = /^(\d{9}[Vv]|\d{12})$/;

const Applicant = ({ onFormSubmit, isModify = false, appData, setAppData }) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [idLocked, setIdLocked] = useState(false); // 🔒 lock ID after search

  const [formData, setFormData] = useState({
    applicantInfo: {},
    applicantContact: {},
  });

  const handleInputChange = (section, patch) => {
    if (idLocked && Object.prototype.hasOwnProperty.call(patch, "idNo")) {
      // Ignore idNo changes if locked
      const { idNo, ...rest } = patch;
      patch = rest;
    }
    if (Object.keys(patch).length === 0) return;

    setFormData((prev) => ({ ...prev, [section]: { ...prev[section], ...patch } }));
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
      setIdLocked(false);
      return;
    }

    const dto = resp.data || {};
    setAppData?.(dto);

    setFormData({
      applicantInfo: {
        idType: dto.idType,
        idNo: dto.idNo,
        firstName: dto.firstName,
        lastName: dto.lastName,
        fullName: dto.fullName,
        personalCorporate: dto.personalCorporate,
        cebEmployee: dto.cebEmployee,
        preferredLanguage: dto.preferredLanguage,
      },
      applicantContact: {
        mobileNo: dto.mobileNo,
        email: dto.email,
        telephoneNo: dto.telephoneNo,
        streetAddress: dto.streetAddress,
        suburb: dto.suburb,
        city: dto.city,
        postalCode: dto.postalCode,
      },
    });

    setIdLocked(true); // 🔒 lock ID permanently after search
  };

  const handleSubmit = async () => {
    try {
      if (isModify) {
        await updateApplicant(appData.idNo, appData);
      } else {
        await saveApplicant(appData);
      }

      // ✅ Refresh form content after save/update
      const resp = await fetchApplicantById(appData.idNo);
      if (resp.ok) {
        setAppData(resp.data);
        setFormData({
          applicantInfo: {
            idType: resp.data.idType,
            idNo: resp.data.idNo,
            firstName: resp.data.firstName,
            lastName: resp.data.lastName,
            fullName: resp.data.fullName,
            personalCorporate: resp.data.personalCorporate,
            cebEmployee: resp.data.cebEmployee,
            preferredLanguage: resp.data.preferredLanguage,
          },
          applicantContact: {
            mobileNo: resp.data.mobileNo,
            email: resp.data.email,
            telephoneNo: resp.data.telephoneNo,
            streetAddress: resp.data.streetAddress,
            suburb: resp.data.suburb,
            city: resp.data.city,
            postalCode: resp.data.postalCode,
          },
        });
      }

      alert("Saved successfully!");
    } catch (err) {
      alert("Error while saving: " + (err.message || "Unknown"));
    }
  };

  const handleNext = () => currentIndex < 1 && setCurrentIndex((i) => i + 1);
  const handlePrevious = () => currentIndex > 0 && setCurrentIndex((i) => i - 1);
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
          idLocked={idLocked}
        />
      ),
    },
    {
      id: "contact",
      component: (
        <ApplicantContact
          appData={appData}
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
        {["Applicant Information", "Applicant Contact Details"].map((label, index) => (
          <div key={label} className="flex flex-col items-center justify-between px-12">
            <span
              className={
                "flex flex-col items-center justify-center w-10 h-10 text-lg font-medium rounded-full border-2 mb-2"
              }
              style={{
                backgroundColor:
                  index < currentIndex ? "#34d399" : index === currentIndex ? "#ffd800" : "transparent",
                borderColor:
                  index < currentIndex ? "#34d399" : index === currentIndex ? "#ffd800" : "#d1d5db",
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
            {/* <div className="ml-2">
              {!isModify && (
                <button
                  onClick={handleUpdateClick}
                  className="px-6 py-2 mt-2 mb-2 mr-2 text-sm text-white rounded shadow outline-none"
                  style={{ backgroundColor: "#7c0000" }}
                >
                  Edit
                </button>
              )}
            </div> */}

            <div className="flex items-center justify-end mb-2 ml-2 mr-4">
              {currentIndex > 0 ? (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-2 mt-2 mr-2 text-sm text-white rounded shadow outline-none"
                  style={{ backgroundColor: "#7c0000" }}
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

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
