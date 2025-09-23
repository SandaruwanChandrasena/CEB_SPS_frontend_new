import React from "react";
//import ModifyProgressTabs from "components/Tabs/ModifyProgressTabs";
//import AddProgressMilestone from "components/Tabs/AddProgressMilestone";
import AllocationOCJ from "components/Tabs/AllocationOCJ";

export default function Allocation() {
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg">
      <div class="flex justify-center items-center mt-6"></div>

      <div className="flex justify-center px-12 ml-2">
        <h3 className="block mb-2 text-sm font-bold text-blueGray-600">
          Download Letters
        </h3>
      </div>

      <div className="bg-white rounded-t ">
        <div className="flex items-center justify-between ">
          {/* Tab Content */}
          {/* <div className="p-6"> */}
          <div className="relative flex flex-col w-full min-w-0 break-words border-0 rounded-b-lg shadow-lg bg-blueGray-100">
            <AllocationOCJ />

            {/* Navigation Buttons and bottom white bar */}
            <div className="px-6 py-6 mb-0 bg-white rounded-t">
              <div className="flex items-center justify-end">
                {/* Left-aligned "Previous" button */}
                {/* <button
      
       type="button"
        className="px-6 py-2 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 hover:shadow-md focus:outline-none"
        style={{
          backgroundColor:"#620000",
        }}
      >
       Submit
      </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // </div>
  );
}
