import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
// import Chart from "chart.js/auto";

const statusLabels = {
  1: "New Estimate",
  2: "ES Approval", 
  3: "CE Approval",
  4: "DGM Approval",
};

export default function CardBar() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Starting fetch...");

    fetch("http://127.0.0.1:8088/SPS/pcesthtt/row-count-by-status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("user:admin123"),
      },
      credentials: "include",
    })
      .then(async (response) => {
        console.log("Fetch response status:", response.status);

        if (!response.ok) {
          console.error("Non-OK HTTP status:", response.status);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        // API returns object like {"1": 3, "2": 2, "3": 1, "4": 2}
        if (typeof data !== 'object' || data === null) {
          console.error("Expected object but got:", data);
          setChartData(null);
          setLoading(false);
          return;
        }

        const statusMap = {};
        Object.keys(data).forEach((key) => {
          const statusKey = Number(key);
          const count = data[key];
          console.log("key:", key, "status:", statusKey, "count:", count);
          statusMap[statusKey] = count;
        });

        console.log("Final statusMap:", statusMap);

        const labels = Object.keys(statusMap).map(
          (key) => statusLabels[Number(key)] || `Status ${key}`
        );
        const values = Object.values(statusMap);

        console.log("statusMap:", statusMap);
        console.log("Labels:", labels);
        console.log("Values:", values);

        if (labels.length === 0 || values.length === 0) {
          console.warn("Empty chart data — skipping chart render.");
          setChartData(null);
          setLoading(false);
          return;
        }

        const finalChartData = {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"],
              hoverOffset: 4,
              cutout: "60%",
            },
          ],
        };

        console.log("Final chartData:", finalChartData);

        setChartData(finalChartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setChartData(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading chart...</div>;
  if (!chartData) return <div className="p-4">No data available.</div>;

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h3 className="mb-4 text-xl font-semibold">Application Status Overview</h3>
      <Doughnut data={chartData} />
    </div>
  );
}