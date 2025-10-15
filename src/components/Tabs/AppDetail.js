import { useState, useEffect } from "react";

const AppDetails = ({ onInputChange, data }) => {
  const [appData, setAppData] = useState({
    applicationId: "",
    deptId: "",          // CostCenter
    submitDate: "",      // yyyy-MM-dd
    applicationType: "BS",
    description: "",
    jobName: "",
    durationType: "",
    duration: "",
    isLoanApp: "N",
    preparedBy: "WEB",
    status: "N",
    area: "AREA - MAWANELLA",
  });

  useEffect(() => {
    if (data) setAppData((prev) => ({ ...prev, ...data }));
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let v = value;
    if (name === "duration" && v !== "") v = v.replace(/[^\d]/g, "");
    if (name === "isLoanApp" && type === "radio") v = value === "Yes" ? "Y" : "N";

    const next = { ...appData, [name]: v };
    setAppData(next);
    onInputChange(next);
  };

  return (
    <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-wrap">
          {/* Temporary ID */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                Temporary ID
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="applicationId"
                  value={appData.applicationId}
                  onChange={handleChange}
                  className="px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="430.00/ABS/25/xxxx"
                  style={{ border: "1px solid #ccc" }}
                />
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">Date</label>
              <input
                type="date"
                name="submitDate"
                value={appData.submitDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>

          {/* Area (kept, but not sent) */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">Area</label>
              <select
                name="area"
                value={appData.area}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                style={{ border: "1px solid #ccc" }}
              >
                <option value="AREA - MAWANELLA">Area - Mawanella</option>
                <option value="AREA - OTHER">Area - Other</option>
              </select>
            </div>
          </div>

          {/* CostCenter -> deptId */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                CostCenter
              </label>
              <input
                type="text"
                name="deptId"
                value={appData.deptId}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                placeholder="430.00"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
        </div>

        {/* Type + Found Source (kept UI; only type is sent) */}
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                Application Type
              </label>
              <select
                name="applicationType"
                value={appData.applicationType}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                style={{ border: "1px solid #ccc" }}
              >
                <option value="BS">BS</option>
                <option value="OT">OTHER</option>
              </select>
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                Found Source
              </label>
              <select
                name="foundSource"
                value={appData.foundSource || ""}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                style={{ border: "1px solid #ccc" }}
              >
                <option value="">Select</option>
                <option value="ADB">ADB</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
          </div>
        </div>

        {/* Representative + Description */}
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                Representative 1
              </label>
              <input
                type="text"
                name="rep1"
                value={appData.rep1 || ""}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={appData.description}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
        </div>

        {/* Consumer Ref + Job Name (kept; jobName not sent) */}
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                Consumer Reference
              </label>
              <input
                type="text"
                name="consumerRef"
                value={appData.consumerRef || ""}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                Job Name
              </label>
              <input
                type="text"
                name="jobName"
                value={appData.jobName}
                onChange={handleChange}
                className="border-1 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
        </div>

        {/* Nature of Supply + Years + duration */}
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                Nature of Supply
              </label>
              <div className="flex">
                <select
                  name="nature"
                  value={appData.nature || "permanent"}
                  onChange={handleChange}
                  className="mr-2 border-1 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  style={{ border: "1px solid #ccc" }}
                >
                  <option value="permanent">Permanent</option>
                  <option value="other">OTHER</option>
                </select>

                <select
                  name="durationType"
                  value={appData.durationType}
                  onChange={handleChange}
                  className="mr-2 border-1 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  style={{ border: "1px solid #ccc" }}
                >
                  <option value="">Select</option>
                  <option value="Years">Years</option>
                  <option value="Months">Months</option>
                </select>

                <input
                  type="text"
                  name="duration"
                  value={appData.duration}
                  onChange={handleChange}
                  className="border-1 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  style={{ border: "1px solid #ccc" }}
                  placeholder="e.g. 2"
                />
              </div>
            </div>
          </div>

          {/* Loan radio -> isLoanApp (Y/N) */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                Is Loan App
              </label>
              <div className="flex gap-4 mt-4">
                <label className="mr-4 text-sm">
                  <input
                    type="radio"
                    name="isLoanApp"
                    value="Yes"
                    checked={appData.isLoanApp === "Y"}
                    onChange={handleChange}
                  />{" "}
                  Yes - 75% Loan Scheme
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="isLoanApp"
                    value="No"
                    checked={appData.isLoanApp !== "Y"}
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppDetails;
