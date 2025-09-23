import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register only once
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartCard = ({ openJobs, revisedJobs, closedJobs }) => {
  // Dummy data for fallback
  const dummyData = {
    openJobs: 45,
    revisedJobs: 23,
    closedJobs: 67
  };

  // Check if data is available and valid
  const isDataValid = (
    openJobs !== undefined && 
    revisedJobs !== undefined && 
    closedJobs !== undefined &&
    !isNaN(openJobs) && 
    !isNaN(revisedJobs) && 
    !isNaN(closedJobs)
  );

  // Use dummy data if real data is not available or invalid
  const actualOpenJobs = isDataValid ? openJobs : dummyData.openJobs;
  const actualRevisedJobs = isDataValid ? revisedJobs : dummyData.revisedJobs;
  const actualClosedJobs = isDataValid ? closedJobs : dummyData.closedJobs;

  const data = {
    labels: ['Open Jobs', 'Revised Jobs', 'Closed Jobs'],
    datasets: [
      {
        data: [actualOpenJobs, actualRevisedJobs, actualClosedJobs],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        borderWidth: 1,
        cutout: '60%'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      width: '400px',
      margin: '20px auto',
      textAlign: 'center',
      backgroundColor: 'white'
    }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartCard;