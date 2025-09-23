// import { useState } from "react";
// import FileUpload from "./FileUpload";
// import ModifyProgress from "layouts/ModifyProgress";
// import React, { useEffect } from "react";
// import axios from "axios";

// const ProgressBar1 = () => {
//   const [progress, setProgress] = useState(0); // Start with 0 progress
//   const [estimateNo, setEstimateNo] = useState(""); // State for the estimate number
//   const [error, setError] = useState(""); // State for error messages

//   // Function to check if estimate exists and update progress
//   const checkEstimateAndUpdateProgress = async () => {
//     if (!estimateNo.trim()) {
//       setError("Please enter an estimate number");
//       return;
//     }
//     try {
//       setError(""); // Clear any previous errors


//       // API call with Basic Authentication to check if the estimate exists
//       const response = await axios.get(`http://localhost:8081/api/progress/${estimateNo}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Basic " + btoa("user:admin123")
//         },
//         // Include credentials if your API requires cookies to be sent
//         withCredentials: true
//       });
//       // If the API returns true, set progress to 5%
//       if (response.data === true) {
//         setProgress(5);
//       } else {
//         setError("Estimate not found in database");
//       }
//     } catch (error) {
//       console.error("Error checking estimate:", error);
//       setError("Failed to check estimate. Please try again.");
//     }
//   };


//   return (
//     <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
//       <form>
//         <div className="flex flex-wrap">
//           <div className="flex"></div>

//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="estimateNo"
//               >
//                 Estimate Number
//               </label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   name="estimateNo"
//                   id="estimateNo"
//                   value={estimateNo}
//                   onChange={(e) => setEstimateNo(e.target.value)}
//                   className="w-full h-8 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 />
//                 <button
//                   type="button"
//                   onClick={checkEstimateAndUpdateProgress}
//                   //  onClick={() => setProgress(Math.min(100, progress + 5))}
//                   className="px-4 py-2 ml-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none hover:shadow-md focus:outline-none"
//                   style={{
//                     backgroundColor: "#7c0000",
//                   }}
//                 >
//                   Print
//                 </button>
//               </div>
//               {/* Error message */}
//               {error && (
//                 <div className="mt-1 text-xs text-red-500">{error}</div>
//               )}

//               {/* --- Progress Bar --- */}
            
//               {/* Improved Progress Bar with both Tailwind and inline styles */}
//               <div className="w-full p-3 mt-6 bg-white border border-gray-200 rounded shadow-sm">
//                 {/* <h3 className="mb-2 text-lg font-bold text-blueGray-700">Project Status</h3> */}

//                 <div className="flex justify-between mb-1">
//                   <span className="text-base font-medium text-blue-700">Progress</span>
//                   <span className="text-sm font-medium text-blue-700">{progress}%</span>
//                 </div>
//                 {/* Progress bar container */}

//                 {/* Progress bar fill - using !important to override any conflicting styles */}
//                 <div
//                   className="flex items-center justify-center h-5 text-xs font-bold text-white rounded-full"
//                   style={{
//                     width: `${progress}%`,
//                     backgroundColor: "#10b981",
//                     minWidth: progress > 0 ? '30px' : '0'
//                   }}
//                 >
//                   {progress > 0 && `${progress}%`}
//                 </div>
//               </div>

//               {/* Controls to test if the progress bar works */}
//               <div className="flex justify-between mt-3">
               
//                 <button
//                   type="button"
//                   onClick={() => setProgress(0)}
//                   className="px-2 py-1 text-xs bg-blue-500 rounded text-blue"
//                 >
//                   Clear
//                 </button>
              
//               </div>
//             </div>
//             {/* --- End Progress Bar --- */}
//           </div>
//         </div>

//       </form>
//     </div>
//   );
// };

// export default ProgressBar1;

import { useState } from "react";
// import FileUpload from "./FileUpload";
// import ModifyProgress from "layouts/ModifyProgress";
import React from "react";
import axios from "axios";

