import React, { useState, useEffect } from "react";
import { api } from "api/client";

const PersonalDetails = ({ onInputChange, data, onApplicantFound }) => {
  const [personalData, setPersonalData] = useState({
    idType: "",
    idNo: "",
    fname: "",
    lname: "",
    streetAddress: "",
    suburb: "",
    city: "",
    postalCode: "",
    telephoneNo: "",
    mobileNo: "",
    email: "",
    preferredLanguage: "",
    cebEmployee: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) setPersonalData((prev) => ({ ...prev, ...data }));
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...personalData, [name]: value };
    setPersonalData(newData);
    onInputChange(newData);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!personalData.idNo?.trim()) {
      alert("Please enter an ID number");
      return;
    }

    try {
      setLoading(true);

      // ✅ axios client adds baseURL (/SPS/api) and Basic Auth
      const { data: a } = await api.get("/applicants/search", {
        params: { idNo: personalData.idNo.trim() },
      });

      const mapped = {
        idType: a.idType || "",
        idNo: a.idNo || personalData.idNo,
        fname: a.firstName || "",
        lname: a.lastName || "",
        streetAddress: a.streetAddress || "",
        suburb: a.suburb || "",
        city: a.city || "",
        postalCode: a.postalCode || "",
        telephoneNo: a.telephoneNo || "",
        mobileNo: a.mobileNo || "",
        email: a.email || "",
        preferredLanguage: a.preferredLanguage || "",
        cebEmployee: a.cebEmployee == null ? "" : String(a.cebEmployee).trim(),
      };

      setPersonalData((prev) => ({ ...prev, ...mapped }));
      onInputChange({ ...personalData, ...mapped });

      if (typeof onApplicantFound === "function") onApplicantFound(a);
    } catch (err) {
      if (err?.response?.status === 404) {
        alert(
          "No applicant found for this ID.\n\nPlease go to the Applicant section first, fill the Applicant form, and register before proceeding."
        );
      } else {
        console.error(err);
        alert("Failed to retrieve applicant. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">Id Type</label>
              <input
                type="text"
                name="idType"
                value={personalData.idType}
                onChange={handleChange}
                className="px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">Id No</label>
              <div className="flex">
                <input
                  type="text"
                  name="idNo"
                  value={personalData.idNo}
                  onChange={handleChange}
                  className="bpx-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  style={{ border: "1px solid #ccc" }}
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  style={{ backgroundColor: "#7c0000" }}
                  className="px-4 py-2 ml-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none hover:shadow-md focus:outline-none disabled:opacity-60"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </div>

          {/* Names */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">First Name (Initials)</label>
              <input
                type="text"
                name="fname"
                value={personalData.fname}
                disabled
                className=" px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">Last Name</label>
              <input
                type="text"
                name="lname"
                value={personalData.lname}
                disabled
                className=" px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                value={personalData.streetAddress}
                disabled
                className="px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">Suburb</label>
              <input
                type="text"
                name="suburb"
                value={personalData.suburb}
                disabled
                className=" px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">City</label>
              <input
                type="text"
                name="city"
                value={personalData.city}
                disabled
                className=" px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={personalData.postalCode}
                disabled
                className=" px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">Telephone No</label>
              <input
                type="text"
                name="telephoneNo"
                value={personalData.telephoneNo}
                disabled
                className=" px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">Mobile No</label>
              <input
                type="text"
                name="mobileNo"
                value={personalData.mobileNo}
                disabled
                className=" px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">Email</label>
              <input
                type="email"
                name="email"
                value={personalData.email}
                disabled
                className=" px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">Preferred Language</label>
              <input
                type="text"
                name="preferredLanguage"
                value={personalData.preferredLanguage}
                disabled
                className=" px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">CEB Employee</label>
              <input
                type="text"
                name="cebEmployee"
                value={
                  personalData.cebEmployee === "Y" || personalData.cebEmployee === "1"
                    ? "Yes"
                    : personalData.cebEmployee === "N" || personalData.cebEmployee === "0"
                    ? "No"
                    : ""
                }
                disabled
                className=" px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
