import React from "react";

function CardEstimatePage2({ formData, onChange, errors, onBack, onNext, isEditMode }) {
  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="text-blueGray-600 text-sm  mb-2"
                htmlFor="catCd"
              >
                Category Code
              </label>
              <select
                id="catCd"
                className="border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full"
                value={formData.catCd || ""}
                onChange={onChange}
              >
                <option value="">--Select--</option>
                <option value="CAP-HT-33KV">CAP-HT-33KV</option>
                <option value="CAP-HT-35KV">CAP-HT-35KV</option>
                <option value="CAP-HT-43KV">CAP-HT-43KV</option>
              </select>
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="text-blueGray-600 text-sm  mb-2"
                htmlFor="stdCost"
              >
                Standard Cost
              </label>
              <input
                type="number"
                id="stdCost"
                className={`border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full ${
                  errors.stdCost ? "border-red-500" : ""
                }`}
                value={formData.stdCost || ""}
                onChange={onChange}
                placeholder="Enter Standard Cost"
                required
              />
              {errors.stdCost && <p className="text-red-500 text-xs mt-1">{errors.stdCost}</p>}
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="text-blueGray-600 text-sm mb-2"
                htmlFor="omsRefNo"
              >
                OMS Reference No
              </label>
              <select
                id="omsRefNo"
                className="border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full"
                value={formData.omsRefNo || ""}
                onChange={onChange}
              >
                <option value="">--Select--</option>
                <option value="REF1">REF1</option>
                <option value="REF2">REF2</option>
              </select>
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="text-blueGray-600 text-sm  mb-2"
                htmlFor="fundSource"
              >
                Fund Source
              </label>
              <select
                id="fundSource"
                className="border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full"
                value={formData.fundSource || ""}
                onChange={onChange}
              >
                <option value="">--Select--</option>
                <option value="CP">CP</option>
                <option value="GOV">GOV</option>
              </select>
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="text-blueGray-600 text-sm  mb-2"
                htmlFor="fundId"
              >
                Fund ID
              </label>
              <select
                id="fundId"
                className="border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full"
                value={formData.fundId || ""}
                onChange={onChange}
              >
                <option value="">--Select--</option>
                <option value="CP">CP</option>
                <option value="GOV1">GOV1</option>
              </select>
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="text-blueGray-600 text-sm  mb-2"
                htmlFor="pivDate"
              >
                PIV Date
              </label>
              <input
                type="date"
                id="pivDate"
                className={`border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full ${
                  errors.pivDate ? "border-red-500" : ""
                }`}
                value={formData.pivDate || ""}
                onChange={onChange}
                required
              />
              {errors.pivDate && <p className="text-red-500 text-xs mt-1">{errors.pivDate}</p>}
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="text-blueGray-600 text-sm  mb-2"
                htmlFor="pivNumber"
              >
                PIV Number
              </label>
              <input
                type="text"
                id="pivNumber"
                className={`border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full ${
                  errors.pivNumber ? "border-red-500" : ""
                }`}
                value={formData.pivNumber || ""}
                onChange={onChange}
                placeholder="Enter PIV Number"
                required
              />
              {errors.pivNumber && <p className="text-red-500 text-xs mt-1">{errors.pivNumber}</p>}
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="text-blueGray-600 text-sm  mb-2"
                htmlFor="pivAmount"
              >
                PIV Amount
              </label>
              <input
                type="number"
                id="pivAmount"
                className={`border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full ${
                  errors.pivAmount ? "border-red-500" : ""
                }`}
                value={formData.pivAmount || ""}
                onChange={onChange}
                placeholder="Enter PIV Amount"
                required
              />
              {errors.pivAmount && <p className="text-red-500 text-xs mt-1">{errors.pivAmount}</p>}
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="text-blueGray-600 text-sm  mb-2"
                htmlFor="custContrib"
              >
                Customer Contribution
              </label>
              <input
                type="number"
                id="custContrib"
                className={`border-0 px-3 h-0.5 bg-gray-300 z-0 rounded shadow focus:outline-none focus:ring w-full ${
                  errors.custContrib ? "border-red-500" : ""
                }`}
                value={formData.custContrib || ""}
                onChange={onChange}
                placeholder="Enter Customer Contribution"
              />
              {errors.custContrib && <p className="text-red-500 text-xs mt-1">{errors.custContrib}</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardEstimatePage2;

