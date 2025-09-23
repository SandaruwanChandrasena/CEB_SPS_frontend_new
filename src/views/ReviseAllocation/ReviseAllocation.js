import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
import Sidebar from "components/Sidebar/Sidebar";
import Schedule from "components/Tabs/Schedule";
import React, { useEffect, useState } from "react";

function ReviseAllocation() {
  // const [isModify, setIsModify] = useState(false);
  const today = new Date().toLocaleDateString("en-GB");
  const [rows, setRows] = useState([]);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const deptId = sessionStorage.getItem("deptId");

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/spestedycon/dept/${deptId}`,
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

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
          console.error("Non-JSON response:", data);
          return;
        }

        if (response.ok) {
          setRows(data);
        } else {
          console.error("Fetch failed:", data);
        }
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTableData();
  }, [baseUrl, deptId]);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        {/* <div className="pt-24 bg-lightBlue-600">
            </div> */}
        <HeaderStatsWithoutCards />
        <div className="relative w-full h-screen px-4 mx-auto -m-24 md:px-10">
          <div className="container mx-auto rounded-lg">
            <div className="flex justify-center px-4 mx-48 mt-5 mb-5 rounded-lg md:px-10 lg:px-20">
              <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
                {/* Content */}
                <div className="p-6 mt-4 rounded-lg bg-blueGray-100">
                  <div className="flex flex-wrap py-2">
                    <div className="w-full px-4 lg:w-6/12">
                      <div className="relative w-full mb-3">
                        <label
                          className="block mb-2 text-sm text-blueGray-600"
                          htmlFor="grid-password"
                        >
                          Today
                        </label>
                        <div className="flex ">
                          <input
                            value={today}
                            type="text"
                            dissabled
                            name="today"
                            className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-4 lg:w-6/12">
                      <div className="relative w-full mb-3">
                        <label
                          className="block mb-2 text-sm text-blueGray-600"
                          htmlFor="grid-password"
                        >
                          Selected Date
                        </label>
                        <input
                          type="date"
                          name="selecteddate"
                          placeholder="DD/MM/YYYY"
                          className="w-full px-3 py-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center px-12 mt-4 mb-2 ml-2">
                  <h3 className="text-sm font-bold text-blueGray-700">
                    Diary Schedules
                  </h3>
                </div>

                <div className="block w-full mt-2 overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 mr-4 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                        >
                          Check
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                        >
                          ID
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                        >
                          Application No
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                        >
                          Allocated By
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                        >
                          Allocated To
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                        >
                          Description
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                        >
                          Cost Center
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                        >
                          Appt Type
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm border rounded text-blueGray-600">
                            <input type="checkbox" />
                          </td>
                          <td className="px-4 py-2 text-sm border rounded text-blueGray-600">
                            {item.id?.appointmentId}
                          </td>
                          <td className="px-4 py-2 text-sm border rounded text-blueGray-600">
                            {item.referenceNo}
                          </td>
                          <td className="px-4 py-2 text-sm border rounded text-blueGray-600">
                            {item.allocatedBy}
                          </td>
                          <td className="px-4 py-2 text-sm border rounded text-blueGray-600">
                            {item.allocatedTo}
                          </td>
                          <td className="px-4 py-2 text-sm border rounded text-blueGray-600">
                            {item.description || "-"}
                          </td>
                          <td className="px-4 py-2 text-sm border rounded text-blueGray-600">
                            {item.id?.deptId}
                          </td>
                          <td className="px-4 py-2 text-sm border rounded text-blueGray-600">
                            {item.appoinmentType}
                          </td>
                          <td className="px-4 py-2 text-sm border rounded text-blueGray-600">{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center px-12 mt-4 mb-2 ml-2">
                  <Schedule isModify={false} />
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between px-12 mt-2 mb-4">
                  <div>
                    <button
                      style={{ backgroundColor: "#7c0000" }}
                      className="px-6 py-2 ml-2 mr-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
                    >
                      Edit
                    </button>
                  </div>
                  <div>
                    <button className="px-6 py-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 active:bg-emerald-600 hover:shadow-md focus:outline-none">
                      Add New
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviseAllocation;
