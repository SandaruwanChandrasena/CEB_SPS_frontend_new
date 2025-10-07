// src/components/Tabs/ApplicantInfo.jsx
import { useState } from "react";

const nicRegex = /^(\d{9}[Vv]|\d{12})$/;

const ApplicantInfo = ({
  applicant = {},
  onInputChange,
  handleSearch,
  isModify,
  data = {},
  appData = {},
  setAppData = () => {},
  loading = false,
  searchError = "",
  idLocked = false,        // <-- NEW: lock flag from parent
  onResetId = () => {},    // <-- NEW: allow unlock
}) => {
  const [nicError, setNicError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if ID is locked, ignore typing in idNo (readOnly is also set, but this is extra safety)
    if (idLocked && name === "idNo") return;

    if (name === "idNo") {
      const trimmed = value.trim();
      if (!nicRegex.test(trimmed)) setNicError("Invalid NIC number. Use 9 digits with V/v or 12 digits.");
      else setNicError("");
    }

    const patch = { [name]: value };
    typeof setAppData === "function" && setAppData((prev) => ({ ...(prev || {}), ...patch }));
    typeof onInputChange === "function" && onInputChange(patch);
  };

  const inputBaseClass =
    "px-3 h-0.5 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150";

  const readOnlyStyle = idLocked
    ? { backgroundColor: "#f1f5f9", cursor: "not-allowed", border: "1px solid #cbd5e1" }
    : { border: "1px solid #ccc" };

  return (
    <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
      <form>
        <div className="flex flex-wrap ">
          {/* ID Type */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">ID Type</label>
              <div className="flex gap-4 mt-2">
                <label className="mr-4 text-sm">
                  <input
                    type="radio"
                    name="idType"
                    value="NIC"
                    checked={(appData?.idType || "NIC") === "NIC"}
                    className="mr-1"
                    onChange={handleChange}
                    disabled={idLocked}    // <-- lock type too
                  />
                  NIC
                </label>

                <label className="text-sm">
                  <input
                    type="radio"
                    name="idType"
                    value="BRN"
                    checked={(appData?.idType || "NIC") === "BRN"}
                    className="mr-1"
                    onChange={handleChange}
                    disabled={idLocked}    // <-- lock type too
                  />
                  Business Registration Number
                </label>
              </div>
            </div>
          </div>

          {/* ID Number + Search / Change ID */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">ID Number</label>

              <div className="flex">
                <input
                  type="text"
                  name="idNo"
                  value={appData?.idNo || ""}
                  onChange={handleChange}
                  readOnly={idLocked}             // <-- make read-only after search
                  className={`${inputBaseClass} ${nicError ? "border-red-500" : ""}`}
                  placeholder="NIC No"
                  style={readOnlyStyle}
                />

                {!idLocked ? (
                  <button
                    className="px-4 ml-2 text-sm text-white rounded"
                    style={{ backgroundColor: "#7c0000" }}
                    type="button"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? "Searching..." : "Search"}
                  </button>
                ) : (
                  <button
                    className="px-4 ml-2 text-sm text-white rounded"
                    style={{ backgroundColor: "#334155" }}
                    type="button"
                    onClick={onResetId}
                    title="Change ID"
                  >
                    Change ID
                  </button>
                )}
              </div>

              {nicError && <p className="mt-1 text-xs text-red-500">{nicError}</p>}
              {searchError && !nicError && (
                <p className="mt-1 text-xs text-red-600">{searchError}</p>
              )}
            </div>
          </div>

          {/* First Name */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">
                First Name (Initials)/Company Name/Requested By
              </label>
              <input
                type="text"
                name="firstName"
                value={appData?.firstName || ""}
                onChange={handleChange}
                className={`${inputBaseClass}`}
                style={{ border: "1px solid #ccc" }}
                placeholder="Enter First Name"
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">Last Name/Company Type</label>
              <input
                type="text"
                name="lastName"
                value={appData?.lastName || ""}
                onChange={handleChange}
                className={`${inputBaseClass}`}
                style={{ border: "1px solid #ccc" }}
                placeholder="Enter Last Name"
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="w-full px-4 lg:w-12/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">
                Full Name/Requested By/Cost Center
              </label>
              <input
                type="text"
                name="fullName"
                value={appData?.fullName || ""}
                onChange={handleChange}
                className={`${inputBaseClass}`}
                style={{ border: "1px solid #ccc" }}
                placeholder="Enter Full Name"
              />
            </div>
          </div>

          {/* Personal/Corporate */}
          <div className="w-full px-4 lg:w-12/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">Personal/Corporate</label>
              <select
                name="personalCorporate"
                value={appData?.personalCorporate || "Per"}
                onChange={handleChange}
                className={`${inputBaseClass}`}
                style={{ border: "1px solid #ccc" }}
              >
                <option value="Per">Personal</option>
                <option value="Cop">Corporate</option>
              </select>
            </div>
          </div>

          {/* CEB Employee */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">CEB Employee</label>
              <div className="flex space-x-4 ">
                <label className="mr-4 text-sm">
                  <input
                    type="radio"
                    name="cebEmployee"
                    value="y"
                    checked={(appData?.cebEmployee || "y") === "y"}
                    className="mr-1"
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="cebEmployee"
                    value="n"
                    checked={(appData?.cebEmployee || "y") === "n"}
                    className="mr-1"
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Preferred Language */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">Preferred Language</label>
              <div className="flex space-x-4">
                <label className="mr-4 text-sm">
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="SN"
                    checked={(appData?.preferredLanguage || "SN") === "SN"}
                    className="mr-1"
                    onChange={handleChange}
                  />{" "}
                  Sinhala
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="EN"
                    checked={(appData?.preferredLanguage || "SN") === "EN"}
                    className="mr-1"
                    onChange={handleChange}
                  />{" "}
                  English
                </label>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default ApplicantInfo;
