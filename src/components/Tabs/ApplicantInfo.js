import { useState } from "react";
// import FileUpload from "./FileUpload";

const nicRegex = /^(\d{9}[Vv]|\d{12})$/; // Validates both old and new NIC formats

const ApplicantInfo = ({
  applicant = {},
  onInputChange,
  onSearch,
  handleSearch,
  isModify,
  data = {},
  appData = {},
  setAppData = () => {},
}) => {
  //const [appData, setAppData] = useState({});
  const [nicError, setNicError] = useState(""); // State to handle error messages
  // const [loading, setLoading] = useState(false);
  const [loading] = useState(false); // To show loading state during API call

  // Now safely access applicant.idNo with a fallback
  // const idNo = applicant?.idNo || "";

  const handleChange = (e) => {
    console.log("Handling change for:", e.target.name);
    const { name, value } = e.target;
    // const newData = { ...appData, [name]: value };
    //setAppData(newData); // Ensure this is a valid function
    onInputChange({ [name]: value });

    // Validate NIC number
    if (name === "idNo") {
      if (!nicRegex.test(value)) {
        setNicError("Invalid NIC number. Use 9 digits with v or 12 digits.");
      } else {
        setNicError(""); // Clear error if valid
      }
    }

    // Make sure appData is defined before spreading it
    const newData = { ...(appData || {}), [name]: value };
    console.log("New Data:", newData);

    // Only call setAppData if it's a function
    if (typeof setAppData === "function") {
      setAppData(newData);
    }

    // Call onInputChange with the updated field
    if (typeof onInputChange === "function") {
      onInputChange({ [name]: value });
    }
  };

  return (
    <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
      <form>
        {/* <div className="block mb-3 ml-3 font-bold text-black text-m">Applicant Information</div> */}

        {/* //new */}
        <div className="flex flex-wrap ">
          <div className="flex"></div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">ID Type</label>
              <div className="flex gap-4 mt-2">
                <label className="mr-4 text-sm">
                  <input
                    type="radio"
                    name="idType"
                    value="NIC"
                    defaultChecked
                    //checked={appData.idType === "NIC"}
                    className="mr-1"
                    onChange={handleChange}
                  />
                  NIC
                </label>
                {/* <label className="mr-3">
                  <input type="radio" name="idType" value="PAS"
                    //checked={appData.idType === "PAS"}
                    onChange={handleChange}
                    className="form-radio accent-blue-600" />
                  Passport
                </label> */}
                <label className="text-sm">
                  <input
                    type="radio"
                    name="idType"
                    value="BRN"
                    // checked={appData.idType === "BRN"}
                    className="mr-1"
                    onChange={handleChange}
                  />
                  Business Registration Number
                </label>
              </div>
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-md text-black"
                htmlFor="grid-password"
              >
                ID Number
              </label>

              <div className="flex">
                <input
                  type="text"
                  name="idNo"
                  value={appData && appData.idNo}
                  onChange={handleChange}
                  className={`px-3 h-0.5  placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                    nicError ? "border-red-500" : ""
                  }`}
                  placeholder="NIC No"

                  style={{border: "1px solid #ccc"}}
                />
                {/* 
//{isModify && ( */}
                <button
                  className="px-4 ml-2 text-sm text-white rounded bg-lightBlue-500"
                  style={{
                    backgroundColor: "#7c0000",
                  }}
                  type="button"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
                {/* //)} */}
              </div>
              {nicError && (
                <p className="mt-1 text-xs text-red-500">{nicError}</p>
              )}
            </div>
          </div>

         

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-md text-black"
                htmlFor="grid-password"
              >
                First Name (Initials)/Company Name/Requested By
              </label>
              <input
                type="text"
                name="firstName"
                value={appData?.firstName || ""}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                style={{border: "1px solid #ccc"}}

                placeholder="Enter First Name"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-md text-black"
                htmlFor="grid-password"
              >
                Last Name/Company Type
              </label>
              <input
                type="text"
                name="lastName"
                value={appData.lastName}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{border: "1px solid #ccc"}}
                placeholder="Enter Last Name"
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-12/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-md text-black"
                htmlFor="grid-password"
              >
                Full Name/Requested By/Cost Center
              </label>
              <input
                type="text"
                name="fullName"
                value={appData.fullName}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{border: "1px solid #ccc"}}
                placeholder="Enter Full Name"
              />
            </div>
          </div>

          {/* personal/corporate */}
          <div className="w-full px-4 lg:w-12/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">
                Personal/Corporate
              </label>
              <select
                name="personalCorporate"
                // value={appData.personalCorporate}
                //value={appData.personalCorporate || ""}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                style={{border: "1px solid #ccc"}}
              >
                <option value="Per">Personal</option>
                <option value="Cop">Corporate</option>
              </select>
            </div>
          </div>
          {/* raw 2 */}

          {/* raw 2 */}

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">
                CEB Employee
              </label>
              <div className="flex space-x-4 ">
                <label className="mr-4 text-sm">
                  <input
                    type="radio"
                    name="cebEmployee"
                    value="y"
                    className="mr-1"
                    defaultChecked
                    //  checked={appData.cebEmployee === "yes"}
                    onChange={handleChange}

                    
                  />{" "}
                  Yes
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="cebEmployee"
                    value="n"
                    className="mr-1"
                    //   checked={appData.cebEmployee === "no"}
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">
                Preferred Language
              </label>
              <div className="flex space-x-4">
                <label className="mr-4 text-sm">
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="SN"
                    className="mr-1"
                    defaultChecked
                    //   checked={appData.preferredLanguage === "SN"}
                    onChange={handleChange}
                  />{" "}
                  Sinhala
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="EN"
                    className="mr-1"
                    //  checked={appData.preferredLanguage === "EN"}
                    onChange={handleChange}
                  />{" "}
                  English
                </label>
              </div>
            </div>
          </div>
          {/* end */}
        </div>

        {/* test */}
      </form>
    </div>
  );
};

export default ApplicantInfo;
