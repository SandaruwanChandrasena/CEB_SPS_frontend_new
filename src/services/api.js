const API_BASE_URL = 'http://localhost:8082/api/estimates';

// Helper function to handle errors
const handleError = (response) => {
    if (!response.ok) {
        return response.json().then(errorData => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
        }).catch(() => {
            throw new Error(`HTTP error! Status: ${response.status}`);
        });
    }
    return response.json();
};

// Create a new estimate
export const createEstimate = async (estimateData) => {
    try {
        console.log('Sending data to backend:', estimateData);
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estimateData),
        });
        const responseData = await handleError(response);
        return responseData;
    } catch (error) {
        console.error('Error creating estimate:', error.message || error);
        throw error;
    }
};

// Fetch an estimate by estimateNo
export const fetchEstimateById = async (estimateNo) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${estimateNo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseData = await handleError(response);
        return responseData;
    } catch (error) {
        console.error('Error fetching estimate:', error.message || error);
        throw error;
    }
};