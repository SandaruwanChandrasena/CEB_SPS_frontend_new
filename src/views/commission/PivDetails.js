// src/views/commission/PivDetails.js
import React, { useState, useEffect } from "react";

const PivDetails = ({ estimateNo }) => {
  const [pivData, setPivData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "http://127.0.0.1:8081/SPS";

  useEffect(() => {
    const fetchPivDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${baseUrl}/api/piv-details/by-estimate/${estimateNo}`,
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
          throw new Error(`Failed to fetch PIV details: ${response.status}`);
        }

        const data = await response.json();
        setPivData(data);
      } catch (err) {
        console.error("Error fetching PIV details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (estimateNo) {
      fetchPivDetails();
    }
  }, [estimateNo]);

  // Filter PIV data based on type (APP vs EST)
  const applicationPivs = pivData.filter(
    (item) => item.pivNo && item.pivNo.startsWith("PIV")
  );

  const estimatePivs = pivData.filter(
    (item) => item.pivNo && item.pivNo.startsWith("EST")
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "C":
        return "status-approved"; // Confirmed
      case "P":
        return "status-pending"; // Pending
      case "N":
        return "status-rejected"; // New
      default:
        return "status-pending";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "C":
        return "Confirmed";
      case "P":
        return "Pending";
      case "N":
        return "New";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="form-container">
        <h3 className="form-title">PIV Details</h3>
        <div className="loading-text">Loading PIV details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container">
        <h3 className="form-title">PIV Details</h3>
        <div className="error-text">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h3 className="form-title">PIV Details</h3>

      {/* Application PIV Details Table */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="table-container">
          <table className="commission-table">
            <thead>
              <tr className="table-header">
                <th>PIV Number</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3" className="table-section-header">
                  Application PIV Details
                </td>
              </tr>
              {applicationPivs.length > 0 ? (
                applicationPivs.map((item, index) => (
                  <tr key={`app-${index}`} className="table-row">
                    <td className="table-cell">{item.pivNo}</td>
                    <td className="table-cell">
                      Rs. {item.pivAmount.toLocaleString()}
                    </td>
                    <td className="table-cell">
                      <span
                        className={`status-badge ${getStatusBadgeClass(
                          item.status
                        )}`}
                      >
                        {getStatusText(item.status)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data">
                    No application PIV data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estimate PIV Details Table */}
      <div>
        <div className="table-container">
          <table className="commission-table">
            <thead>
              <tr className="table-header">
                <th>PIV Number</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3" className="table-section-header">
                  Estimate PIV Details
                </td>
              </tr>
              {estimatePivs.length > 0 ? (
                estimatePivs.map((item, index) => (
                  <tr key={`est-${index}`} className="table-row">
                    <td className="table-cell">{item.pivNo}</td>
                    <td className="table-cell">
                      Rs. {item.pivAmount.toLocaleString()}
                    </td>
                    <td className="table-cell">
                      <span
                        className={`status-badge ${getStatusBadgeClass(
                          item.status
                        )}`}
                      >
                        {getStatusText(item.status)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data">
                    No estimate PIV data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Status Legend */}
        <div className="status-legend">
          <div>
            <span className="status-dot status-approved"></span> C = Confirmed
          </div>
          <div>
            <span className="status-dot status-pending"></span> P = Pending
          </div>
          <div>
            <span className="status-dot status-rejected"></span> N = New
          </div>
        </div>
      </div>
    </div>
  );
};

export default PivDetails;
