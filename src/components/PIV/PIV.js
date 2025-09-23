import React, { useState } from "react";
//import ModifyProgressTabs from "components/Tabs/ModifyProgressTabs";
// import ModifyProgressTabs from "components/Tabs/PIV1";
import PIV1 from "components/Tabs/PIV1";

export default function PIV({ onSavePiv }) {
  const [formData, setFormData] = useState({
    pivNumber: "",

    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSavePiv function passed from parent component
    onSavePiv(formData);
  };

  return (
    <div className="w-full max-w-2xl bg-white  rounded-lg p-6">
      <div class="flex justify-center items-center mt-6"></div>

      <div className="flex justify-center px-12 ml-2 pt-0">
        <h3 className="block text-blueGray-600 text-sm font-bold mb-2">
          Generate PIV
        </h3>
      </div>

      <div className="rounded-t bg-white  ">
        <div className="flex justify-between items-center ">
          {/* Tab Content */}
          {/* <div className="p-6"> */}
          <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-b-lg bg-blueGray-100 border-0">
            <PIV1 formData={formData} handleChange={handleChange} />

            {/* Navigation Buttons and bottom white bar */}
            <div className="rounded-t bg-white mb-0 px-6 py-2">
              <div className="flex justify-end items-center px-2 mr-4">
                <button
                  onClick={handleSubmit}
                  className="bg-emerald-400 text-white bg-green text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // </div>
  );
}

// import PIV1 from "components/Tabs/PIV1";

// import React from "react";

// const PIV = ({  }) => {

//   return (
//     <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
//       {/* Stepper */}

//       {/* Content */}
//       <div className="p-6 bg-blueGray-100 rounded-lg">
//         <div className="px-12 ml-2">
//           <h3 className="text-blueGray-700 text-lg font-bold">

//           </h3>
//         </div>
//           <PIV1/>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="px-6 flex justify-between items-center mt-2 mb-4">

//           <button

//             className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//           >
//             Submit
//           </button>

//       </div>
//     </div>
//   );
// };

// export default PIV;
