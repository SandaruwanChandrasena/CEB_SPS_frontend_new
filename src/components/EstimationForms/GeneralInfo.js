// import react from "react";

const generalinfo = ({
  formData,
  handleChange,
  editMode,
  onSearch,
  loadingSearch,
}) => {
  return (
    <form>
      <div className="flex flex-wrap">
        {/* application reference no */}
        <div className="w-full px-4 py-1 lg:w-6/12">
          <label className="mb-2 text-sm text-gray-600">
            application reference no
          </label>
          <div className="flex mt-2 space-x-2">
            <input
              type="text"
              name="appNo"
              value={formData.appNo || ""}
              onChange={handleChange}
              className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            />
            {editMode && (
              <button
                type="button"
                onClick={onSearch}
                disabled={loadingSearch}
                style={{ backgroundColor: "#7c0000" }}
                className="px-4 py-2 ml-2 text-sm text-white transition duration-150 rounded shadow hover:shadow-md disabled:opacity-50"
              >
                {loadingSearch ? "loading..." : "search"}
              </button>
            )}
          </div>
        </div>

        {/* name */}
        <div className="w-full px-4 py-2 lg:w-6/12">
          <label className="block mb-2 text-sm text-blueGray-600">name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          />
        </div>

        {/* address */}
        <div className="w-full px-4 py-2 lg:w-6/12">
          <label className="block mb-2 text-sm text-blueGray-600">
            address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          />
        </div>

        {/* job description */}
        <div className="w-full px-4 py-2 lg:w-6/12">
          <label className="block mb-2 text-sm text-blueGray-600">
            job description
          </label>
          <input
            type="text"
            name="jobDescription"
            value={formData.jobDescription || ""}
            onChange={handleChange}
            className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          />
        </div>

        {/* no of beneficiaries */}
        <div className="w-full px-4 py-2 lg:w-6/12">
          <label className="block mb-2 text-sm text-blueGray-600">
            no of beneficiaries
          </label>
          <input
            type="text"
            name="beneficiaries"
            value={formData.beneficiaries || ""}
            onChange={handleChange}
            className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          />
        </div>

        {/* power to supply */}
        <div className="w-full px-4 py-2 lg:w-6/12">
          <label className="block mb-2 text-sm text-blueGray-600">
            power to supply
          </label>
          <input
            type="text"
            name="powerSupply"
            value={formData.powerSupply || ""}
            onChange={handleChange}
            className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          />
        </div>

        {/* rejected reason */}
        <div className="w-full px-4 py-2 lg:w-6/12">
          <label className="block mb-2 text-sm text-blueGray-600">
            rejected reason
          </label>
          <input
            type="text"
            name="rejectedReason"
            value={formData.rejectedReason || ""}
            onChange={handleChange}
            className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          />
        </div>
      </div>
    </form>
  );
};

export default generalinfo;
