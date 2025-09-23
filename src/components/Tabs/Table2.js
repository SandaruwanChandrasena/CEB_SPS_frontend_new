import React from "react";
// import PropTypes from "prop-types";
// import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function Table2({ color }) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="px-4 mb-0 border-0 rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
              {/* <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Card Tables
              </h3> */}
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Code Number
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Description
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Amount Cents
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  1300
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  Miscellaneous Income
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"></td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* edit */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    {/* edit end */}
                  </div>
                </td>
              </tr>

              {/* row 2 */}
              <tr>
                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  3600
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  Electricity Debtors
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"></td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* edit */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    {/* edit end */}
                  </div>
                </td>
              </tr>

              {/* raw 3 */}
              <tr>
                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  5600
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  Security Deposit
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"></td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* edit */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    {/* edit end */}
                  </div>
                </td>
              </tr>

              {/* raw 4 */}
              <tr>
                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  5610
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  Service Connection/ Electricity Schemes
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"></td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* edit */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    {/* edit end */}
                  </div>
                </td>
              </tr>

              {/* raw 5 */}
              <tr>
                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  5640
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  Tender Deposit
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"></td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* edit */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    {/* edit end */}
                  </div>
                </td>
              </tr>

              {/* raw 6 */}
              <tr>
                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  5660
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  Miscellaneous Deposit
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"></td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* edit */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    {/* edit end */}
                  </div>
                </td>
              </tr>

              {/* raw 7 */}
              <tr>
                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  5800
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  Cash in Transit
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"></td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* edit */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    {/* edit end */}
                  </div>
                </td>
              </tr>

              {/* raw 8 */}
              <tr>
                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  5910
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  For Dishonoured Cheque
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"></td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* edit */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    {/* edit end */}
                  </div>
                </td>
              </tr>

              {/* raw 8 */}
              <tr>
                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  1380
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  Application Fee
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"></td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* edit */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    {/* edit end */}
                  </div>
                </td>
              </tr>

              {/* raw 9 */}
              <tr>
                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  5222
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  Sub Total
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"></td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* edit */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    {/* edit end */}
                  </div>
                </td>
              </tr>

              {/* raw 10 */}
              <tr>
                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  1300
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 text-blueGray-600 whitespace-nowrap">
                  Grand Total
                </td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"></td>

                <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* edit */}
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          type="text"
                          className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    {/* edit end */}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// CardTable.defaultProps = {
//   color: "light",
// };

// CardTable.propTypes = {
//   color: PropTypes.oneOf(["light", "dark"]),
// };
