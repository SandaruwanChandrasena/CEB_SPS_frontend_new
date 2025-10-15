import AppDetails from "components/Tabs/AppDetail";
import LocationalDetails from "components/Tabs/LocationalDetail";
import PersonalDetails from "components/Tabs/PersonalDetail";
import TechDetails from "components/Tabs/TechDetails";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";

import {
  mapApplicantToPersonal,
  mapApplicantToLocational,
  mapApplicantToApplication,
  mapApplicantToTech,
} from "utils/applicantMappers";

// Wizard tabs (unchanged order / labels)
const tabs = [
  { id: "personal", label: "Personal Details", component: <PersonalDetails /> },
  { id: "application", label: "Application Details", component: <AppDetails /> },
  { id: "locational", label: "Service Location Details", component: <LocationalDetails /> },
  { id: "technical", label: "Technical Details", component: <TechDetails /> },
];

const NewApplication = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    appDetails: {},
    personalDetails: {},
    locationalDetails: {},
    techDetails: {},
  });

  // Base API ("/SPS" – your nginx/WildFly context). Remove trailing slash if any.
  const API_BASE = (process.env.REACT_APP_API_BASE_URL || "/SPS").replace(/\/+$/, "");

  // keep per-tab state merged
  const handleInputChange = (section, data) => {
    setFormData((prev) => ({ ...prev, [section]: { ...prev[section], ...data } }));
  };

  // hydrate all tabs when a valid Applicant is found on Personal tab
  const hydrateFromApplicant = (applicantDto) => {
    setFormData((prev) => ({
      ...prev,
      personalDetails:   { ...(prev.personalDetails || {}),   ...mapApplicantToPersonal(applicantDto) },
      locationalDetails: { ...(prev.locationalDetails || {}), ...mapApplicantToLocational(applicantDto) },
      appDetails:        { ...(prev.appDetails || {}),        ...mapApplicantToApplication(applicantDto) },
      techDetails:       { ...(prev.techDetails || {}),       ...mapApplicantToTech(applicantDto) },
    }));
  };

  // POST to backend
  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    try {
      const p = formData.personalDetails || {};
      const a = formData.appDetails || {};

      // Map UI → backend DTO (only Application table fields we agreed to save)
      const payload = {
        applicationId: (a.applicationId || "").trim(),
        deptId: (a.deptId || "").trim(),
        applicationType: a.applicationType || "BS",
        submitDate: a.submitDate
          ? `${a.submitDate}T00:00:00` // yyyy-MM-dd -> ISO local
          : new Date().toISOString().slice(0, 19),
        idNo: (p.idNo || "").trim(),
        preparedBy: a.preparedBy || "WEB",
        status: a.status || "N",
        description: a.description || "",
        // Optional extras (your table has columns for these)
        durationType: a.durationType || "",
        duration: a.duration ? Number(a.duration) : null,
        isLoanApp: a.isLoanApp || "N",
      };

      // quick client-side validation
      const required = {
        applicationId: "Temporary ID",
        deptId: "CostCenter",
        applicationType: "Application Type",
        submitDate: "Date",
        idNo: "Applicant ID No (from Personal tab)",
      };
      for (const key of Object.keys(required)) {
        if (!payload[key]) {
          alert(`Please fill: ${required[key]}`);
          return;
        }
      }

      const res = await fetch(`${API_BASE}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // If you need Basic auth, add it here:
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization:
        //     "Basic " +
        //     btoa(`${process.env.REACT_APP_API_BASIC_USER}:${process.env.REACT_APP_API_BASIC_PASS}`),
        // },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Save failed:", errText);
        alert(`❌ Save failed:\n${errText}`);
        return;
      }

      const saved = await res.json();
      console.log("✅ Saved application:", saved);
      alert("✅ Application saved successfully!");

      // (optional) reset just description/duration fields; keep IDs
      setFormData((prev) => ({
        ...prev,
        appDetails: {
          ...prev.appDetails,
          description: "",
          duration: "",
          durationType: "",
          isLoanApp: "N",
        },
      }));
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting application: " + err.message);
    }
  };

  const handleNext = (e) => {
    e?.preventDefault?.();
    if (currentIndex < tabs.length - 1) setCurrentIndex((i) => i + 1);
  };
  const handlePrevious = (e) => {
    e?.preventDefault?.();
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
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
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gray-300 z-0" />
              )}
              <div
                className="flex items-center justify-center w-10 h-10 transition-all border-2 rounded-full"
                style={{
                  backgroundColor: isDone ? "#34d399" : isActive ? "#ffd800" : "transparent",
                  borderColor: isDone ? "#34d399" : isActive ? "#ffd800" : "#d1d5db",
                  color: isDone || isActive ? "white" : "black",
                }}
              >
                {isDone ? <CheckCircle size={20} /> : <span className="font-bold">{index + 1}</span>}
              </div>
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
            onApplicantFound={hydrateFromApplicant}
            data={formData.personalDetails}
          />
        )}

        {tabs[currentIndex].id === "application" && (
          <AppDetails
            onInputChange={(data) => handleInputChange("appDetails", data)}
            data={formData.appDetails}
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
            data={formData.techDetails}
          />
        )}
      </div>

      {/* Nav */}
      <div className="flex justify-end px-12 ml-2">
        <div className="flex items-center justify-end mt-2 mb-4 mr-1">
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              style={{ backgroundColor: "#7c0000" }}
              className="px-6 py-2 mr-1 text-sm text-white rounded shadow outline-none hover:shadow-md"
            >
              Previous
            </button>
          )}

          {currentIndex < tabs.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              style={{ backgroundColor: "#7c0000" }}
              className="px-6 py-2 mr-1 text-sm text-white rounded shadow outline-none hover:shadow-md"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 mr-1 text-sm text-white rounded shadow outline-none bg-emerald-400 hover:shadow-md"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewApplication;
