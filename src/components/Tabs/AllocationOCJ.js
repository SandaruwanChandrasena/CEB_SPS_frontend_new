import { useState,useEffect } from "react";
// import FileUpload from "./FileUpload";
// import ModifyProgress from "layouts/ModifyProgress";
// import axios from "axios";


const AllocationOCJ = () => {
  const [estimateNo, setEstimateNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Get department ID from session
  const [deptId, setDeptId] = useState("");

  useEffect(() => {
    // Get department ID from session storage
    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      if (user.deptId) {
        setDeptId(user.deptId);
        console.log("Department ID from session:", user.deptId);
      } else {
        console.warn("Department ID not found in session");
      }
    } catch (error) {
      console.error("Error retrieving department ID from session:", error);
    }
  }, []);
  const handleInputChange = (e) => {
    setEstimateNo(e.target.value);
  };

  const handlePrintReport = async (e) => {
    e.preventDefault();
    
    if (!estimateNo.trim()) {
      setError("Please enter an estimate number");
      return;
    }

    if (!deptId) {
      setError("Department ID not found. Please login again.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      
      // Generate PDF in a new tab/window by creating a URL with query parameters
      const url = `http://localhost:8081/report/appli?applicationNo=${estimateNo}&deptId=${deptId}`;
      
      console.log("Making request with deptId:", deptId);
      
      // Using fetch with Basic Authentication
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa("user:admin123"),
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        // Get the blob from response
        const blob = await response.blob();
        
        // Create a blob URL
        const blobUrl = URL.createObjectURL(blob);
        
        // Open in new tab
        window.open(blobUrl, '_blank');
      } else {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
      <form onSubmit={handlePrintReport}>
        {/* <div className="block mb-3 ml-3 font-bold text-blueGray-600 text-m">Download Letters</div> */}

        {/* //new */}
        <div className="flex flex-wrap ">
          <div className="flex"></div>

          {/* drop down */}

          {/* drop doun end */}

          {/* second field row */}

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="estimateNo"
              >
                Estimate Number
              </label>
              <div className="flex ">
                <input
                   type="text"
                   name="estimateNo"
                   id="estimateNo"
                   value={estimateNo}
                   onChange={handleInputChange}
                  className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <button
                type="submit"
                disabled={loading}
                  className="px-4 py-2 ml-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                  style={{
                    backgroundColor: "#7c0000",
                  }}
                >
                    {loading ? "Processing..." : "Print"}
                
                </button>
              </div>
            </div>
          </div>
          {/* second field row end */}

          {/* Display error message if there is one */}
          {error && (
          <div className="w-full px-4 mt-2">
            <div className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        )}
        </div>

        {/* test */}
      </form>
    </div>
  );
};

export default AllocationOCJ;
