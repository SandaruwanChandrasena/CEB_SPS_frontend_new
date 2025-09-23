import React, { useState } from "react";

export default function Applicant() {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="flex mt-4 border-b">
          <button
            className={`px-4 py-2 text-sm bg-lightBlue-500 text-white font-bold ${activeTab === "user" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("user")}
          >
            User Information
          </button>
          <button
            className={`px-4 py-2 text-sm bg-lightBlue-500 text-white ml-1 font-bold ${activeTab === "contact" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("contact")}
          >
            Contact Information
          </button>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        {activeTab === "user" && (
          <div>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">ID Type</label>
                <div className="flex space-x-4">
                  <label><input type="radio" name="idType" value="NIC" /> NIC</label>
                  <label><input type="radio" name="idType" value="Passport" /> Passport</label>
                  <label><input type="radio" name="idType" value="BusRegNo" /> Bus Reg No</label>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">ID No</label>
                <div className="flex">
                  <input type="text" className="border-0 px-3 py-3 rounded shadow w-full" placeholder="NIC No" />
                  <button className="bg-darkBlue-500 text-white px-4 py-2 rounded ml-2">Search</button>
                </div>
              </div>
              <div className="w-full px-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Personal/Corporate</label>
                <select className="border-0 px-3 py-3 rounded shadow w-full">
                  <option>Personal</option>
                  <option>Corporate</option>
                </select>
              </div>
              <div className="w-full px-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Full Name/Requested By/Cost Center</label>
                <input type="text" className="border-0 px-3 py-3 rounded shadow w-full" placeholder="Enter Full Name/Requested By/Cost Center" />
              </div>
              <div className="w-full px-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">First Name (Initials)/Company Name/Requested By</label>
                <input type="text" className="border-0 px-3 py-3 rounded shadow w-full" placeholder="Enter First Name (Initials)/Company Name/Requested By" />
              </div>
              <div className="w-full px-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Last Name/Company Type</label>
                <input type="text" className="border-0 px-3 py-3 rounded shadow w-full" placeholder="Enter Last Name/Company Type" />
              </div>
              <div className="w-full px-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Preferred Language</label>
                <div className="flex space-x-4">
                  <label><input type="radio" name="language" value="Sinhala" /> Sinhala</label>
                  <label><input type="radio" name="language" value="English" /> English</label>
                </div>
              </div>
              <div className="w-full px-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">CEB Employee</label>
                <div className="flex space-x-4">
                  <label><input type="radio" name="employee" value="Yes" /> Yes</label>
                  <label><input type="radio" name="employee" value="No" /> No</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Contact Information</h6>
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Address</label>
                <input type="text" className="border-0 px-3 py-3 rounded shadow w-full" placeholder="Enter Address" />
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">City</label>
                <input type="text" className="border-0 px-3 py-3 rounded shadow w-full" placeholder="Enter City" />
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Country</label>
                <input type="text" className="border-0 px-3 py-3 rounded shadow w-full" placeholder="Enter Country" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