const ProgressBar1 = () => {
  const [progress, setProgress] = useState(0); // Start with 0 progress
  const [estimateNo, setEstimateNo] = useState(""); // State for the estimate number
   const [error, setError] = useState(""); // State for error messages
  const [estimateDate, setEstimateDate] = useState(""); // State for storing estimate date
   const [projectAssignDate, setProjectAssignDate] = useState(""); // State for storing project assignment date



  // Function to check if estimate exists and update progress
  const checkEstimateAndUpdateProgress = async () => {
    if (!estimateNo.trim()) {
      setError("Please enter an estimate number");
      return;
    }
    try {
      setError(""); // Clear any previous errors
      setEstimateDate(""); // Clear any previous estimate date
      setProjectAssignDate(""); // Clear any previous project assignment date


      // API call with Basic Authentication to check if the estimate exists
      const response = await axios.get(`http://127.0.0.1:8088/SPS/api/pcesthmt/${estimateNo}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa("user:admin123")
        },
        // Include credentials if your API requires cookies to be sent
        withCredentials: true
      });

      console.log("API Response:", response.data); // Log to see what we're getting
    

    // Check if we have response data
    if (response.data) {
      // Check if we have an estimate date
      if (response.data.etimateDt) {
        setProgress(10); // Set progress to 10% as required
        setEstimateDate(response.data.etimateDt); // Store the estimate date
      }
       // Check if we have a project assignment date
          if (response.data.prjAssDt) {
            setProjectAssignDate(response.data.prjAssDt); // Store the project assignment date
          }
           else {
        setError("Estimate found but missing date information");
        setProgress(0);
      }
      } else {
      setError("No data returned for this estimate number");
      setProgress(0);
    }
    } catch (error) {
      console.error("Error checking estimate:", error);
      setError("Failed to check estimate. Please try again.");
      setProgress(0);
    }
  };


  return (
    <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
      <form>
        <div className="flex flex-wrap">
          <div className="flex"></div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="estimateNo"
              >
                Estimate Number
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="estimateNo"
                  id="estimateNo"
                  value={estimateNo}
                  onChange={(e) => setEstimateNo(e.target.value)}
                  className="w-full h-8 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                />
                <button
                  type="button"
                  onClick={checkEstimateAndUpdateProgress}
                  //  onClick={() => setProgress(Math.min(100, progress + 5))}
                  className="px-4 py-2 ml-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none hover:shadow-md focus:outline-none"
                  style={{
                    backgroundColor: "#7c0000",
                  }}
                >
                  Print
                </button>
              </div>
              {/* Error message */}
              {error && (
                <div className="mt-1 text-xs text-red-500">{error}</div>
              )}

              {/* Display estimate date if available */}
              {estimateDate && (
                <div className="mt-2 text-sm text-green-600">
                  <strong>Estimate Date:</strong> {estimateDate}
                </div>
              )}
                 {/* Display project assignment date if available */}
              {projectAssignDate && (
                <div className="mt-2 text-sm text-green-600">
                  <strong>Project Assign Date:</strong> {projectAssignDate}
                </div>
              )}

              {/* --- Progress Bar --- */}
            
              {/* Improved Progress Bar with both Tailwind and inline styles */}
              <div className="w-full p-3 mt-6 bg-white border border-gray-200 rounded shadow-sm">
                {/* <h3 className="mb-2 text-lg font-bold text-blueGray-700">Project Status</h3> */}

                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-blue-700">Progress</span>
                  <span className="text-sm font-medium text-blue-700">{progress}%</span>
                </div>
                {/* Progress bar container */}

                {/* Progress bar fill - using !important to override any conflicting styles */}
                <div
                  className="flex items-center justify-center h-5 text-xs font-bold text-white rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "#10b981",
                    minWidth: progress > 0 ? '30px' : '0'
                  }}
                >
                  {progress > 0 && `${progress}%`}
                </div>
              </div>

              {/* Controls to test if the progress bar works */}
              <div className="flex justify-between mt-3">
               
                <button
                  type="button"
                   onClick={() => {
                    setProgress(0);
                    setEstimateDate("");
                    setProjectAssignDate("");
                  }}
                  className="px-2 py-1 text-xs bg-blue-500 rounded text-blue"
                >
                  Clear
                </button>
              
              </div>
            </div>
            {/* --- End Progress Bar --- */}
          </div>
        </div>

      </form>
    </div>
  );
};

export default ProgressBar1;

