// src/views/commission/ServiceDetails.js
import React, { useState, useEffect } from "react";

const ServiceDetails = ({ estimateNo }) => {
  const [formData, setFormData] = useState({
    serviceStreetAddress: "",
    serviceSuburb: "",
    serviceCity: "",
    area: "",
    serviceDistrict: "",
    contractDemand: "",
    neighbourAccountNumber: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8081/SPS/api/wiring-land-details/by-estimate/${estimateNo}`,
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
        setFormData({
          serviceStreetAddress: data.serviceStreetAddress || "",
          serviceSuburb: data.serviceSuburb || "",
          serviceCity: data.serviceCity || "",
          area: data.area || "",
          serviceDistrict: data.serviceDistrict || "",
          contractDemand: data.demand || "",
          neighbourAccountNumber: data.neighboursAccNo || "",
        });
      } catch (error) {
        console.error("Error fetching service details:", error);
        setError("Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [estimateNo]);

  const fields = [
    {
      label: "Service Street Address",
      name: "serviceStreetAddress",
      type: "text",
    },
    {
      label: "Service Suburb",
      name: "serviceSuburb",
      type: "text",
    },
    {
      label: "Service City",
      name: "serviceCity",
      type: "text",
    },
    {
      label: "Area",
      name: "area",
      type: "text",
    },
    {
      label: "District",
      name: "serviceDistrict",
      type: "text",
    },
    {
      label: "Contract Demand",
      name: "contractDemand",
      type: "text",
    },
    {
      label: "Neighbour Account Number",
      name: "neighbourAccountNumber",
      type: "text",
    },
  ];

  if (loading) {
    return (
      <div className="form-container">
        <h3 className="form-title">Service Details</h3>
        <div className="loading-text">Loading service details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container">
        <h3 className="form-title">Service Details</h3>
        <div className="error-text">{error}</div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Service Details</h3>
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

export default ServiceDetails;
