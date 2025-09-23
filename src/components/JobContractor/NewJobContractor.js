import JobContractor from "components/Tabs/JobContractor";
// import { useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";

const NewJobContractor = ({
  onFormSubmit,
  isModify,
  formData,
  setFormData,
  handleSearch,
}) => {
  const history = useHistory();
  // const downloadUserReport = () => {
  //   fetch("http://localhost:8081/api/users/report/download", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Basic " + btoa("user:admin123"),
  //     },
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch PDF");
  //       }
  //       return response.blob();
  //     })
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(new Blob([blob]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", `user_report.pdf`);
  //       document.body.appendChild(link);
  //       link.click();
  //       link.parentNode.removeChild(link);
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading the report:", error);
  //     });
  // };

  const handleInputChange = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...data },
    }));
  };
  const handleSubmit = () => {
    onFormSubmit(formData);
  };
  const handleUpdateClick = () => {
    history.push("/jobcontractor/modify");
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
      <div className="flex justify-center px-12 mt-6 mb-2 ml-2">
        <h3 className="text-sm font-bold text-blueGray-700">
          {isModify ? "Update Contractor" : "Add Contractor"}
        </h3>
        {/* {!isModify && (
          <button
            onClick={handleUpdateClick}
            style={{backgroundColor: "#7c0000"}}
            className="px-6 py-2 mt-2 mr-2 text-xs font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
          >
            Edit
          </button>
          )} */}
      </div>
      {/* Content */}
      <div className="p-6 rounded-lg bg-blueGray-100">
        <JobContractor
          onInputChange={(data) => handleInputChange("contractorDetails", data)}
          isModify={isModify}
          data={formData.contractorDetails}
          handleSearch={handleSearch}
        />
      </div>
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between px-12 mt-2 mb-4">
        <div>
          {!isModify && (
            <button
              onClick={handleUpdateClick}
              style={{ backgroundColor: "#7c0000" }}
              className="px-6 py-2 ml-2 mr-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
            >
              Edit
            </button>
          )}
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 active:bg-emerald-600 hover:shadow-md focus:outline-none"
          >
            {isModify ? "Update" : "Submit"}
          </button>
          {/* <button
            onClick={downloadUserReport}
            style={{ backgroundColor: "#7c0000" }}
            className="px-6 py-2 mr-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
          >
            Download
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default NewJobContractor;
