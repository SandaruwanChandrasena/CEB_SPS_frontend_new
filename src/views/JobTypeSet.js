import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export default function JobTypeSet() {
  const history = useHistory();
  const [jobTypes, setJobTypes] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("");
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/api/application/type`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("user:admin123"),
      },
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setJobTypes(data);
        console.log("Fetched job types:", data);
      })
      .catch((err) => {
        console.error("Error fetching job types:", err);
      });
  }, [baseUrl]); 

  const handleNext = () => {
    if (selectedJobType) {
      console.log("Selected job type:", selectedJobType);
      history.push("/applicant");
    }
  };

  return (
    <>
      <main>
        <section
          className="relative w-full h-full min-h-screen py-4"
          style={{ height: "100vh" }}
        >
          <div
            className="absolute top-0 w-full h-full bg-white bg-no-repeat bg-full"
            // style={{
            //   backgroundImage:
            //     "linear-gradient(to bottom, #fcf577, #f3ce56, #e7a73c, #d8802a, #ba3e30, #a8253c, #901145, #2f2d4e, #1e293b, #1e293b, #1e293b, #1e293b)",
            // }}
          ></div>
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <div className="flex">
                <label
                  className="block mb-2 text-sm font-bold text-blueGray-800"
                  htmlFor="grid-password"
                >
                  Select Job Type
                </label>
                {!selectedJobType && (
                  <p className="ml-2 text-xs text-red-500">
                    * Job type is required
                  </p>
                )}
              </div>
              <div className="relative flex w-full mb-3">
                <select
                  name="jobtype"
                  id="jobtype"
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-full px-3 py-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  defaultValue=""
                >
                  <option value="" disabled>
                    --Please Select--
                  </option>

                  {jobTypes.map((type) => (
                    <option key={type.apptype} value={type.apptype}>
                      {type.description}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleNext}
                  disabled={!selectedJobType}
                  style={{backgroundColor:`${
                    selectedJobType
                      ? "#7c0000"	
                      : "#b23200"
                  }`}}
                  className={"ml-2 text-white active:bg-blueGray-600 font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
