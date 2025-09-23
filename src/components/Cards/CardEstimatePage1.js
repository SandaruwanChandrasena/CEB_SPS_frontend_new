import React, { useState, useEffect } from "react";

  const warehouseOptions = {
    "600.41": ["600.10", "600.11", "600.12"],
    "600.42": ["600.20", "600.21", "600.22"],
  };
  
function CardEstimatePage1({ formData, onChange, errors, onNext, isEditMode, estimates, onEstimateSelect }) {
  // List of dummy estimate numbers (used when not in edit mode)
  const estimateNumbers = [
    "600.41/CN/25/0001",
    "600.41/CN/25/0002",
    "600.41/CN/25/0003",
    "600.42/EX/25/0001",
    "600.42/EX/25/0002",
    "600.42/EX/25/0003",
  ];

  // Warehouse options based on estimate number prefix
  // const warehouseOptions = {
  //   "600.41": ["600.10", "600.11", "600.12"],
  //   "600.42": ["600.20", "600.21", "600.22"],
  // };

  // State to manage the available warehouse options based on selected estimate number
  const [availableWarehouses, setAvailableWarehouses] = useState([]);

  // Update warehouse options when estimate number changes
  useEffect(() => {
    if (formData.estimateNo) {
      const prefix = formData.estimateNo.split("/")[0];
      setAvailableWarehouses(warehouseOptions[prefix] || []);
      // Reset warehouse if the current value is not in the new list
      if (!warehouseOptions[prefix]?.includes(formData.warehouse)) {
        onChange({ target: { id: "warehouse", value: "" } });
      }
    } else {
      setAvailableWarehouses([]);
      onChange({ target: { id: "warehouse", value: "" } });
    }
  }, [formData.estimateNo, formData.warehouse, onChange]);
  // [formData.estimateNo, onChange])


  // Handle estimate number selection in edit mode
  const handleEstimateChange = (e) => {
    onChange(e);
    if (isEditMode && e.target.value) {
      onEstimateSelect(e.target.value);
    }
  };

  return (
    <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="mb-2 text-sm text-blueGray-600"
                htmlFor="estimateNo"
              >
                Estimate No
              </label>
              {isEditMode ? (
                <select
                  id="estimateNo"
                  className={`border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full ${
                    errors.estimateNo ? "border-red-500" : ""
                  }`}
                  value={formData.estimateNo || ""}
                  onChange={handleEstimateChange}
                  required
                >
                  <option value="">--Select--</option>
                  {estimates.map((estimate, index) => (
                    <option key={index} value={estimate}>
                      {estimate}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  id="estimateNo"
                  className={`border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full ${
                    errors.estimateNo ? "border-red-500" : ""
                  }`}
                  value={formData.estimateNo || ""}
                  onChange={onChange}
                  required
                >
                  <option value="">--Select--</option>
                  {estimateNumbers.map((estimate, index) => (
                    <option key={index} value={estimate}>
                      {estimate}
                    </option>
                  ))}
                </select>
              )}
              {errors.estimateNo && (
                <p className="mt-1 text-xs text-red-500">{errors.estimateNo}</p>
              )}
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="mb-2 text-sm text-blueGray-600"
                htmlFor="costCenter"
              >
                Cost Center (Project No)
              </label>
              <input
                type="text"
                id="costCenter"
                className={`border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full ${
                  errors.costCenter ? "border-red-500" : ""
                }`}
                value={formData.costCenter || ""}
                onChange={onChange}
                placeholder="Enter Cost Center"
                required
              />
              {errors.costCenter && (
                <p className="mt-1 text-xs text-red-500">{errors.costCenter}</p>
              )}
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="mb-2 text-sm text-blueGray-600"
                htmlFor="warehouse"
              >
                Warehouse
              </label>
              <select
                id="warehouse"
                className="border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full"
                value={formData.warehouse || ""}
                onChange={onChange}
                required
              >
                <option value="">--Select--</option>
                {availableWarehouses.map((warehouse, index) => (
                  <option key={index} value={warehouse}>
                    {warehouse}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="mb-2 text-sm text-blueGray-600"
                htmlFor="estimateDt"
              >
                Estimate Date
              </label>
              <input
                type="date"
                id="estimateDt"
                className={`border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full ${
                  errors.estimateDt ? "border-red-500" : ""
                }`}
                value={formData.estimateDt || ""}
                onChange={onChange}
                required
              />
              {errors.estimateDt && (
                <p className="mt-1 text-xs text-red-500">{errors.estimateDt}</p>
              )}
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="mb-2 text-sm text-blueGray-600"
                htmlFor="fileRef"
              >
                File Reference
              </label>
              <input
                type="text"
                id="fileRef"
                className={`border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full ${
                  errors.fileRef ? "border-red-500" : ""
                }`}
                value={formData.fileRef || ""}
                onChange={onChange}
                placeholder="Enter File Reference"
                required
              />
              {errors.fileRef && (
                <p className="mt-1 text-xs text-red-500">{errors.fileRef}</p>
              )}
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="mb-2 text-sm text-blueGray-600"
                htmlFor="rejectReason"
              >
                Reject Reason
              </label>
              <input
                type="text"
                id="rejectReason"
                className="border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full"
                value={formData.rejectReason || ""}
                onChange={onChange}
                placeholder="Enter Reject Reason"
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="mb-2 text-sm text-blueGray-600"
                htmlFor="esName"
              >
                Client Name
              </label>
              <input
                type="text"
                id="esName"
                className="border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full"
                value={formData.esName || ""}
                onChange={onChange}
                placeholder="Enter Client Name"
                required
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-12/12">
            <div className="relative w-full mb-3">
              <label
                className="mb-2 text-sm text-blueGray-600"
                htmlFor="descr"
              >
                Description
              </label>
              <textarea
                id="descr"
                className="border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full h-48 resize-vertical"
                value={formData.descr || ""}
                onChange={onChange}
                placeholder="Enter Description"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardEstimatePage1;