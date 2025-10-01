import { useState } from "react";

//const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const phoneRegex =
  /^\+?([1-9]{1,3})?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})(?:\s*x(\d+))?$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ApplicantContact = ({ applicant = {}, onInputChange, contactData }) => {
  const [appData, setAppData] = useState({
    mobileNo: "",
    email: "",
    // land: "",
    streetAddress: "",
    suburb: "",
    telephoneNo: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...appData, [name]: value };
    setAppData(newData);
    onInputChange(newData);

    setErrors((prevErrors) => {
      let updatedErrors = { ...prevErrors };

      if (name === "mobileNo") {
        updatedErrors.mobileNo = phoneRegex.test(value.trim())
          ? ""
          : "Invalid phone number format";
      }

      if (name === "email") {
        updatedErrors.email = emailRegex.test(value.trim())
          ? ""
          : "Invalid email format";
      }

      return updatedErrors;
    });
  };

  return (
    <div className="flex-auto px-4 py-10 pt-1 lg:px-10">
      <form>
        {/* <div className="block mb-3 ml-3 font-bold text-blueGray-600 text-m">Applicant Contact Details</div> */}
        {/* <div className="flex flex-wrap"> */}
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-md text-blueGray-600"
                htmlFor="grid-password"
              >
                Mobile Number
                
              </label>
              <input
                type="text"
                name="mobileNo"
                value={appData.mobileNo}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter your mobile number"
                style={{border: "1px solid #ccc"}}
              />
              {errors.mobileNo && (
                <p className="mt-1 text-xs text-red-500">{errors.mobileNo}</p>
              )}
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-md text-blueGray-600"
                htmlFor="grid-password"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={appData.email}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter your email"
                style={{border: "1px solid #ccc"}}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-md text-blueGray-600"
                htmlFor="grid-password"
              >
                Land
              </label>
              <input
                type="text"
                name="telephoneNo"
                value={appData.telephoneNo}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter your Land number"
                style={{border: "1px solid #ccc"}}
              />
              {errors.telephoneNo && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.telephoneNo}
                </p>
              )}
            </div>
          </div>
          {/* </div> */}

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-md text-blueGray-600"
                htmlFor="grid-password"
              >
                Street Address
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                value={appData.streetAddress}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                style={{border: "1px solid #ccc"}}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-md text-blueGray-600"
                htmlFor="grid-password"
                
              >
                Suburb
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="suburb"
                value={appData.suburb}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                defaultValue="New York"
                style={{border: "1px solid #ccc"}}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-md text-blueGray-600"
                htmlFor="grid-password"
              >
                City
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="city"
                value={appData.city}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                defaultValue="United States"
                style={{border: "1px solid #ccc"}}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-md text-blueGray-600"
                htmlFor="grid-password"
              >
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={appData.postalCode}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                defaultValue="Postal Code"
                style={{border: "1px solid #ccc"}}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicantContact;
