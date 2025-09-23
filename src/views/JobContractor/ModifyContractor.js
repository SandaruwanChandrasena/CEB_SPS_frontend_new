import NewJobContractor from "components/JobContractor/NewJobContractor";
// import { useState } from "react";
const ModifyContractor = () => {
  return (
    <div className="container mx-auto rounded-lg">
      <div className="flex justify-center px-4 mx-48 mt-5 mb-5 rounded-lg md:px-10 lg:px-20">
        <NewJobContractor
          isModify={true}
        />
      </div>
    </div>
  );
};

export default ModifyContractor;
