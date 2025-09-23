// src/views/commission/Attachments.js
import React from "react";

const Attachments = () => {
  // Dummy data for Attachments table
  const attachmentsData = [
    {
      updatedBy: "DGMWPN",
      userLevel: "DGM",
      fileName: "Application_Form_2017_0135.pdf",
    },
    {
      updatedBy: "CECOMWPN",
      userLevel: "CE",
      fileName: "Technical_Drawings_Site_Plan.dwg",
    },
    {
      updatedBy: "EE1PLDWPN",
      userLevel: "PE",
      fileName: "Load_Calculation_Report.xlsx",
    },
  ];

  const getFileExtension = (fileName) => {
    return fileName.split(".").pop().toLowerCase();
  };

  const getFileIcon = (fileName) => {
    const extension = getFileExtension(fileName);
    switch (extension) {
      case "pdf":
        return "📄";
      case "dwg":
        return "📐";
      case "xlsx":
      case "xls":
        return "📊";
      case "doc":
      case "docx":
        return "📝";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      default:
        return "📎";
    }
  };

  const handleFileDownload = (fileName) => {
    // This would typically trigger file download
    console.log(`Downloading file: ${fileName}`);
  };

  return (
    <div className="form-container">
      <div className="table-container">
        <table className="commission-table">
          <thead>
            <tr className="table-header">
              <th>Updated By</th>
              <th>User Level</th>
              <th>File Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="4"
                style={{
                  backgroundColor: "#fef2f2",
                  padding: "0.75rem",
                  fontWeight: "500",
                  color: "#dc2626",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Attachments
              </td>
            </tr>
            {attachmentsData.map((item, index) => (
              <tr key={index} className="table-row">
                <td className="table-cell">{item.updatedBy}</td>
                <td className="table-cell">
                  <span
                    style={{
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    {item.userLevel}
                  </span>
                </td>
                <td className="table-cell">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "1.25rem" }}>
                      {getFileIcon(item.fileName)}
                    </span>
                    <span>{item.fileName}</span>
                  </div>
                </td>
                <td className="table-cell">
                  <button
                    onClick={() => handleFileDownload(item.fileName)}
                    className="view-button"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.5rem",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                    }}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* File Upload Section */}
      <div
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          backgroundColor: "#f9fafb",
          borderRadius: "0.375rem",
          border: "1px solid #e5e7eb",
        }}
      >
        <h4
          style={{
            margin: "0 0 0.75rem 0",
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#374151",
          }}
        >
          Upload New Attachment
        </h4>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <input
            type="file"
            style={{
              fontSize: "0.875rem",
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              backgroundColor: "white",
            }}
          />
          <button
            className="view-button"
            style={{
              fontSize: "0.875rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
            }}
          >
            Upload
          </button>
        </div>
      </div>

      {/* File Types Legend */}
      <div
        style={{
          marginTop: "1rem",
          padding: "0.75rem",
          backgroundColor: "#f0f9ff",
          borderRadius: "0.375rem",
          fontSize: "0.75rem",
          color: "#0369a1",
          lineHeight: "1.4",
        }}
      >
        <strong>Supported File Types:</strong> PDF, DOC/DOCX, XLS/XLSX, DWG,
        JPG/PNG (Max size: 10MB per file)
      </div>
    </div>
  );
};

export default Attachments;
