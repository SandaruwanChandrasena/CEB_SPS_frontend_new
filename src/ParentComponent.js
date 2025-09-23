// import React, { useState } from "react";
// import CardEstimatePage1 from "./CardEstimatePage1";

// function ParentComponent() {
//     const [formData, setFormData] = useState({
//         estimateNo: "",
//         costCenter: "",
//         warehouse: "",
//         etimateDt: "",
//         fileRef: "",
//         rejectReason: "",
//         esName: "",
//         descr: "",
//     });

//     const [errors, setErrors] = useState({});
//     const [mode, setMode] = useState("new");

//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prev) => ({ ...prev, [id]: value }));
//     };

//     const handleNext = () => {
//         // Basic validation example
//         const newErrors = {};
//         if (!formData.costCenter) newErrors.costCenter = "Cost Center is required";
//         if (!formData.warehouse) newErrors.warehouse = "Warehouse is required";
//         if (!formData.etimateDt) newErrors.etimateDt = "Estimate Date is required";
//         if (!formData.fileRef) newErrors.fileRef = "File Reference is required";
//         if (!formData.esName) newErrors.esName = "Client Name is required";
//         if (!formData.descr) newErrors.descr = "Description is required";

//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//         } else {
//             setErrors({});
//             console.log("Form Data Submitted:", formData);
//             // Proceed to next step or save data
//         }
//     };

//     return (
//         <div>
//             <div className="mb-4">
//                 <button
//                     onClick={() => {
//                         setMode("new");
//                         setFormData((prev) => ({ ...prev, estimateNo: "" })); // Reset estimateNo for new
//                     }}
//                     className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//                 >
//                     New Estimate
//                 </button>
//                 <button
//                     onClick={() => {
//                         setMode("modify");
//                         // Optionally reset other fields if needed
//                     }}
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Modify Estimate
//                 </button>
//             </div>
//             <CardEstimatePage1
//                 formData={formData}
//                 onChange={handleChange}
//                 errors={errors}
//                 onNext={handleNext}
//                 mode={mode}
//             />
//         </div>
//     );
// }

// export default ParentComponent;




