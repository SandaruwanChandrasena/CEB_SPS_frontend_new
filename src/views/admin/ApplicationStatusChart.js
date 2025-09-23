// import React, { useEffect, useState } from "react";
// import BarChartCard from "../../components/Cards/BarChartCard";

// const ApplicationStatusChart = () => {
//   const [chartData, setChartData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;
//   const deptId = sessionStorage.getItem("deptId");
//   const fetchStatusCounts = async (deptId) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${baseUrl}/api/application/status/${deptId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"), // Replace with real credentials
//         },
//         credentials: "include", // Optional: include cookies if needed
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch status counts");
//       }
//       const data = await response.json();
//       console.log("Status counts:", data);    
//       setChartData(data);      
//     } catch (error) {
//       console.error("Error fetching status counts:", error);
//       setChartData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (deptId) {
//       fetchStatusCounts(deptId);
//     }
//   }, [deptId]);
//   return (
//     <div>
//       <BarChartCard data={chartData} isLoading={isLoading} />
//     </div>
//   );
// };
// export default ApplicationStatusChart;

import React, { useEffect, useState } from "react";
import BarChartCard from "../../components/Cards/BarChartCard";

const ApplicationStatusChart = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const deptId = sessionStorage.getItem("deptId");

  useEffect(() => {
    if (!deptId) return;

    const fetchStatusCounts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/application/status/${deptId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch status counts");

        const data = await response.json();
        console.log("Status counts:", data);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching status counts:", error);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatusCounts();
  }, [deptId, baseUrl]); 

  return (
    <div>
      <BarChartCard data={chartData} isLoading={isLoading} />
    </div>
  );
};

export default ApplicationStatusChart;
