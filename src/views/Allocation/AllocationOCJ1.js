//import AddProgress from "components/AddProgress/AddProgress";
import Allocation from "components/Allocation/Allocation";


import React from "react";

const AllocationOCJ1 = () => {


  return (
    <div className="container mx-auto rounded-lg">
      <div className="flex justify-center px-4 mx-48 mt-5 mb-5 rounded-lg md:px-10 lg:px-20">
        <Allocation/>
      </div>

      {/* add select button */}
      <div>
         
      <div className="flex flex-wrap ">
          <div className="w-full px-4 lg:w-4/12">
      <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                  Con/Mnt/Area/Phm
              </label>
              <select
                name="ApplicationType"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value="BS"> Construction Job Allocation</option>
                <option value="BS"> Allocation of Construction-Originated Jobs</option>
                <option value="BS"> Variance Estimation</option>
                <option value="BS"> Job Number Assignment</option>
                <option value="BS"> Contractor Proposal</option>
                <option value="BS"> Construction Job Completion</option>
                <option value="BS"> Handover of Completed Job</option>
                <option value="BS"> Asset Transfer of Completed Job</option>
                <option value="BS"> Final Job Report</option>
                <option value="BS">Job Termination</option>
              </select>
            </div>
            </div>

            <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                  Maintenace
              </label>
              <select
                name="ApplicationType"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value="BS">Maintenace</option>
              
              </select>
            </div>
            </div>

            <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                  Area
              </label>
              <select
                name="ApplicationType"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value="BS">Area</option>
             
              </select>
            </div>

            </div>
            </div>
</div>
            {/* add select button end */}
    </div>
  );
};

export default AllocationOCJ1;
