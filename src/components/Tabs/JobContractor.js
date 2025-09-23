import { useState, useEffect } from "react";

const JobContractor = ({ onInputChange, isModify, data }) => {
  const [vat, setVat] = useState("0.00");
  const [nbt, setNbt] = useState("0.00");

  const [contractorData, setcontractorData] = useState({
    contractorId: "",
    name: "",
    address: "",
    deptId: "",
  });

  const handleVatChange = (e) => {
    const inputValue = parseFloat(e.target.value.replace(/[^0-9.]/g, "")); // Remove non-numeric characters
    if (!isNaN(inputValue)) {
      setVat(inputValue.toFixed(2));
    } else {
      setVat("0.00");
    }
  };

  const handleNbtChange = (e) => {
    const inputValue = parseFloat(e.target.value.replace(/[^0-9.]/g, "")); // Remove non-numeric characters
    if (!isNaN(inputValue)) {
      setNbt(inputValue.toFixed(2));
    } else {
      setNbt("0.00");
    }
  };

  // useEffect(() => {
  //   // Fetch department ID from the API
  //   const fetchDepartmentId = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8081/api/v1/sessioninfo",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Basic " + btoa("user:admin123"),
  //           },
  //           credentials: "include",
  //         }
  //       );

  //       if (response.ok) {
  //         const sessionData = await response.json();
  //         console.log("Session Data:", sessionData); // Log the response to verify structure
  //         setDeptId(sessionData.deptId || "");
  //         console.log(deptId); // Set department ID
  //       } else {
  //         console.error("Failed to fetch session info");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching session info:", error);
  //     }
  //   };

  //   fetchDepartmentId();
  // }, []);

  const deptId = sessionStorage.getItem("deptId");

  useEffect(() => {
    setcontractorData((prevData) => ({
      ...prevData,
      deptId,
    }));
  }, [deptId]);

  useEffect(() => {
    if (data) {
      setcontractorData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...contractorData, [name]: value };
    setcontractorData(newData);
    onInputChange(newData);
  };

  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Code
              </label>
              <div className="flex ">
                <input
                  type="text"
                  name="contractorId"
                  value={contractorData.contractorId}
                  onChange={handleChange}
                  className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  //placeholder="430.00/ABS/25/xxxx"
                />
                {isModify && (
                  <button
                  style={{backgroundColor:"#7c0000"}}
                    className="ml-2 text-white active:bg-lightBlue-600 text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    //   onClick={handleSearch}
                  >
                    Search
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Contractor Name
              </label>
              <input
                type="text"
                name="name"
                value={contractorData.name}
                onChange={handleChange}
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                name="address"
                value={contractorData.address}
                onChange={handleChange}
                rows="1"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter Address"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Department ID
              </label>
              <input
                type="text"
                name="deptId"
                value={deptId}
                disabled
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
                Bond Number
              </label>
              <input
                type="text"
                name="bondnumber"
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
                Bond Amount
              </label>
              <input
                type="text"
                name="bondamount"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Tender Amount
              </label>
              <input
                type="text"
                name="tenderamount"
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
                Start Date
              </label>
              <input
                type="date"
                name="startdate"
                className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                End Date
              </label>
              <input
                type="date"
                name="enddate"
                className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Performance Amount
              </label>
              <input
                type="text"
                name="perforamount"
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
                VAT (%)
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-sm">Rs.</span>{" "}
                <input
                  type="text"
                  name="vat"
                  value={vat}
                  onChange={handleVatChange}
                  className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                NBT (%)
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-sm">Rs.</span>{" "}
                <input
                  type="text"
                  name="nbt"
                  value={nbt}
                  onChange={handleNbtChange}
                  className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobContractor;
