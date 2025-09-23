import Applicant from "components/Applicant/Applicant";
import React, { useState } from "react";

const NewApplicant = () => {
  const [appData, setAppData] = useState({
    idNo: "",
    firstName: "", 
    lastName: "",
    fullName: "",
    streetAddress: "",
    email: ""
  }); // State to hold applicant data
  
  const [loading, setLoading] = useState(false);
  // const [isModify, setIsModify] = useState(false);
    const [isModify] = useState(false);

  // Updated handleSearch function with API call
  const handleSearch = async () => {
    console.log("🔍 Search function called!");
    console.log("NIC Entered:", appData.idNo);
    
    if (!appData.idNo) {
      alert("Please enter a valid NIC number before searching.");
      return;
    }

    setLoading(true);
    try {
      console.log("📡 Making API call with data:", appData);
      
      const response = await fetch(
        `http://127.0.0.1:8088/SPS/api/applicants/search?idNo=${appData.idNo}`,
        {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa("user:admin123"),
            "Content-Type": "application/json",
          },
        }
      );

      console.log("📥 Full Response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("❌ Error response body:", errorText);
        throw new Error(`NIC not found (Status: ${response.status})`);
      }
      
      const data = await response.json();
      console.log("✅ API Response Data:", data);

      if (!data || Object.keys(data).length === 0) {
        throw new Error("NIC not found in database.");
      }

      console.log("🔄 Current appData before update:", appData);
      
      // Update state with fetched data
      const updatedData = {
        ...appData,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        fullName: data.fullName || "",
        streetAddress: data.streetAddress || "",
        email: data.email || "",
        // Add other fields as needed based on API response
        city: data.city || "",
        postalCode: data.postalCode || "",
        telephoneNo: data.telephoneNo || "",
        mobileNo: data.mobileNo || "",
      };
      
      console.log("📝 Updated data to set:", updatedData);
      setAppData(updatedData);
      
      alert("Data found and loaded successfully!");
      
    } catch (error) {
      console.error("❌ Error in handleSearch:", error);
      alert(error.message);
    } finally {
      setLoading(false);
      console.log("🏁 Search completed");
    }
  };

  const handleFormSubmit = async (data) => {
    // Get current date and time in ISO format
    // const currentDateTime = new Date().toISOString();
    
    // Get current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    const hardcodedData = {
      //preferredLanguage: "EN",
      // idNo: "12345678",
      // idType: "NIC",
      //firstName: "John",
      // lastName: "Doe",
      //fullName: "John Doe",
      //streetAddress: "123 Main Street",
    };
    
    // Merge hardcoded data with form data
    const mergedData = { 
      idNo: data.applicantInfo?.idNo || "", 
      firstName: data.applicantInfo?.firstName || "", 
      lastName: data.applicantInfo?.lastName || "",
      fullName: data.applicantInfo?.fullName || "",
      streetAddress: data.applicantContact?.streetAddress || "",

      // Applicant Contact details
      personalCorporate: data.applicantInfo?.personalCorporate || "",
      cebEmployee: data.applicantInfo?.cebEmployee|| "",
      preferredLanguage: data.applicantInfo?.preferredLanguage || "",
      idType: data.applicantInfo?.idType || "",
      city: data.applicantContact?.city || "",
      postalCode: data.applicantContact?.postalCode || "",
      email: data.applicantContact?.email || "",
      telephoneNo: data.applicantContact?.telephoneNo || "",
      suburb: data.applicantContact?.mobileNo || "",
      mobileNo: data.applicantContact?.mobileNo || "",
      // Replace the previous line with this to use current date
      addDate: currentDate,
      //  submitDateTime: currentDateTime,
      ...hardcodedData 
    };

    console.log(mergedData);
    console.log(isModify);

    // Send the data to the backend via REST API
    try {
      const response = await fetch("http://127.0.0.1:8088/SPS/api/applicants/save", {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa("user:admin123"),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(mergedData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error response from backend:", errorData);
        alert("Form submission failed!");
      }
    } catch (error) {
      alert("An error occurred!");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto rounded-lg">
      <div className="flex justify-center px-4 mx-48 mt-5 mb-5 rounded-lg md:px-10 lg:px-20">
        <Applicant 
          onFormSubmit={handleFormSubmit} 
          handleSearch={handleSearch}
          isModify={isModify}
          appData={appData}
          setAppData={setAppData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default NewApplicant;