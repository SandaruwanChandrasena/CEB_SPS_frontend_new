import React, { useState, useEffect } from "react";

const PersonalDetails = ({ onInputChange, data }) => {
  const [personalData, setpersonalData] = useState({
    idType: "",
    idNo: "",
    fname: "",
    lname: "",
  });

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
      if (data) {
        setpersonalData(data);
      }
    }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...personalData, [name]: value };
    setpersonalData(newData);
    onInputChange(newData);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!personalData.idNo) {
      alert("Please enter an ID number");
      return;
    }

    try {
      const response = await fetch(
        `${baseUrl}/api/v1/search?nicno=${personalData.idNo}`,
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON response properly

      setpersonalData((prevData) => ({
        ...prevData,
        fname: data.fname || "",
        lname: data.lname || "",
      }));

      // Call onInputChange with updated state
      onInputChange({
        ...personalData,
        fname: data.fname || "",
        lname: data.lname || "",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to retrieve details. Please check the ID number.");
    }
  };

  return (
    <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                Id Type
              </label>
              <input
                type="text"
                name="idType"
                value={personalData.idType}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                Id No
              </label>
              <div className="flex ">
                <input
                  type="text"
                  name="idNo"
                  value={personalData.idNo}
                  onChange={handleChange}
                  className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <button
                  onClick={handleSearch}
                  style={{backgroundColor:"#7c0000"}}
                  className="px-4 py-2 ml-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                First Name (Initials)
              </label>
              <input
                type="text"
                disabled
                name="fname"
                value={personalData.fname}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                Last Name
              </label>
              <input
                type="text"
                disabled
                name="lname"
                value={personalData.lname}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                Street Address
              </label>
              <input
                type="text"
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                Suburb
              </label>
              <input
                type="text"
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                City
              </label>
              <input
                type="text"
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                Postal Code
              </label>
              <input
                type="text"
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                Telephone No
              </label>
              <input
                type="text"
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                Mobile No
              </label>
              <input
                type="text"
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                Email
              </label>
              <input
                type="Email"
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                Preferred Language
              </label>
              <input
                type="text"
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-blueGray-600 text-md"
                htmlFor="grid-password"
              >
                CEB Employee
              </label>
              <input
                type="text"
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
