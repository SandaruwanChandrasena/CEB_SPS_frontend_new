// import { useState } from "react";
// import FileUpload from "./FileUpload";
// import ModifyProgress from "layouts/ModifyProgress";

// const nicRegex = /^(\d{9}[Vv]|\d{12})$/; // Validates both old and new NIC formats

const ModifyProgressTab = () => {
  return (
    <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
      <form>
        {/* //new */}
        <div className="flex flex-wrap ">
          <div className="flex"></div>

          {/* drop down */}
          <div className="w-full px-4 mb-3 lg:w-6/12">
            <label className="block mb-2 text-sm text-blueGray-600">
              Construction Reference
            </label>
            <select className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
              <option value="">Select Document</option>
              <option value="id_proof">ID Proof</option>
              <option value="address_proof">Address Proof</option>
            </select>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <label className="block mb-2 text-sm text-blueGray-600">
              Job Reference
            </label>
            <select className="border-0 px-3h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
              <option value="">Select Document</option>
              <option value="id_proof">ID Proof</option>
              <option value="address_proof">Address Proof</option>
            </select>
          </div>

          {/* drop doun end */}

          {/* second field row */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Commercial Reference
              </label>
              <input
                type="text"
                name="idType"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Cost Center Estimate No
              </label>
              <div className="flex ">
                <input
                  type="text"
                  name="idNo"
                  className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <button
                  className="px-4 py-2 ml-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                  style={{
                    backgroundColor: "#620000",
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          {/* second field row end */}

          <div className="w-full px-4 mb-2 lg:w-6/12">
            <label className="block mb-2 text-sm text-blueGray-600">
              Job No
            </label>
            <select className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
              <option value="">Select Document</option>
              <option value="id_proof">ID Proof</option>
              <option value="address_proof">Address Proof</option>
            </select>
          </div>

          {/* raw 4 */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter description"
              ></textarea>
            </div>
          </div>

          {/* raw 4 end */}

          {/* Progress Milestone*/}
          <div className="w-full px-4 lg:w-12/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-sm text-blueGray-600">
                Progress Milestone
              </label>
              <select className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                <option>Personal</option>
                <option>Corporate</option>
              </select>
            </div>
          </div>
          {/* raw 2 */}

          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                No of metering points
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Estimate Categoty
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Fund Source
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          {/*  */}
          <div className="w-full px-4 lg:w-12/12">
          <div className="relative w-full mb-3">
            <label
              className="block mb-2 text-sm text-blueGray-600"
              htmlFor="description"
            >
              Remark
            </label>
            <textarea
              name="description"
              rows="2"
              className="border-0   px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Enter description"
            ></textarea>
          </div>
          </div>
        </div>

        {/* test */}
      </form>
    </div>
  );
};

export default ModifyProgressTab;
