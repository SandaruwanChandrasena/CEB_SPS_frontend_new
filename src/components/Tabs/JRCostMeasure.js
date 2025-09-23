import React, { useState, useEffect } from "react";

const JRCostMeasure = ({ onInputChange, data }) => {
  const [personalData, setpersonalData] = useState({
    idType: "",
    idNo: "",
    fname: "",
    lname: "",
  });

  useEffect(() => {
      if (data) {
        setpersonalData(data);
      }
    }, [data]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   const newData = { ...personalData, [name]: value };
  //   setpersonalData(newData);
  //   onInputChange(newData);
  // };

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   if (!personalData.idNo) {
  //     alert("Please enter an ID number");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `http://localhost:8081/api/v1/search?nicno=${personalData.idNo}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Basic " + btoa("user:admin123"),
  //         },
  //         credentials: "include",
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json(); // Parse JSON response properly

  //     setpersonalData((prevData) => ({
  //       ...prevData,
  //       fname: data.fname || "",
  //       lname: data.lname || "",
  //     }));

  //     // Call onInputChange with updated state
  //     onInputChange({
  //       ...personalData,
  //       fname: data.fname || "",
  //       lname: data.lname || "",
  //     });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     alert("Failed to retrieve details. Please check the ID number.");
  //   }
  // };

  return (
    <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
      <form>
        <div className="flex flex-wrap">
        <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Fund Source
              </label>
              <select
                name="fundsource"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value="" disabled>
                  --Please Select--
                </option>
              </select>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Fund ID
              </label>
              <select
                name="fundid"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value="" disabled>
                  --Please Select--
                </option>
              </select>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                PIV Number
              </label>
              <input
                type="text"
                name="pivno"
                value={personalData.fname}
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Amount
              </label>
              <input
                type="text"
                name="amount"
                value={personalData.lname}
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                PIV Date
              </label>
              <input
                type="date"
                name="pivdate"
                className="w-full px-3 py-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Rebate
              </label>
              <input
                type="text"
                name="rebate"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Total Cost
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Total Cost of Initial Detail Estimate
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Total Cost of Current Revision
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Variance
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JRCostMeasure;
