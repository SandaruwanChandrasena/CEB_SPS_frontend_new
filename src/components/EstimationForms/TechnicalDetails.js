const TechnicalDetails = ({ formData, handleChange }) => {
  return (
    <form>
      <div className="flex flex-wrap mt-2">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <label className=" text-blueGray-600 text-sm mb-2">Demand</label>
            <input
              type="text"
              name="demand"
              value={formData.demand}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            />
          </div>
        </div>

        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <label className=" text-blueGray-600 text-sm mb-2">
              MV Line Type
            </label>
            <select
              name="mvlinetype"
              value={formData.mvlinetype}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            >
              <option value="MV Line 33kV Single Circuit 7/4.09mm RACOON">
                MV Line 33kV Single Circuit 7/4.09mm RACOON
              </option>
              <option value="MV Line - OTHER">MV Line - OTHER</option>
            </select>
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              Fund Source
            </label>
            <input
              type="text"
              name="fundSource"
              value={formData.fundSource}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              SIN No
            </label>
            <input
              type="text"
              name="SinNo"
              value={formData.SinNo}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              Existing Capacity(kVA)
            </label>
            <input
              type="text"
              name="ExistingCapacity"
              value={formData.ExistingCapacity}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              New Capacity(kVA)
            </label>
            <input
              type="text"
              name="NewCapacity"
              value={formData.NewCapacity}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              Voltage Level
            </label>
            <input
              type="text"
              name="VoltageLevel"
              value={formData.VoltageLevel}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              Line Length of the Customer Premises(m) (Maximum values : 100m for
              95kVA and 200m for 70kVA)
            </label>
            <input
              type="text"
              name="LineLengthCustomerPremises"
              value={formData.LineLengthCustomerPremises}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <label className="block text-blueGray-600 text-sm mb-2">
              Line Length of MV Line Outside the Customer Premises(km)
            </label>
            <input
              type="text"
              name="LineLengthMVLineOutsideCustomerPremises"
              value={formData.LineLengthMVLineOutsideCustomerPremises}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default TechnicalDetails;
