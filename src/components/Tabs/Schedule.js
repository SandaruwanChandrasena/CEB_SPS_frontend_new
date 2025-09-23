import React, { useState } from "react";

function Schedule({ isModify, initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    costCenter: initialData.costCenter || "",
    applicationNumber: initialData.applicationNumber || "",
    applicationType: initialData.applicationType || "",
    allocatedTo: initialData.allocatedTo || "",
    selecteddate: initialData.selecteddate || "",
    description: initialData.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-blueGray-700 text-sm font-bold text-center">
            Schedule
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mt-2">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-blueGray-600 text-sm mb-2"
                    htmlFor="grid-password"
                  >
                    Cost Center
                  </label>
                  <input
                    type="text"
                    id="costCenter"
                    name="costCenter"
                    value={formData.costCenter}
                    onChange={handleInputChange}
                    className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-blueGray-600 text-sm mb-2"
                    htmlFor="grid-password"
                  >
                    Application Number
                  </label>
                  <input
                    type="text"
                    id="applicationNumber"
                    name="applicationNumber"
                    value={formData.applicationNumber}
                    onChange={handleInputChange}
                    className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-blueGray-600 text-sm mb-2"
                    htmlFor="grid-password"
                  >
                    Application Type
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-blueGray-600 text-sm mb-2"
                    htmlFor="grid-password"
                  >
                    Allocated To
                  </label>
                  <input
                    type="text"
                    name="allocatedTo"
                    className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-blueGray-600 text-sm mb-2"
                    htmlFor="grid-password"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="selecteddate"
                    placeholder="DD/MM/YYYY"
                    className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-blueGray-600 text-sm mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    rows="1"
                    type="text"
                    name="description"
                    className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-12 flex justify-center items-center mt-2 mb-4">
              <div>
                <button className="bg-emerald-400 text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  {isModify ? "Update" : "Add"}
                </button>
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-400 text-white active:bg-gray-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Schedule;
