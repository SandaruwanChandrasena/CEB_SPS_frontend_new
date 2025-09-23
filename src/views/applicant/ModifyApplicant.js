// import Applicant from "components/Applicant/Applicant";
// import React from "react";

// const NewApplicant = () => {
//   return (
//     <div className="container mx-auto rounded-lg">
//       <div className="flex justify-center px-4 mx-48 mt-5 mb-5 rounded-lg md:px-10 lg:px-20">
//         <Applicant/>
//       </div>
//     </div>
//   );
// };

// export default NewApplicant;

import Applicant from "components/Applicant/Applicant";
import React, { useState } from "react";

const ModifyApplicant = () => {
  // const [isModify, setIsModify] = useState(true);
  const [isModify] = useState(true);
  const [appData, setAppData] = useState({
    idNo:"",
    firstName: "", 
    lastName: "",
    fullName: "",
    streetAddress: "",
    email: ""
  });
  // const [loading, setLoading] = useState(false);
   const [setLoading] = useState(false);
  
 // Function to call the search API
 //   const handleSearch = async () => {
//     if (!appData.idNo) {
//       alert("Please enter a valid NIC number before searching.");
//       return;
//     }

//     setLoading(true);
//     try {
       
    
//      // Encode credentials in Base64
    
//       // const token = localStorage.getItem("authToken"); // Adjust based on where you store
//       const response = await fetch(`http://localhost:8081/api/applicants/search?idNo=${appData.idNo}`
//         , {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//              //"Authorization": `Bearer ${credentials}`, // Include if authentication is required
//           },
//           credentials: "include", // Include cookies in the request
//         }
// );
// console.log("Response Status:", response.status);
// console.log("Response Headers:", response.headers);



//       if (!response.ok) {
//         throw new Error(`NIC not found (Status: ${response.status})`);
//       }
//       const data = await response.json();
//       console.log("API Response Data:", data);

//       if (!data || Object.keys(data).length === 0) {
//         throw new Error("NIC not found in database.");
//       }
  
//       setAppData({
//         ...appData,
//         firstName: data.firstName || "",
//         lastName: data.lastName || "",
        
//       });

//       // Update state with fetched data
//       // const updatedData = {
//       //   ...appData,
//       //   firstName: data.firstName || "",
//       //   lastName: data.lastName || "",
//       // };
//       // setAppData(updatedData);
//       // onInputChange(updatedData);
//     } catch (error) {
//       alert(error.message);
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

 // Function to call the search API
 const handleSearch = async () => {
  console.log("NIC Entered:", appData.idNo);
  if (!appData.idNo) {
   // console.log("id",appData.idNo);
    alert("Please enter a valid NIC number before searching.");
    return;
  }

  setLoading(true);
  try {
    console.log(appData);
    const response = await fetch(
      `http://127.0.0.1:8088/SPS/api/applicants/search?idNo=${appData.idNo}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa("user:admin123"),
          "Content-Type": "application/json",
        },
        // credentials: "include", // Include cookies in the request
      }
    );

     console.log("📥 Full Response:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });

    console.log(response);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("❌ Error response body:", errorText);
      throw new Error(`NIC not found (Status: ${response.status})`);
    }
    const data = await response.json();
     console.log("✅ API Response Data:", data);
    console.log("📊 Data type:", typeof data);
    console.log("📝 Data keys:", Object.keys(data));

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
    };
    
    console.log("📝 Updated data to set:", updatedData);
    setAppData(updatedData);
    
    // Add a timeout to check if state actually updated
    setTimeout(() => {
      console.log("⏰ appData after state update:", appData);
    }, 100);
  } catch (error) {
    alert(error.message);
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};


  const handleFormSubmit = async (data) => {
    const hardcodedData = {
      preferredLanguage: "EN",
      // idNo: "12345678",
      idType: "NIC",
      //firstName: "John",
      // lastName: "Doe",
      //fullName: "John Doe",
      //streetAddress: "123 Main Street",
    };
    // Merge hardcoded data with form data
    // const mergedData = { ...data};
    const mergedData = { 
      ...hardcodedData,  // Base properties first
      ...data,           // Form data overwrites base properties
      // Ensure these fields are never undefined
      idNo: data?.idNo || "",
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      fullName: data?.fullName || "",
      streetAddress: data?.streetAddress || ""
    };
    


    //setFormData(mergedData);
    console.log(mergedData);

    // Send the data to the backend via REST API
    try {
      const response = await fetch("http://127.0.0.1:8088/SPS/api/applicants/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mergedData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
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
        <Applicant onFormSubmit={handleFormSubmit}
        isModify={isModify} 
        handleSearch={handleSearch} 
        appData={appData}
        setAppData={setAppData}
        />
      </div>
    </div>
  );
};

export default ModifyApplicant;
