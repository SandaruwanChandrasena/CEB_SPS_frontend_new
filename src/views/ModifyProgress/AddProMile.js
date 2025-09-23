
import React, { useState } from "react";
import AddProgress from "components/AddProgress/AddProgress";
import axios from 'axios';

const API_URL ="http://localhost:8081";

const AddProMile = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    deptId: "",
    persentage: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  // const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async () => {
    
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Call the API to save the progress milestone with Basic Authentication
      // Using the same credentials as in your NewApp component
      const response = await axios.post(`${API_URL}/progressMoniter/save`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('user:admin123')
        },
        withCredentials: true // Include cookies in the request if needed
      });
      
      console.log('API Response:', response.data);
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: "",
        id: "",
        deptId: "",
        persentage: ""
      });
    } catch (err) {
      console.error('API Error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setError("Invalid data. Please check the form values.");
      } else {
        setError("An error occurred while adding the progress milestone");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mx-auto rounded-lg">
      <div className="flex justify-center px-4 mx-48 mt-5 mb-5 rounded-lg md:px-10 lg:px-20">
      {success && (
          <div className="px-4 py-3 mb-4 text-white bg-green-500 rounded">
            Progress milestone added successfully!
          </div>
        )}
        
        {error && (
          <div className="px-4 py-3 mb-4 text-white bg-red-500 rounded">
            Error: {error}
          </div>
        )}
         {loading && (
          <div className="mb-4 text-center">
            <span className="text-blue-500">Submitting data...</span>
          </div>
        )}
        <AddProgress
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        formData={formData}
         />
      </div>
    </div>
  );
};

export default AddProMile;
