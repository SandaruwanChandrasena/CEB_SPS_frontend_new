import React, { useState, useEffect } from "react";

const PersonalDetails = ({ onInputChange, data }) => {
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

  // e.g. http://<nginx>/SPS (no trailing slash)
  const baseUrl =
    process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "") || "";

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

      const url = `${baseUrl}/api/applicants/search?idNo=${encodeURIComponent(
        personalData.idNo.trim()
      )}`;

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      // If applicant is not found, show the message and stop.
      if (res.status === 404) {
        alert(
          "No applicant found for this ID.\n\nPlease go to the Applicant section first, fill the Applicant form, and register before proceeding."
        );
        return;
      }

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `HTTP ${res.status}`);
      }

      const a = await res.json(); // ApplicantDTO

      // Map ApplicantDTO -> our local state keys
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
        cebEmployee:
          a.cebEmployee == null ? "" : String(a.cebEmployee).trim(),
      };

      setPersonalData((prev) => ({ ...prev, ...mapped }));
      onInputChange({ ...personalData, ...mapped });
    } catch (err) {
      console.error(err);
      alert("Failed to retrieve applicant. Please try again later.");
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
              <label className="block mb-2 text-blueGray-600 text-md">
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
              <label className="block mb-2 text-blueGray-600 text-md">
                Id No
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="idNo"
                  value={personalData.idNo}
                  onChange={handleChange}
                  className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  style={{ backgroundColor: "#7c0000" }}
                  className="px-4 py-2 ml-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-lightBlue-600 hover:shadow-md focus:outline-none disabled:opacity-60"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">
                First Name (Initials)
              </label>
              <input
                type="text"
                name="fname"
                value={personalData.fname}
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                value={personalData.lname}
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Address block */}
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={personalData.streetAddress}
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">
                Suburb
              </label>
              <input
                type="text"
                name="suburb"
                value={personalData.suburb}
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">
                City
              </label>
              <input
                type="text"
                name="city"
                value={personalData.city}
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-3/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={personalData.postalCode}
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Contacts & flags */}
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">
                Telephone No
              </label>
              <input
                type="text"
                name="telephoneNo"
                value={personalData.telephoneNo}
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">
                Mobile No
              </label>
              <input
                type="text"
                name="mobileNo"
                value={personalData.mobileNo}
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={personalData.email}
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">
                Preferred Language
              </label>
              <input
                type="text"
                name="preferredLanguage"
                value={personalData.preferredLanguage}
                disabled
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-blueGray-600 text-md">
                CEB Employee
              </label>
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
