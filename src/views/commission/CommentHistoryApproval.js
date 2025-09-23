import React, { useState, useEffect } from "react";

const CommentHistoryApproval = ({ estimateNo = "EST003" }) => {
  const [commentHistoryData, setCommentHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommentHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8081/SPS/api/approval-history/${estimateNo}`,
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
        setCommentHistoryData(data);
      } catch (error) {
        console.error("Error fetching comment history:", error);
        setError("Failed to load comment history");
      } finally {
        setLoading(false);
      }
    };

    fetchCommentHistory();
  }, [estimateNo]);

  if (loading) {
    return (
      <div className="form-container">
        <h3 className="form-title">Comments & Approval History</h3>
        <div className="loading-text">Loading comment history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container">
        <h3 className="form-title">Comments & Approval History</h3>
        <div className="error-text">{error}</div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="table-container">
        <table className="commission-table">
          <thead>
            <tr className="table-header">
              <th>Action By</th>
              <th>Action Date</th>
              <th>Action Time</th>
              <th>User Level</th>
              <th>Comments</th>
              <th>From Status</th>
              <th>To Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="7"
                style={{
                  backgroundColor: "#fef2f2",
                  padding: "0.75rem",
                  fontWeight: "500",
                  color: "#dc2626",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Comments & Approval History
              </td>
            </tr>
            {commentHistoryData.length > 0 ? (
              commentHistoryData.map((item, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell">{item.actionBy}</td>
                  <td className="table-cell">{item.actionDate}</td>
                  <td className="table-cell">{item.actionTime}</td>
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
                  <td className="table-cell" style={{ maxWidth: "300px" }}>
                    {item.comments}
                  </td>
                  <td className="table-cell">
                    <span
                      style={{
                        backgroundColor: "#dbeafe",
                        color: "#1e40af",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                      }}
                    >
                      {item.fromStatus}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span
                      style={{
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                      }}
                    >
                      {item.toStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="table-cell">
                  No comment history available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Status Legend */}
      <div
        style={{
          marginTop: "1rem",
          padding: "0.75rem",
          backgroundColor: "#f9fafb",
          borderRadius: "0.375rem",
          fontSize: "0.75rem",
          color: "#6b7280",
          lineHeight: "1.4",
        }}
      >
        <strong>Status Codes:</strong> 2 = ES-Modify, 5 = Rejected, 8 =
        ES-Validation, 10 = Commercial EE-Approval, 20 = Planning EE-Approval,
        30 = Commercial CE-Approval, 35 = Planning CE-Approval, 40 =
        DGM-Approval, 50 = Approved, 60 = To be sent for
        Construction/Maintenance
      </div>
    </div>
  );
};

export default CommentHistoryApproval;