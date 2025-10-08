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
  idLocked = false, // lock flag from parent
  errors = {},      // <-- receive errors
  firstErrorRef,    // <-- for optional scroll
}) => {
  const [nicError, setNicError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (idLocked && name === "idNo") return;
    if (name === "idNo") {
      const trimmed = value.trim();
      if (!nicRegex.test(trimmed))
        setNicError("Invalid NIC number. Use 9 digits with V/v or 12 digits.");
      else setNicError("");
    }
    const patch = { [name]: value };
    setAppData?.((prev) => ({ ...(prev || {}), ...patch }));
    onInputChange?.(patch);
  };

  const inputBaseClass =
    "px-3 h-0.5 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150";

  const readOnlyStyle = idLocked
    ? { backgroundColor: "#f1f5f9", cursor: "not-allowed", border: "1px solid #cbd5e1" }
    : { border: "1px solid #ccc" };

  const editableHint = idLocked ? "You can edit this field." : undefined;
  const lockedHint = "Locked after search.";
  const hintProps = (isEditable = true) => (isEditable && idLocked ? { title: editableHint } : {});

  const errorBorder = (name) => (errors[name] ? "border-red-500" : "");
  const errMsg = (name) =>
    errors[name] ? (
      <p className="mt-1 text-xs text-red-600" ref={!firstErrorRef?.current ? firstErrorRef : undefined}>
        {errors[name]}
      </p>
    ) : null;

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
                    disabled={idLocked}
                    title={idLocked ? lockedHint : undefined}
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
                    disabled={idLocked}
                    title={idLocked ? lockedHint : undefined}
                  />
                  Business Registration Number
                </label>
              </div>
              {errMsg("idType")}
            </div>
          </div>

          {/* ID Number + Search */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">ID Number</label>

              <div className="flex">
                <input
                  type="text"
                  name="idNo"
                  value={appData?.idNo || ""}
                  onChange={handleChange}
                  readOnly={idLocked}
                  className={`${inputBaseClass} ${errorBorder("idNo")} ${nicError ? "border-red-500" : ""}`}
                  placeholder="NIC No"
                  style={readOnlyStyle}
                  title={idLocked ? lockedHint : undefined}
                />

                {!idLocked && (
                  <button
                    className="px-4 ml-2 text-sm text-white rounded"
                    style={{ backgroundColor: "#7c0000" }}
                    type="button"
                    onClick={handleSearch}
                    disabled={loading}
                    title="Search by ID number"
                  >
                    {loading ? "Searching..." : "Search"}
                  </button>
                )}
              </div>

              {nicError && <p className="mt-1 text-xs text-red-600">{nicError}</p>}
              {!nicError && errMsg("idNo")}
              {searchError && !nicError && !errors.idNo && (
                <p className="mt-1 text-xs" style={{ color: "red" }}>
                  {searchError}
                </p>
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
                className={`${inputBaseClass} ${errorBorder("firstName")} hover:border-yellow-400`}
                style={{ border: "1px solid #ccc" }}
                placeholder="Enter First Name"
                {...hintProps(true)}
              />
              {errMsg("firstName")}
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
                className={`${inputBaseClass} ${errorBorder("lastName")} hover:border-yellow-400`}
                style={{ border: "1px solid #ccc" }}
                placeholder="Enter Last Name"
                {...hintProps(true)}
              />
              {errMsg("lastName")}
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
                className={`${inputBaseClass} ${errorBorder("fullName")} hover:border-yellow-400`}
                style={{ border: "1px solid #ccc" }}
                placeholder="Enter Full Name"
                {...hintProps(true)}
              />
              {errMsg("fullName")}
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
                className={`${inputBaseClass} ${errorBorder("personalCorporate")} hover:border-yellow-400`}
                style={{ border: "1px solid #ccc" }}
                {...hintProps(true)}
              >
                <option value="Per">Personal</option>
                <option value="Cop">Corporate</option>
              </select>
              {errMsg("personalCorporate")}
            </div>
          </div>

          {/* CEB Employee */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">CEB Employee</label>
              <div className="flex space-x-4 ">
                <label className="mr-4 text-sm" title={editableHint}>
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
                <label className="text-sm" title={editableHint}>
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
              {errMsg("cebEmployee")}
            </div>
          </div>

          {/* Preferred Language */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-black">Preferred Language</label>
              <div className="flex space-x-4">
                <label className="mr-4 text-sm" title={editableHint}>
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
                <label className="text-sm" title={editableHint}>
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
              {errMsg("preferredLanguage")}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicantInfo;
