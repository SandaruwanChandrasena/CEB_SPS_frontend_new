import React, { useState, useEffect } from "react";
import CardStats from "components/Cards/CardStats.js";
import { useHistory } from "react-router-dom";
// import axios from "axios";

export default function HeaderStats() {
  // State for storing data from backend
  const [pendingAllocationData, setPendingAllocationData] = useState([]);
  const [standardEstimatesData, setStandardEstimatesData] = useState([]);
  const [applicationNumberData, setApplicationNumberData] = useState([]);
  const [confirmedPiviiData, setConfirmedPiviiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estimatesLoading, setEstimatesLoading] = useState(true); // Add loading state for estimates
  const [error, setError] = useState(null);
  const [estimatesError, setEstimatesError] = useState(null); // Add error state for estimates
  const history = useHistory();

  //state for Commission data
  const [commissionData, setCommissionData] = useState([]);

  // Updated click handler to pass application number
  const handlePendingAllocationClick = (applicationNo = null) => {
    console.log("Pending Allocation number clicked:", applicationNo);

    if (applicationNo) {
      // Navigate to schedule2 with application number as URL parameter
      history.push(
        `/schedule2?applicationNo=${encodeURIComponent(applicationNo)}`
      );
    } else {
      // Navigate to schedule2 without specific application number
      history.push("/schedule2");
    }
  };

  // Fetch estimates data from the backend
  useEffect(() => {
    const fetchEstimatesData = async () => {
      try {
        setEstimatesLoading(true);
        console.log("Starting API call to fetch estimates data...");

        const response = await fetch(
          "http://127.0.0.1:8081/SPS/api/application/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
            credentials: "include",
          }
        );

        console.log("Estimates API Response status:", response.status);
        console.log("Estimates API Response ok:", response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `HTTP error! Status: ${response.status}, Response: ${errorText}`
          );
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Estimates API Response data:", data);

        // Process the estimates data to include application numbers
        if (Array.isArray(data)) {
          const formattedData = data.map((applicationNo) => ({
            value: applicationNo,
            applicationNo: applicationNo, // Store the application number for clicking
            label: `App: ${applicationNo}`,
          }));
          setPendingAllocationData(formattedData);
        } else {
          console.warn("Unexpected estimates data format from API:", data);
          setPendingAllocationData([]);
        }

        setEstimatesLoading(false);
      } catch (err) {
        console.error("Error fetching estimates data:", err);
        setEstimatesError("Failed to load estimates data");
        setEstimatesLoading(false);
        setPendingAllocationData([]);
      }
    };

    fetchEstimatesData();
  }, []);

  // Fetch application data from the backend (existing code)
  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        setLoading(true);
        console.log("Starting API call to fetch application data...");

        const response = await fetch(
          "http://127.0.0.1:8081/SPS/api/application/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
            credentials: "include",
          }
        );

        console.log("API Response status:", response.status);
        console.log("API Response ok:", response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `HTTP error! Status: ${response.status}, Response: ${errorText}`
          );
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response data:", data);

        if (Array.isArray(data)) {
          const formattedData = data.map((applicationNo) => ({
            value: applicationNo,
          }));
          setApplicationNumberData(formattedData);
        } else if (data && Array.isArray(data.applications)) {
          const formattedData = data.applications.map((applicationNo) => ({
            value: applicationNo,
          }));
          setApplicationNumberData(formattedData);
        } else {
          console.warn("Unexpected data format from API:", data);
          setApplicationNumberData([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching application data:", err);
        setError("Failed to load application data");
        setLoading(false);
        setApplicationNumberData([]);
      }
    };

    fetchApplicationData();
  }, []);

  // Static data for other cards
  useEffect(() => {
    setStandardEstimatesData([
      { label: "Residential", value: 32 },
      { label: "Commercial", value: 25 },
      { label: "Industrial", value: 20 },
      { label: "Total", value: 77 },
    ]);

    setConfirmedPiviiData([
      { label: "Last 24 Hours", value: 5 },
      { label: "Last 7 Days", value: 9 },
      { label: "Total", value: 14 },
    ]);
  }, []);

  //useEffect for commisson data
  useEffect(() => {
    setStandardEstimatesData([
      { label: "Residential", value: 32 },
      { label: "Commercial", value: 25 },
      { label: "Industrial", value: 20 },
      { label: "Total", value: 77 },
    ]);

    setConfirmedPiviiData([
      { label: "Last 24 Hours", value: 5 },
      { label: "Last 7 Days", value: 9 },
      { label: "Total", value: 14 },
    ]);

    // Commission dummy data
    setCommissionData([
      { label: "Approved", value: 6 },
      { label: "Pending", value: 3 },
      { label: "Rejected", value: 2 },
      { label: "Total", value: 11 },
    ]);
  }, []);

  // Extract application numbers for validation
  const applicationNumbers = applicationNumberData.map((item) => item.value);

  // Extract estimate numbers for validation
  const estimateNumbers = pendingAllocationData.map((item) => item.value);

  return (
    <>
      {/* Header */}
      <div
        style={{ backgroundColor: "#b23200" }}
        className="relative pt-12 pb-16 md:pt-24"
      >
        <div className="w-full px-4 mx-auto md:px-10">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full px-4 pt-4 lg:w-6/12 xl:w-3/12">
                <CardStats
                  statSubtitle={`Pending Allocation (${pendingAllocationData.length})`}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                  statsData={pendingAllocationData}
                  navigatePath="/schedule2"
                  isLoading={estimatesLoading}
                  hasError={estimatesError}
                  validNumbers={estimateNumbers}
                  onNumberClick={() => handlePendingAllocationClick()} // General click
                  onItemClick={handlePendingAllocationClick} // Individual item click with applicationNo
                  isClickable={true}
                  showItemList={true} // Add this prop to show the list
                />
              </div>
              <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
                <CardStats
                  statSubtitle="Standard Estimates Pending Data Entry (77)"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                  statsData={standardEstimatesData}
                  navigatePath="/estimation/estimate"
                />
              </div>
              <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
                <CardStats
                  statSubtitle={`Application Number (${applicationNumberData.length})`}
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                  statsData={applicationNumberData}
                  navigatePath="/application/new"
                  isLoading={loading}
                  hasError={error}
                  validNumbers={applicationNumbers}
                />
              </div>
              <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
                <CardStats
                  statSubtitle="Confirmed PIVII (New Format) (14)"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                  statsData={confirmedPiviiData}
                  navigatePath="/piv/newPiv"
                />
              </div>

              {/* Add the Commission Card */}
              <div className="w-full px-4 mt-4 lg:w-6/12 xl:w-3/12">
                <CardStats
                  statSubtitle={`Commission (${commissionData.reduce(
                    (sum, item) => sum + item.value,
                    0
                  )})`}
                  statTitle={commissionData
                    .reduce((sum, item) => sum + item.value, 0)
                    .toString()}
                  statIconName="fas fa-balance-scale"
                  statIconColor="bg-lightBlue-500"
                  statsData={commissionData}
                  navigatePath="/admin/commission"
                  isClickable={true}
                  onItemClick={() => history.push("/admin/commission")} // Add this handler
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
