
import React from "react";
//import AddProgress from "components/AddProgress/ProgressBar";
// import axios from 'axios';
import ProgressBar2 from "components/AddProgress/ProgressBar2";



const ProgressBar = () => {
   
  return (
    <div className="container mx-auto rounded-lg">
      <div className="flex justify-center px-4 mx-48 mt-5 mb-5 rounded-lg md:px-10 lg:px-20">

        <ProgressBar2 />
      </div>
    </div>
  );
};

export default ProgressBar;
