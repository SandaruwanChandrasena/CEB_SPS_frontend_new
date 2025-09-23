// src/views/commission/ApplicationDetails.js
import React, { useState, useEffect } from "react";

const ApplicationDetails = ({ estimateNo }) => {
  const [formData, setFormData] = useState({
    applicationNo: "",
    applicationId: "",
    applicationType: "",
    description: "",
    demand: "",
    fundSource: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8081/SPS/api/application/by-estimate/${estimateNo}`,
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
          const application = data[0];
          setFormData({
            applicationNo: application.applicationNo || "",
            applicationId: application.id?.applicationId || "",
            applicationType: application.applicationType || "",
            description: application.description || "",
            demand: "", // Not in API response
            fundSource: "", // Not in API response
          });
        }
      } catch (error) {
        console.error("Error fetching application data:", error);
        setError("Failed to load application data");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [estimateNo]);

  const fields = [
    {
      label: "Application No",
      name: "applicationNo",
      type: "text",
    },
    {
      label: "Application Id/Temporary Id",
      name: "applicationId",
      type: "text",
    },
    {
      label: "Application Type",
      name: "applicationType",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
    {
      label: "Demand",
      name: "demand",
      type: "text",
    },
    {
      label: "Fund Source",
      name: "fundSource",
      type: "text",
    },
  ];

  if (loading) {
    return (
      <div className="form-container">
        <h3 className="form-title">Application Details</h3>
        <div className="loading-text">Loading application data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container">
        <h3 className="form-title">Application Details</h3>
        <div className="error-text">{error}</div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Application Details</h3>
      <form>
        <div className="form-grid">
          {fields.map((field) => (
            <React.Fragment key={field.name}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  readOnly
                  className="form-input"
                  rows="3"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  readOnly
                  className="form-input"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ApplicationDetails;
