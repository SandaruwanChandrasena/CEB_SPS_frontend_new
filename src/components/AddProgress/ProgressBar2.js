import React from "react";
//import ModifyProgressTabs from "components/Tabs/ModifyProgressTabs";
//import AddProgressMilestone from "components/Tabs/ProgressBar1";
//import { useHistory } from "react-router-dom";
import ProgressBar1 from "components/Tabs/ProgressBar1";

export default function ProgressBar2() {
 
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg">
      <div class="flex justify-center items-center mt-6"></div>

      {/* Add the title and edit button here */}
      <div className="flex justify-center px-12 mb-2 ml-2">
        <h3 className="block text-sm font-bold text-blueGray-600">
          Progress Bar
        </h3>
      </div>
      {/* <div className="p-6"> */}

      <div className="bg-white rounded-t ">
        <div className="flex items-center justify-between ">
          {/* Tab Content */}
          <div className="relative flex flex-col w-full min-w-0 break-words border-0 rounded-b-lg shadow-lg bg-blueGray-100">
            <div className="relative flex flex-col w-full min-w-0 break-words border-0 rounded-b-lg shadow-lg bg-blueGray-100">
              <ProgressBar1
               
              />

              {/* Navigation Buttons and bottom white bar */}
              <div className="px-6 py-2 mb-0 bg-white rounded-t">
                <div className="flex items-center justify-between px-6 mb-6">
                  {/* Left-aligned "Previous" button */}
                  
                  {/* <button
                  
                    type="button"
                    className="px-6 py-2 mr-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 bg-green hover:shadow-md focus:outline-none"
                  >
                    Submit
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
