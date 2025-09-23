// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./commission.css";

// export default function Commission({ color }) {
//   const [commissions, setCommissions] = useState([]);
//   const [filteredCommissions, setFilteredCommissions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const baseUrl = "http://127.0.0.1:8081/SPS";

//   // Fetch commission details from API
//   const fetchCommissionDetails = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`${baseUrl}/api/commission/details`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//         credentials: "include",
//       });
//       if (response.ok) {
//         const data = await response.json();
//         // Transform the API data to match our component structure
//         const transformedData = data.map((item, index) => ({
//           id: index + 1,
//           estimateNo: item.estimateNo,
//           totalCost: item.totalCost,
//           deptId: item.deptId,
//           description: item.description,
//           status: getStatusText(item.status), 
//           statusCode: item.status,
//         }));
//         setCommissions(transformedData);
//         setFilteredCommissions(transformedData);
//         toast.success("Commission data loaded successfully!");
//       } else {
//         throw new Error(`Failed to fetch data: ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Error fetching commission details:", error);
//       setError(error.message);
//       toast.error("Failed to load commission data!");
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Convert numeric status to readable text
//   const getStatusText = (statusCode) => {
//     switch (statusCode) {
//       case 1:
//         return "pending";
//       case 2:
//         return "approved";
//       case 3:
//         return "rejected";
//       case 4:
//         return "forwarded";
//       default:
//         return "pending";
//     }
//   };
//   // Get status display text
//   const getStatusDisplayText = (status) => {
//     switch (status) {
//       case "approved":
//         return "Approved";
//       case "rejected":
//         return "Rejected";
//       case "forwarded":
//         return "Forwarded";
//       default:
//         return "Pending";
//     }
//   };
//   useEffect(() => {
//     fetchCommissionDetails();
//   }, []);

//   useEffect(() => {
//     let result = commissions;
//     if (statusFilter !== "all") {
//       result = result.filter((c) => c.status === statusFilter);
//     }
//     if (searchTerm) {
//       result = result.filter((c) =>
//         [c.estimateNo, c.deptId, c.description].some(
//           (val) =>
//             val &&
//             val.toString().toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }
//     setFilteredCommissions(result);
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, commissions]);

//   const totalPages = Math.ceil(filteredCommissions.length / rowsPerPage);
//   const currentData = filteredCommissions.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "approved":
//         return "status-approved";
//       case "rejected":
//         return "status-rejected";
//       case "forwarded":
//         return "status-forwarded";
//       default:
//         return "status-pending";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="commission-container">
//         <div className="commission-wrapper">
//           <div className="commission-card">
//             <div className="loading-container">
//               <div className="loading-text">Loading commission data...</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="commission-container">
//         <div className="commission-wrapper">
//           <div className="commission-card">
//             <div className="error-container">
//               <div className="error-text">Error: {error}</div>
//               <button onClick={fetchCommissionDetails} className="retry-button">
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="commission-container">
//       <div className="commission-wrapper">
//         <div className="commission-card">
//           <div className="commission-header">
//             <h3 className={`commission-title ${color}`}>
//               Commission Management
//             </h3>
//           </div>

//           {/* Filters and Search */}
//           <div className="filters-container">
//             <div className="filters-left">
//               <div className="show-entries">
//                 <label>Show</label>
//                 <select
//                   value={rowsPerPage}
//                   onChange={(e) => setRowsPerPage(Number(e.target.value))}
//                 >
//                   {[5, 10, 20, 50].map((num) => (
//                     <option key={num} value={num}>
//                       {num}
//                     </option>
//                   ))}
//                 </select>
//                 <label>entries</label>
//               </div>

//               <div className="spacer"></div>

//               <div className="status-filter">
//                 <label>Status:</label>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   {["all", "pending", "approved", "rejected", "forwarded"].map(
//                     (status) => (
//                       <option key={status} value={status}>
//                         {status.charAt(0).toUpperCase() + status.slice(1)}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>
//             </div>

//             <input
//               type="text"
//               placeholder="Search Estimate No, Dept ID, or Description..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//           </div>

//           {/* Table */}
//           <div className="table-container">
//             <table className="commission-table">
//               <thead>
//                 <tr className="table-header">
//                   <th>Estimate No</th>
//                   <th>Dept ID</th>
//                   <th>Total Cost</th>
//                   <th>Description</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentData.length > 0 ? (
//                   currentData.map((c) => (
//                     <tr key={`${c.estimateNo}-${c.id}`} className="table-row">
//                       <td className="table-cell">{c.estimateNo}</td>
//                       <td className="table-cell">{c.deptId}</td>
//                       <td className="table-cell">
//                         Rs. {c.totalCost?.toLocaleString() || 0}
//                       </td>
//                       <td className="table-cell" title={c.description}>
//                         {c.description && c.description.length > 50
//                           ? `${c.description.substring(0, 50)}...`
//                           : c.description}
//                       </td>
//                       <td className="table-cell">
//                         <span
//                           className={`status-badge ${getStatusBadgeClass(
//                             c.status
//                           )}`}
//                         >
//                           {getStatusDisplayText(c.status)}
//                         </span>
//                       </td>
//                       <td className="table-cell">
//                         <Link to={`/admin/commission/${c.estimateNo}`}>
//                           <button className="view-button">View</button>
//                         </Link>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="no-data">
//                       No commission data found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="pagination-container">
//             <div className="pagination-info">
//               Showing{" "}
//               {filteredCommissions.length === 0
//                 ? 0
//                 : (currentPage - 1) * rowsPerPage + 1}{" "}
//               to{" "}
//               {Math.min(currentPage * rowsPerPage, filteredCommissions.length)}{" "}
//               of {filteredCommissions.length} entries
//             </div>
//             <div className="pagination-buttons">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-button"
//               >
//                 Previous
//               </button>
//               <span className="pagination-info-text">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages || totalPages === 0}
//                 className="pagination-button"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./commission.css";

