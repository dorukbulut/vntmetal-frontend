"use client";
import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {
  datasets: [
    {
      label: "A dataset",
      data: Array.from({ length: 5 }, () => ({
        x: [1, 2, 3, 4, 5],
        y: [6, 7, 8, , 9, 10],
      })),
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

export default function App() {
  return <Scatter options={options} width={150} height={300} data={data} />;
}
