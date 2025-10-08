import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import ApplicantContact from "components/Tabs/ApplicantContact";
import ApplicantInfo from "components/Tabs/ApplicantInfo";
import { fetchApplicantById, saveApplicant, updateApplicant, pingApplicants } from "api/applicants";
import { buildApplicantPayload } from "api/payloads";

const nicRegex = /^(\d{9}[Vv]|\d{12})$/;
const phoneRegex = /^\+?([1-9]{1,3})?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})(?:\s*x(\d+))?$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_FIELDS = [
  "idType",
  "idNo",
  "firstName",
  "lastName",
  "fullName",
  "personalCorporate",
  "cebEmployee",
  "preferredLanguage",
  "mobileNo",
  "email",
  "telephoneNo",
  "streetAddress",
  "suburb",
  "city",
  "postalCode",
];

const Applicant = ({ onFormSubmit, isModify = false, appData, setAppData }) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [idLocked, setIdLocked] = useState(false);

  const [formData, setFormData] = useState({
    applicantInfo: {},
    applicantContact: {},
  });

  const [errors, setErrors] = useState({});     // <-- field -> message
  const [submitError, setSubmitError] = useState(""); // top banner message

  const firstErrorRef = useRef(null);

  const handleInputChange = (section, patch) => {
    if (idLocked && Object.prototype.hasOwnProperty.call(patch, "idNo")) {
      const { idNo, ...rest } = patch;
      patch = rest;
    }
    if (!patch || Object.keys(patch).length === 0) return;

    // clear error for the edited field
    const field = Object.keys(patch)[0];
    setErrors((prev) => ({ ...prev, [field]: "" }));

    setFormData((prev) => ({ ...prev, [section]: { ...prev[section], ...patch } }));
    setAppData?.((prev) => ({ ...(prev || {}), ...patch }));
  };

  const handleSearch = async () => {
    setSearchError("");
    setSubmitError("");
    setErrors({});
    const idNo = (appData?.idNo || "").trim();

    if (!idNo) return setSearchError("Please enter an ID number.");
    if (!nicRegex.test(idNo))
      return setSearchError("Invalid NIC format. Use 9 digits with V/v or 12 digits.");

    setSearching(true);
    const ping = await pingApplicants();
    if (!ping.ok) {
      setSearching(false);
      setSearchError(`Cannot reach backend: ${ping.message}`);
      return;
    }

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

    setIdLocked(true);
  };

  const resetForm = () => {
    setAppData({});
    setFormData({ applicantInfo: {}, applicantContact: {} });
    setErrors({});
    setSubmitError("");
    setIdLocked(false);
    setCurrentIndex(0);
    setSearchError("");
  };

  // ---------- VALIDATION ----------
  const validateAll = (raw) => {
    const vals = {
      ...raw,
    };
    const e = {};

    // required checks
    REQUIRED_FIELDS.forEach((f) => {
      const v = (vals[f] ?? "").toString().trim();
      if (!v) e[f] = "This field is required.";
    });

    // format checks
    if (vals.idNo && !nicRegex.test(vals.idNo)) e.idNo = "Invalid NIC. Use 9 digits with V/v or 12 digits.";
    if (vals.mobileNo && !phoneRegex.test(vals.mobileNo)) e.mobileNo = "Invalid phone number format.";
    if (vals.email && !emailRegex.test(vals.email)) e.email = "Invalid email format.";

    return e;
  };

  const scrollToFirstError = (errs) => {
    // focus/scroll the first field that has error by switching to relevant tab
    const infoFields = new Set([
      "idType", "idNo", "firstName", "lastName", "fullName",
      "personalCorporate", "cebEmployee", "preferredLanguage"
    ]);

    const firstKey = Object.keys(errs)[0];
    if (!firstKey) return;

    // go to the tab that contains the first error
    if (infoFields.has(firstKey)) setCurrentIndex(0);
    else setCurrentIndex(1);

    // optional: store a reference if you add refs per input
    firstErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = async () => {
    setSubmitError("");
    setErrors({});

    try {
      const payload = buildApplicantPayload(appData || {});
      const errs = validateAll(payload);

      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        setSubmitError("Please fill all required fields.");
        scrollToFirstError(errs);
        return;
      }

      const result = isModify
        ? await updateApplicant(payload.idNo, payload)
        : await saveApplicant(payload);

      if (!result.ok) {
        alert(`Save failed (${result.status || "?"}): ${result.message}`);
        return;
      }

      alert("Saved successfully!");
      resetForm();
    } catch (err) {
      alert("Error while saving: " + (err.message || "Unknown"));
    }
  };

  const handleNext = () => currentIndex < 1 && setCurrentIndex((i) => i + 1);
  const handlePrevious = () => currentIndex > 0 && setCurrentIndex((i) => i - 1);

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
          errors={errors}                  // pass errors
          firstErrorRef={firstErrorRef}    // optional scroll target
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
          errors={errors}                  // pass errors
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
              className="flex flex-col items-center justify-center w-10 h-10 text-lg font-medium rounded-full border-2 mb-2"
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

      {/* Top submit error banner */}
      {submitError && (
        <div className="px-4 py-2 mt-3 text-sm text-white rounded" style={{ backgroundColor: "#b91c1c" }}>
          {submitError}
        </div>
      )}

      <div className="flex justify-center mt-2 mb-2 text-center">
        <span className="ml-2 text-xl font-bold text-gray-700">
          {currentIndex === 0 ? "Applicant Information" : "Applicant Contact Details"}
        </span>
      </div>

      <div className="p-6">
        <div className="relative flex flex-col w-full min-w-0 break-words border-1 border-gray-200 rounded-b-lg shadow-lg bg-blueGray-50">
          {tabs[currentIndex].component}

          {/* Footer buttons */}
          <div className="flex justify-end px-12 mb-0 bg-white rounded-t">
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
  );
};

export default Applicant;
