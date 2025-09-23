// import { useState, useEffect } from "react";

// import TechnicalDetails from "../../components/ModifyEstimate/TechnicalDetails";
// import CostMeasurements from "../../components/ModifyEstimate/CostMeasurements";
// import Actions from "../../components/ModifyEstimate/Actions";
// import StandardRates from "../../components/ModifyEstimate/StandardRates";
// import Uploads from "../../components/ModifyEstimate/Uploads";

// const Tabs = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [completedTabs, setCompletedTabs] = useState(Array(6).fill(false));
//   const [applications, setApplications] = useState([]);
//   const [selectedAppNo, setSelectedAppNo] = useState("");

//   const [generalInfo, setGeneralInfo] = useState({});
//   const [technicalDetails, setTechnicalDetails] = useState({});
//   const [costMeasurements, setCostMeasurements] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8081/api/estimation/references")
//       .then((response) => response.json())
//       .then((data) => {
//         // Check the data structure and log it to confirm it's what you expect
//         console.log(data); // Expected: ["appNo1", "appNo2", ...]

//         // Filter out any invalid appNo values (if needed)
//         const validApplications = data.filter(
//           (app) => app && typeof app === "string"
//         );
//         setApplications(validApplications);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching application references:", error);
//         setError("Failed to load applications.");
//         setLoading(false);
//       });
//   }, []);

//   const fetchApplicationDetails = (appNo) => {
//     fetch(`http://localhost:8081/api/estimation/${appNo}`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data) {
//           setGeneralInfo({
//             stdNo: data.stdNo || "",
//             deptId: data.deptId || "",
//             jobDescription: data.jobName || "",
//             beneficiaries: data.contingency || "", // adjust based on actual field
//             powerSupply: data.description || "",
//             rejectedReason: data.rejReasonEe || "",
//           });

//           setTechnicalDetails({
//             lineLength: data.lineLength || "",
//             newCapacity: data.newCapacity || "",
//             exCapacity: data.exCapacity || "",
//             balCapacity: data.balCapacity || "",
//           });

//           setCostMeasurements({
//             totalCost: data.totalCost || "",
//             secDeposit: data.secDeposit || "",
//             vat: data.vat || "",
//             nbtCost: data.nbtCost || "",
//             vatCost: data.vatCost || "",
//             sctCost: data.sctCost || "",
//           });
//         }
//       })
//       .catch((error) => console.error("error fetching details:", error));
//   };

//   const handleApplicationChange = (e) => {
//     const appNo = e.target.value;
//     setSelectedAppNo(appNo);
//     fetchApplicationDetails(appNo);
//   };

//   const tabs = [
//     {
//       name: "General Information",
//       content: (
//         <form>
//           <div className="flex flex-wrap">
//             {/* Application Reference No Dropdown */}
//             <div className="w-full lg:w-6/12 px-4 py-3">
//               <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
//                 application reference no
//               </label>
//               {loading ? (
//                 <p className="text-gray-500">loading...</p>
//               ) : error ? (
//                 <p className="text-red-500">{error}</p>
//               ) : (
//                 <select
//                   name="appNo"
//                   value={selectedAppNo}
//                   onChange={handleApplicationChange}
//                   className="border px-3 py-2 bg-white text-black rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 >
//                   <option value="">select application</option>
//                   {applications.length > 0 ? (
//                     applications.map((app, index) => (
//                       <option key={index} value={app}>
//                         {app}
//                       </option>
//                     ))
//                   ) : (
//                     <option disabled>no applications found</option>
//                   )}
//                 </select>
//               )}
//             </div>

//             {/* Other Fields */}
//             {[
//               { label: "name", name: "stdNo" },
//               { label: "address", name: "deptId" },
//               { label: "job description", name: "jobDescription" },
//               { label: "no of beneficiaries", name: "beneficiaries" },
//               { label: "power to supply", name: "powerSupply" },
//               { label: "rejected reason", name: "rejectedReason" },
//             ].map((field) => (
//               <div key={field.name} className="w-full lg:w-6/12 px-4 py-3">
//                 <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
//                   {field.label}
//                 </label>
//                 <input
//                   type="text"
//                   name={field.name}
//                   value={generalInfo[field.name] || ""}
//                   onChange={(e) =>
//                     setGeneralInfo({
//                       ...generalInfo,
//                       [field.name]: e.target.value,
//                     })
//                   }
//                   className="border px-3 py-2 bg-white text-black rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </form>
//       ),
//     },
//     {
//       name: "Technical Details",
//       content: <TechnicalDetails formData={technicalDetails} />,
//     },
//     {
//       name: "Cost & Measurements",
//       content: <CostMeasurements formData={costMeasurements} />,
//     },
//     { name: "Uploads", content: <Uploads /> },
//     { name: "Standard Rates", content: <StandardRates /> },
//     { name: "Actions", content: <Actions /> },
//   ];

//   const handleNext = () => {
//     if (activeTab < tabs.length - 1) {
//       setActiveTab(activeTab + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (activeTab > 0) {
//       setActiveTab(activeTab - 1);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
//       <div className="w-full max-w-4xl px-4">
//         <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-1">
//           {/* Stepper */}
//           <div className="flex justify-between items-center mb-4 mt-4 relative w-full">
//             {tabs.map((tab, index) => (
//               <div
//                 key={index}
//                 className="relative flex-1 flex flex-col items-center"
//               >
//                 {index < tabs.length - 1 && (
//                   <div
//                     className={`absolute top-5 left-1/2 w-full h-1 -z-10 ${
//                       completedTabs[index] ? "bg-emerald-400" : "bg-gray-300"
//                     }`}
//                   />
//                 )}

//                 {/* Step circle */}
//                 <div
//                   className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${
//                     completedTabs[index]
//                       ? "bg-emerald-400 text-white border-blue-600"
//                       : index === activeTab
//                       ? "bg-red-400 text-white border-orange-600"
//                       : "border-gray-400"
//                   }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <span className="text-xs mt-2">{tab.name}</span>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between items-center mb-1">
//             <h6 className="px-6 py-0 text-xl font-bold text-blueGray-700">
//               {tabs[activeTab].name}
//             </h6>
//             <div className="flex space-x-4 mr-4">
//               {activeTab > 0 && (
//                 <button
//                   onClick={handlePrev}
//                   className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-6 py-3 mr-4 rounded shadow hover:shadow-md transition duration-150"
//                 >
//                   Previous
//                 </button>
//               )}

//               {activeTab < tabs.length - 1 && (
//                 <button
//                   onClick={handleNext}
//                   className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md transition duration-150"
//                 >
//                   Next
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="ml-0 p-5 bg-blueGray-100">
//             <div className="p-5 mr-4 rounded">{tabs[activeTab].content}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tabs;
