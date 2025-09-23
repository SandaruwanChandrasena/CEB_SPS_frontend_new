
import React, { useState } from "react";
// import AddProgress from "components/AddProgress/AddProgress";
import PIV from "components/PIV/PIV";
import axios from "axios";

const NewPiv = () => {
  // const [pivData, setPivData] = useState(null);
    const [setPivData] = useState(null);

  const savePivData = async (data) => {
    try {
      const enhancedData = {
        ...data,
        deptId: "34500",
        accountCode: "BA001",
        amount: 2000.00
      };

  // Create config with the Basic Authentication header
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa("user:admin123")
    },
    withCredentials: true // This enables sending cookies with the request
  };

  // Send enhancedData instead of data
  const response = await axios.post(
    'http://localhost:8081/api/piv-amounts/savepiv', 
    enhancedData, 
    config
  );
  
      console.log('PIV data saved successfully:', response.data);
      // You can add success notification here
      return response.data;
    } catch (error) {
      console.error('Error saving PIV data:', error);
      // You can add error handling here
      throw error;
    }
  };
  const handleSavePiv = (pivFormData) => {
    setPivData(pivFormData);
    savePivData(pivFormData);
  };

  return (
    
    <div className="container mx-auto rounded-lg">
      <div className="flex justify-center px-4 mx-48 mt-5 mb-5 rounded-lg md:px-10 lg:px-20">
        <PIV onSavePiv={handleSavePiv}/>
      </div>
    
    </div>
  );
};

export default NewPiv;
