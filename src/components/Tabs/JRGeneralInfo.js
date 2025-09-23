import { useState, useEffect } from "react";

const JRGeneralInfo = ({ onInputChange, isModify, data, handleSearch }) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [generalData, setgeneralData] = useState({
    pno: "",
    costcenter: "",
    warehouse: "",
    filereference: "",
    edate: "",
    ecategory: "",
    revisereason: "",
    rejectreason: "",
    description: "",
  });

  useEffect(() => {
    if (data) {
      setgeneralData(data);
    }
  }, [data]);

  const [projectNos, setProjectNos] = useState([]);
  const [selectedProjectNo, setSelectedProjectNo] = useState("");
  // const [estimateData, setEstimateData] = useState(null);
  const [setEstimateData] = useState(null);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/estimates/dropdowndata`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
            credentials: "include",
          }
        );

        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.indexOf("application/json") !== -1) {
          data = await response.json();
        } else {
          throw new Error("Invalid content type");
        }

        if (data.projectNos) {
          setProjectNos(data.projectNos);
        }
      } catch (error) {
        console.error("Fetch dropdown data error:", error);
      }
    };

    fetchDropdownData();
  }, [baseUrl]);

  // useEffect(() => {
  //   if (!selectedProjectNo) return;

  //   const fetchEstimateData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${baseUrl}/api/v1/estimate/byproject?projectNo=${selectedProjectNo}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Basic " + btoa("user:admin123"),
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       setEstimateData(data);
  //       console.log("Estimate data fetched:", data);
  //       if (data && data.length > 0) {
  //         const estimateItem = data[0];
  //         const updatedData = {
  //           ...generalData,
  //           pno: estimateItem.projectNo || selectedProjectNo,
  //           warehouse: estimateItem.warehouse || "",
  //           filereference: estimateItem.filereference || "",
  //           edate: estimateItem.etimateDt || "",
  //           ecategory: estimateItem.ecategory || "",
  //           revisereason: estimateItem.revReason || "",
  //           rejectreason: estimateItem.rejectReason || "",
  //           description: estimateItem.descr || ""
  //         };
  //         setgeneralData(updatedData);
  //         // Notify parent component of the changes
  //         onInputChange(updatedData);
  //       }
  //     } catch (error) {
  //       console.error("Estimate fetch error:", error);
  //     }
  //   };

  //   fetchEstimateData();
  // }, [selectedProjectNo]);

useEffect(() => {
  if (!selectedProjectNo) return;

  const fetchEstimateData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/api/v1/estimate/byproject?projectNo=${selectedProjectNo}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
        }
      );
      const data = await response.json();
      setEstimateData(data);
      console.log("Estimate data fetched:", data);
      if (data && data.length > 0) {
        const estimateItem = data[0];
        const updatedData = {
          pno: estimateItem.projectNo || selectedProjectNo,
          warehouse: estimateItem.warehouse || "",
          filereference: estimateItem.filereference || "",
          edate: estimateItem.etimateDt || "",
          ecategory: estimateItem.ecategory || "",
          revisereason: estimateItem.revReason || "",
          rejectreason: estimateItem.rejectReason || "",
          description: estimateItem.descr || "",
          costcenter: sessionStorage.getItem("deptId") || "",
        };
        setgeneralData(updatedData);
        onInputChange(updatedData);
      }
    } catch (error) {
      console.error("Estimate fetch error:", error);
    }
  };

  fetchEstimateData();
}, [selectedProjectNo, baseUrl, onInputChange, setEstimateData]);

  const costcenter = sessionStorage.getItem("deptId");

  useEffect(() => {
    setgeneralData((prevData) => ({
      ...prevData,
      costcenter: costcenter || "",
    }));
  }, [costcenter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...generalData, [name]: value };
    setgeneralData(newData);
    onInputChange(newData);
  };

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
                Project Number
              </label>
              <div className="flex ">
                <select
                  name="pno"
                  id="pno"
                  value={generalData.pno || selectedProjectNo}
                  onChange={(e) => setSelectedProjectNo(e.target.value)}
                  className="w-full px-3 py-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  defaultValue=""
                >
                  <option value="" disabled>
                    --Please Select--
                  </option>
                  {projectNos.map((projectNo) => (
                    <option key={projectNo} value={projectNo}>
                      {projectNo}
                    </option>
                  ))}
                </select>
                {isModify && (
                  <button
                    className="px-4 py-2 ml-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                    style={{ backgroundColor: "#7c0000" }}
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Cost Center
              </label>
              <input
                type="text"
                disabled
                name="costcenter"
                value={costcenter}
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
                Ware House
              </label>
              <select
                defaultValue=""
                name="warehouse"
                id="warehouse"
                value={generalData.warehouse}
                onChange={handleChange}
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
                File Reference
              </label>
              <input
                type="text"
                name="filereference"
                value={generalData.filereference}
                onChange={handleChange}
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
                Estimate Date
              </label>
              <input
                type="date"
                name="edate"
                value={generalData.edate}
                onChange={handleChange}
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
                Estimate Category
              </label>
              <select
                defaultValue=""
                id="ecategory"
                name="ecategory"
                value={generalData.ecategory}
                onChange={handleChange}
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
                Revise Reason
              </label>
              <textarea
                type="textarea"
                placeholder="Enter Reason"
                name="revisereason"
                value={generalData.revisereason}
                onChange={handleChange}
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
                Reject Reason
              </label>
              <textarea
                type="textarea"
                placeholder="Enter Reason"
                name="rejectreason"
                value={generalData.rejectreason}
                onChange={handleChange}
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
                Description
              </label>
              <textarea
                type="textarea"
                placeholder="Enter Description"
                name="description"
                value={generalData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JRGeneralInfo;
