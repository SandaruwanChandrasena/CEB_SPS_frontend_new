const CostMeasurements = ({ formData, handleChange }) => {
  return (
    <form>
      <div className="flex flex-wrap mt-2">
      <div className="w-full lg:w-6/12 px-4">
      <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              Security Deposit
            </label>
            <input
              type="text"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>
        </div>

        <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              VAT
            </label>
            <input
              type="text"
              name="vat"
              value={formData.vat}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>
        </div>

        <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              NBT
            </label>
            <input
              type="text"
              name="nbt"
              value={formData.nbt}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>
        </div>

        <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              Loan Percentage
            </label>
            <input
              type="text"
              name="loanPercentage"
              value={formData.loanPercentage}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>
        </div>

        <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              Total Cost
            </label>
            <input
              type="text"
              name="totalCost"
              value={formData.totalCost}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>
        </div>

        {/* Repeat for other fields */}
      </div>
    </form>
  );
};

export default CostMeasurements;
