// src/views/commission/ApplicantForm.js
import React, { useState, useEffect } from "react";

const ApplicantForm = ({ estimateNo }) => {
  const [formData, setFormData] = useState({
    nicPassportBusiness: "",
    fullNameRequestedBy: "",
    firstNameCompany: "",
    lastName: "",
    streetAddress: "",
    suburb: "",
    mobileNo: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8081/SPS/api/applicants/by-estimate/${estimateNo}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.length > 0) {
          const applicant = data[0];
          setFormData({
            nicPassportBusiness: applicant.idNo,
            fullNameRequestedBy: applicant.fullName,
            firstNameCompany: applicant.firstName,
            lastName: applicant.lastName,
            streetAddress: applicant.streetAddress,
            suburb: applicant.suburb,
            mobileNo: applicant.mobileNo,
            email: applicant.email,
          });
        }
      } catch (error) {
        console.error("Error fetching applicant data:", error);
        setError("Failed to load applicant data");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantData();
  }, [estimateNo]);

  const fields = [
    {
      label: "NIC/Passport Number/Business Registration",
      name: "nicPassportBusiness",
      type: "text",
    },
    {
      label: "Full Name/Requested by",
      name: "fullNameRequestedBy",
      type: "text",
    },
    {
      label: "First Name(initials) Company Name/Requested By",
      name: "firstNameCompany",
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
    },
    {
      label: "Street Address",
      name: "streetAddress",
      type: "text",
    },
    {
      label: "Suburb",
      name: "suburb",
      type: "text",
    },
    {
      label: "Mobile No",
      name: "mobileNo",
      type: "tel",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
  ];

  if (loading) {
    return (
      <div className="form-container">
        <h3 className="form-title">Applicant Information</h3>
        <div className="loading-text">Loading applicant data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container">
        <h3 className="form-title">Applicant Information</h3>
        <div className="error-text">{error}</div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Applicant Information</h3>
      <form>
        <div className="form-grid">
          {fields.map((field) => (
            <React.Fragment key={field.name}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                readOnly
                className="form-input"
              />
            </React.Fragment>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ApplicantForm;
