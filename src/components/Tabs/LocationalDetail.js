import { useState, useEffect } from "react";

const LocationalDetails = ({ onInputChange, data }) => {
  const [locationalData, setLocationalData] = useState({
    streetAddress: "",
    suburb: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
      if (data) {
        setLocationalData(data);
      }
    }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...locationalData, [name]: value };
    setLocationalData(newData);
    onInputChange(newData);
  };

  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={locationalData.streetAddress}
                onChange={handleChange}
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Suburb
              </label>
              <input
                type="text"
                name="suburb"
                value={locationalData.suburb}
                onChange={handleChange}
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                value={locationalData.city}
                onChange={handleChange}
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Postal Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="postalCode"
                  value={locationalData.postalCode}
                  onChange={handleChange}
                  className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <button className="ml-3 bg-lightBlue-500 text-white active:bg-lightBlue-600 text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" style={{ backgroundColor: "#7c0000" }}>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                District
              </label>
              <div className="flex ">
                <input
                  type="text"
                  className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <select
                  name="district"
                  className="border-0 ml-2 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option value="G">G</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Devisional Sectrait
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                GS Division
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Electorate
              </label>
              <div className="flex ">
                <input
                  type="text"
                  className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <select
                  name="electorate"
                  className="border-0 ml-2 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option value="AN">AN</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                AGA Division
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                C S C
              </label>
              <div className="flex ">
                <input
                  type="text"
                  className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <select
                  name="csc"
                  className="border-0 ml-2 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option value="AB">AB</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-2">
              <label
                className="block text-blueGray-600 text-sm mb-1"
                htmlFor="grid-password"
              >
                Ownership
              </label>
              <div className="flex gap-4 mt-4">
                <label className="text-sm mr-4">
                  <input
                    type="radio"
                    name="ownership"
                    defaultChecked
                    value="owner"
                  />{" "}
                  Owner
                </label>
                <label className="text-sm mr-4">
                  <input type="radio" name="ownership" value="rent" /> Rent
                </label>
                <label className="text-sm">
                  <input type="radio" name="ownership" value="tenant" /> Tenant
                </label>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-2">
              <label
                className="block text-blueGray-600 text-sm mb-1"
                htmlFor="grid-password"
              >
                Occupy / Owner Certified
              </label>
              <div className="flex gap-4 mt-4">
                <label className="text-sm mr-4">
                  <input
                    type="radio"
                    name="ownercertify"
                    defaultChecked
                    value="Yes"
                  />{" "}
                  Yes
                </label>
                <label className="text-sm">
                  <input type="radio" name="ownercertify" value="No" /> No
                </label>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-2">
              <label
                className="block text-blueGray-600 text-sm mb-1"
                htmlFor="grid-password"
              >
                Is Government Place
              </label>
              <div className="flex gap-4 mt-4">
                <label className="text-sm mr-4">
                  <input
                    type="radio"
                    name="isgovern"
                    defaultChecked
                    value="Yes"
                  />{" "}
                  Yes
                </label>
                <label className="text-sm">
                  <input type="radio" name="isgovern" value="No" /> No
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LocationalDetails;
