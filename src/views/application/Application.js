import NewApplication from "components/Applicationss/NewApplication";
import { useState} from "react";
import {toast} from "react-toastify";

const NewApp = () => {
  // const [isModify, setisModify] = useState(false);
  const [isModify] = useState(false);

  const [formData, setFormData] = useState({
    appDetails: {},
    personalDetails: {},
    locationalDetails: {},
    techDetails: {},
  });

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleFormSubmit = async (data) => {
    const hardcodedData = {
      applicationType: "gy",
      submitDate: "2021-09-01",
      status: "bn",
    };

    // Merge hardcoded data with form data
    const mergedData = {
      ...data,
      idNo: data.personalDetails?.idNo || "",
      applicationId: data.appDetails?.applicationId || "",
      description: data.appDetails?.description || "",
      ...hardcodedData,
    };

    setFormData(mergedData);
    console.log(mergedData);
    // Send the data to the backend via REST API
    try {
      const response = await fetch(
        `${baseUrl}/api/application/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
          credentials: "include",
          body: JSON.stringify(mergedData),
        }
      );

      if (response.ok) {
        toast.success("Form submitted successfully!");
      } else {
        toast.error("Form submission failed!");
        console.log("Form submission failed", response);
      }
    } catch (error) {
      toast.error("An error occurred!");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto rounded-lg">
      <div className="flex justify-center px-4 mx-48 mt-5 mb-5 rounded-lg md:px-10 lg:px-20">
        <NewApplication onFormSubmit={handleFormSubmit} isModify={isModify} formData={formData} setFormData={setFormData}/>
      </div>
    </div>
  );
};

export default NewApp;
