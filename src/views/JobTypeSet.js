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
    <main>
      <section className="relative w-full h-full min-h-screen py-4 flex justify-center bg-white"
      style={{marginBottom: "100px", marginTop: "120px"}}
      >
        <div
          className="w-full px-4 lg:w-4/12 border rounded-lg shadow-lg m-4 lg:m-24"
          style={{
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="relative w-full mb-3 ">
            <div className="flex items-center">
              <label
                className="block mb-2 text-xl font-bold text-gray-800"
                htmlFor="jobtype"
                style={{ paddingBottom: "20px" }}
              >
                Select Job Type
              </label>
              {!selectedJobType && (
                <p
                  className="ml-2 text-xs text-red-500"
                  style={{ paddingBottom: "20px", fontSize: "12px" }}
                >
                  * Job type is required
                </p>
              )}
            </div>

            <div className="relative flex w-full mb-3 items-center">
              <select
                name="jobtype"
                id="jobtype"
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border border-gray-300 rounded shadow-md placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
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
                style={{
                  backgroundColor: selectedJobType ? "#991b1b" : "#991b1b", // red-800 hex
                  cursor: selectedJobType ? "pointer" : "not-allowed",
                  opacity: 1,
                }}
                className="ml-2 text-white font-bold text-sm px-4 py-3 rounded shadow-md hover:shadow-lg focus:outline-none transition-all duration-150"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
