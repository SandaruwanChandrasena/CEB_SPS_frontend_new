// import { useState, useEffect } from "react";
import Table2 from "./Table2";

const PIV1 = ({ formData, handleChange }) => {
  return (
    <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                PIV Number
              </label>
              <div className="flex ">
                <input
                  type="text"
                  name="pivNo"
                  id="pivNo"
                  value={formData.pivNo}
                  onChange={handleChange}
                  className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="430.00/ABS/25/xxxx"
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
                Vat Registration Number
              </label>
              <input
                type="text"
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
                People's Bank Branch
              </label>
              <input
                type="text"
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
                CEB Branch
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Job Description
              </label>
              <input
                type="text"
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
                ID Number
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Cost Center Number
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="430.00"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                className="w-full px-3 py-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-4/12">
            {/* <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                htmlFor="grid-password"
              >
                Reference No
              </label>
              <input
                type="text"
                className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                placeholder="430.00"
              />
            </div> */}
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Reference Number
              </label>
              <select
                name="ApplicationType"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value="BS">Ref</option>
                <option value="Other">OTHER</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Depositor's Name
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="description"
              >
                Address
              </label>
              <textarea
                name="description"
                rows="3"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter Address"
              ></textarea>
            </div>
          </div>
        </div>
        {/* raw 4 */}
        {/* <div className="w-full px-4 lg:w-6/12">
  <div className="relative w-full mb-3">
    <label
      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
      htmlFor="description"
    >
      Description
    </label>
    <textarea
      name="description"
      rows="3"
      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
      placeholder="Enter description"
    ></textarea>
  </div>
</div> */}

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Payment Mode
              </label>
              <div className="flex gap-4 mt-2">
                <label className="mr-4 text-sm">
                  <input
                    type="radio"
                    name="isLoanApp"
                    defaultChecked
                    value="Yes"
                  />{" "}
                  Cash
                </label>
                <label className="mr-4 text-sm">
                  <input type="radio" name="isLoanApp" value="No" /> Cheque
                </label>
                <label className="text-sm">
                  <input type="radio" name="isLoanApp" value="No" /> CEB
                </label>
              </div>
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Pay Date
              </label>
              <input
                type="date"
                name="date"
                className="w-full px-3 py-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Bank Code
              </label>
              <select
                name="ApplicationType"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value="BS">Bank1</option>
                <option value="Other">OTHER</option>
              </select>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Branch Code
              </label>
              <select
                name="ApplicationType"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value="BS">Branch1</option>
                <option value="Other">OTHER</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Cheque Date
              </label>
              <input
                type="date"
                name="date"
                className="w-full px-3 py-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Cheque Number
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Amount Allocated
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="description"
              >
                Amount In Words
              </label>
              <textarea
                name="description"
                rows="3"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter description"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Prepared By
              </label>
              <input
                type="text"
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
                Certified By
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Depositor's Siqnature
              </label>
              <input
                type="text"
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
                Bank Officer's Siqnature
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>
        <div className="mt-3 ml-3 mr-3">
          <Table2 color="light" />
        </div>
      </form>
    </div>
  );
};

export default PIV1;
