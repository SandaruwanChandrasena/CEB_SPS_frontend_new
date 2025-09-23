/*eslint-disable*/
import React from "react";
import { Link, useLocation } from "react-router-dom";
import ceb from "../../assets/img/ceb.png";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import AdminNavbar from "components/Navbars/AdminNavbar";
import colors from "tailwindcss/colors";

export default function Sidebar() {
  const location = useLocation();
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between px-6 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64">
        <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap">
          {/* Toggler */}
          <button
            className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-2")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="inline-block px-0 pt-2 mt-2 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
            to="/"
          >
            <div className="sticky flex items-center justify-center">
              <img alt="ceb logo" className="w-20 h-20" src={ceb} />
            </div>
          </Link>
          {/* User */}
          <ul className="flex flex-wrap items-center list-none md:hidden">
            <li className="relative inline-block">
              <NotificationDropdown />
            </li>
            <li className="relative inline-block">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="block border-b border-solid md:min-w-full md:hidden border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
                    to="/"
                  >
                    <div className="flex items-center justify-center">
                      <img alt="ceb logo" className="w-20 h-20" src={ceb} />
                    </div>
                  </Link>
                </div>
                <div className="flex justify-end w-6/12">
                  <button
                    type="button"
                    className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-2 mb-4 md:hidden">
              <div className="pt-0 mb-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-12 px-3 py-2 text-base font-normal leading-snug bg-white border border-0 border-solid rounded shadow-none outline-none border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 focus:outline-none"
                />
              </div>
            </form>

            <div className="h-full overflow-y-auto">
              <ul className="flex flex-col list-none md:flex-col md:min-w-full">
                <li className="items-center">
                  <Link
                    className={
                      "text-sm mb-3 block " +
                      (window.location.href.indexOf(
                        "/applicant/newapplicant"
                      ) !== -1
                        ? ""
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    style={
                      window.location.href.indexOf(
                        "/applicant/newapplicant"
                      ) !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                    to="/applicant/newapplicant"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf(
                          "/applicant/newapplicant"
                        ) !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Applicant Profile
                  </Link>
                </li>
                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 block " +
                      (window.location.href.indexOf("/application/new") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    style={
                      window.location.href.indexOf("/application/new") !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                    to="/application/new"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf("/application/new") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Application Submission
                  </Link>
                </li>
                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 block " +
                      (window.location.href.indexOf("/piv/newPiv") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    style={
                      window.location.href.indexOf("/piv/newPiv") !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                    to="/piv/newPiv"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf("/piv/newPiv") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Generate PIV
                  </Link>
                </li>
                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 block " +
                      (window.location.href.indexOf("/estimation/estimate") !==
                      -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    style={
                      window.location.href.indexOf("/estimation/estimate") !==
                      -1
                        ? { color: "#b23200" }
                        : {}
                    }
                    to="/estimation/estimate"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf(
                          "/estimation/estimate"
                        ) !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Standard Cost Estimate
                  </Link>
                </li>
                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 block " +
                      (window.location.href.indexOf(
                        "/estimation/standard-rates"
                      ) !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    style={
                      window.location.href.indexOf(
                        "/estimation/standard-rates"
                      ) !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                    to="/estimation/standard-rates"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf(
                          "/estimation/standard-rates"
                        ) !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Approved Rate Schedule
                  </Link>
                </li>
                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 block " +
                      (window.location.href.indexOf(
                        "/estimate/estimateform"
                      ) !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    style={
                      window.location.href.indexOf("/estimate/estimateform") !==
                      -1
                        ? { color: "#b23200" }
                        : {}
                    }
                    to="/estimate/estimateform"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf(
                          "/estimate/estimateform"
                        ) !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Detailed Work Estimate
                  </Link>
                </li>
                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 block " +
                      (window.location.href.indexOf("/jobrevision/new") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    style={
                      window.location.href.indexOf("/jobrevision/new") !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                    to="/jobrevision/new"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf("/jobrevision/new") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Job Revision
                  </Link>
                </li>
                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 block " +
                      (window.location.href.indexOf("/jobcontractor/new") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    style={
                      window.location.href.indexOf("/jobcontractor/new") !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                    to="/jobcontractor/new"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf("/jobcontractor/new") !==
                        -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Contractor Assignment
                  </Link>
                </li>
                <li className="items-center">
                  {/* <Link
                  className={
                    "text-sm py-3 block " +
                    (window.location.href.indexOf(
                      "/modifyProgress/addProMile"
                    ) !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  style={
                    window.location.href.indexOf("/modifyProgress/addProMile") !== -1
                      ? { color: "#b23200" }
                      : {  }
                  }
                  to="/modifyProgress/addProMile"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf(
                        "/modifyProgress/addProMile"
                      ) !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Progress Dashboard
                </Link> */}

                  <div className="relative">
                    <button
                      className="block w-full py-3 text-sm text-left focus:outline-none"
                      onClick={() =>
                        setCollapseShow(
                          collapseShow === "progress" ? "" : "progress"
                        )
                      }
                      style={
                        window.location.href.indexOf(
                          "/modifyProgress/addProMile"
                        ) !== -1
                          ? { color: "#b23200" }
                          : {}
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (window.location.href.indexOf(
                            "/modifyProgress/addProMile"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>{" "}
                      Progress Dashboard
                    </button>
                    {collapseShow === "progress" && (
                      <ul className="px-4 ml-4">
                        <li>
                          <Link
                            className="block py-2 text-sm text-blueGray-700 hover:text-blueGray-500"
                            to=""
                          >
                            <i
                              className={
                                "fas fa-envelope mr-2 text-sm " +
                                (window.location.href.indexOf("/letters/") !==
                                -1
                                  ? "opacity-75"
                                  : "text-blueGray-300")
                              }
                            ></i>{" "}
                            Progress Overview
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="block py-2 text-sm text-blueGray-700 hover:text-blueGray-500"
                            to="/modifyProgress/addProMile"
                          >
                            <i
                              className={
                                "fas fa-envelope mr-2 text-sm " +
                                (window.location.href.indexOf("/letters/") !==
                                -1
                                  ? "opacity-75"
                                  : "text-blueGray-300")
                              }
                            ></i>{" "}
                            Add Progress Milestone
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="block py-2 text-sm text-blueGray-700 hover:text-blueGray-500"
                            to="/modifyProgress/progressBar"
                          >
                            <i
                              className={
                                "fas fa-envelope mr-2 text-sm " +
                                (window.location.href.indexOf("/letters/") !==
                                -1
                                  ? "opacity-75"
                                  : "text-blueGray-300")
                              }
                            ></i>{" "}
                            Progress Bar
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>
                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 block " +
                      (window.location.href.indexOf(
                        "/allocation/allocationOCJ1"
                      ) !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    style={
                      window.location.href.indexOf(
                        "/allocation/allocationOCJ1"
                      ) !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                    to="/allocation/allocationOCJ1"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf(
                          "/allocation/allocationOCJ1"
                        ) !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Official Correspondence
                  </Link>
                </li>
                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 block " +
                      (window.location.href.indexOf("/reviseallocation") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    style={
                      window.location.href.indexOf("/reviseallocation") !== -1
                        ? { color: "#b23200" }
                        : {}
                    }
                    to="/reviseallocation"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf("/reviseallocation") !==
                        -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Revise Allocation
                  </Link>

                  {/* // Remove this entire section from lines 486-512 */}
                  <Link
                    // className={
                    //   "text-sm py-3 block " +
                    //   (window.location.href.indexOf("/schedule2") !== -1
                    //     ? "text-lightBlue-500 hover:text-lightBlue-600"
                    //     : "text-blueGray-700 hover:text-blueGray-500")
                    // }
                    // style={
                    //   window.location.href.indexOf("/schedule2") !== -1
                    //     ? { color: "#b23200" }
                    //     : {}
                    // }
                    to="/schedule2"
                  >
                    {/* <i
              className={
                "fas fa-calendar mr-2 text-sm " +
                (window.location.href.indexOf("/schedule2") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Schedule 2 */}
                  </Link>
                </li>
                <li className="items-center">
                  <Link
                    className={
                      "text-sm py-3 block " +
                      (location.pathname === "/admin/commission"
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    style={
                      location.pathname === "/admin/commission"
                        ? { color: "#b23200" }
                        : {}
                    }
                    to="/admin/commission"
                  >
                    <i
                      className={
                        "fas fa-percentage mr-2 text-sm " +
                        (location.pathname === "/admin/commission"
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Commission Management
                  </Link>
                </li>
              </ul>
            </div>
            {/* <hr className="my-2 md:min-w-full" /> */}
          </div>
          <div className="sticky mt-64">
            <AdminNavbar />
          </div>
        </div>
      </nav>
    </>
  );
}