export default function Commission({ color }) {
  const [commissions, setCommissions] = useState([]);
  const [filteredCommissions, setFilteredCommissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const baseUrl = "http://127.0.0.1:8081/SPS";

  // Convert numeric status to readable text
  const getStatusText = (statusCode) => {
    switch (statusCode) {
      case 1:
        return "pending";
      case 2:
        return "approved";
      case 3:
        return "rejected";
      case 4:
        return "forwarded";
      default:
        return "pending";
    }
  };

  const getStatusDisplayText = (status) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "forwarded":
        return "Forwarded";
      default:
        return "Pending";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "status-approved";
      case "rejected":
        return "status-rejected";
      case "forwarded":
        return "status-forwarded";
      default:
        return "status-pending";
    }
  };

  // Fetch commission details
  useEffect(() => {
    const fetchCommissionDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${baseUrl}/api/commission/details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        const transformedData = data.map((item, index) => ({
          id: index + 1,
          estimateNo: item.estimateNo,
          totalCost: item.totalCost,
          deptId: item.deptId,
          description: item.description,
          status: getStatusText(item.status),
          statusCode: item.status,
        }));

        setCommissions(transformedData);
        setFilteredCommissions(transformedData);
        toast.success("Commission data loaded successfully!");
      } catch (err) {
        console.error("Error fetching commission details:", err);
        setError(err.message);
        toast.error("Failed to load commission data!");
      } finally {
        setLoading(false);
      }
    };

    fetchCommissionDetails();
  }, [baseUrl]);

  // Filter commissions
  useEffect(() => {
    let result = commissions;
    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }
    if (searchTerm) {
      result = result.filter((c) =>
        [c.estimateNo, c.deptId, c.description].some(
          (val) =>
            val &&
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setFilteredCommissions(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, commissions]);

  const totalPages = Math.ceil(filteredCommissions.length / rowsPerPage);
  const currentData = filteredCommissions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Render loading state
  if (loading) {
    return (
      <div className="commission-container">
        <div className="commission-wrapper">
          <div className="commission-card">
            <div className="loading-container">
              <div className="loading-text">Loading commission data...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="commission-container">
        <div className="commission-wrapper">
          <div className="commission-card">
            <div className="error-container">
              <div className="error-text">Error: {error}</div>
              <button
                onClick={() => window.location.reload()}
                className="retry-button"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render table
  return (
    <div className="commission-container">
      <div className="commission-wrapper">
        <div className="commission-card">
          <div className="commission-header">
            <h3 className={`commission-title ${color}`}>
              Commission Management
            </h3>
          </div>

          {/* Filters */}
          <div className="filters-container">
            <div className="filters-left">
              <div className="show-entries">
                <label>Show</label>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                  {[5, 10, 20, 50].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <label>entries</label>
              </div>

              <div className="spacer"></div>

              <div className="status-filter">
                <label>Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {["all", "pending", "approved", "rejected", "forwarded"].map(
                    (status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <input
              type="text"
              placeholder="Search Estimate No, Dept ID, or Description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Table */}
          <div className="table-container">
            <table className="commission-table">
              <thead>
                <tr className="table-header">
                  <th>Estimate No</th>
                  <th>Dept ID</th>
                  <th>Total Cost</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((c) => (
                    <tr key={`${c.estimateNo}-${c.id}`} className="table-row">
                      <td className="table-cell">{c.estimateNo}</td>
                      <td className="table-cell">{c.deptId}</td>
                      <td className="table-cell">
                        Rs. {c.totalCost?.toLocaleString() || 0}
                      </td>
                      <td className="table-cell" title={c.description}>
                        {c.description && c.description.length > 50
                          ? `${c.description.substring(0, 50)}...`
                          : c.description}
                      </td>
                      <td className="table-cell">
                        <span
                          className={`status-badge ${getStatusBadgeClass(
                            c.status
                          )}`}
                        >
                          {getStatusDisplayText(c.status)}
                        </span>
                      </td>
                      <td className="table-cell">
                        <Link to={`/admin/commission/${c.estimateNo}`}>
                          <button className="view-button">View</button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No commission data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination-info">
              Showing{" "}
              {filteredCommissions.length === 0
                ? 0
                : (currentPage - 1) * rowsPerPage + 1}{" "}
              to{" "}
              {Math.min(currentPage * rowsPerPage, filteredCommissions.length)}{" "}
              of {filteredCommissions.length} entries
            </div>
            <div className="pagination-buttons">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="pagination-info-text">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
