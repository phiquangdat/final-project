import React, { useEffect, useRef } from "react";
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>;

const Charts = ({ type, transactions, options }) => {
  // Data preparation
  const categoryData = {};
  const monthlyData = {};

  // Populate data dynamically based on transactions
  transactions.forEach((transaction) => {
    // Populate category data (Pie Chart)
    if (!categoryData[transaction.category]) {
      categoryData[transaction.category] = 0;
    }
    categoryData[transaction.category] += Math.abs(transaction.amount);

    // Populate monthly data (Bar and Line Charts)
    const month = new Date(transaction.date).toLocaleString("default", {
      month: "long",
    });
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }
    if (transaction.type === "income") {
      monthlyData[month].income += Number(transaction.amount);
    } else if (transaction.type === "expense") {
      monthlyData[month].expense += Number(Math.abs(transaction.amount));
    }
  });

  // Generate labels and data for each chart type
  let data = {};
  if (type === "pie") {
    data = {
      labels: Object.keys(categoryData),
      datasets: [
        {
          label: "Expenses by Category",
          data: Object.values(categoryData),
          backgroundColor: Object.keys(categoryData).map(
            (_, index) => `hsl(${index * 50}, 70%, 50%)`
          ),
        },
      ],
    };
  } else if (type === "bar") {
    data = {
      labels: Object.keys(monthlyData),
      datasets: [
        {
          label: "Income",
          data: Object.values(monthlyData).map((data) => data.income),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
        {
          label: "Expenses",
          data: Object.values(monthlyData).map((data) => data.expense),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  } else if (type === "line") {
    let acc = 0;
    data = {
      labels: Object.keys(monthlyData),
      datasets: [
        {
          label: "Savings Over Time",
          data: Object.values(monthlyData).map((data) => {
            acc += data.income;
            return acc - Math.abs(data.expense);
          }),
          borderColor: "rgba(54, 162, 235, 1)",
          fill: false,
          tension: 0.4,
        },
      ],
    };
  }

  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type, // Chart type passed as a prop
      data, // Data dynamically generated based on the type
      options, // Chart options passed as a prop
    });

    // Cleanup on unmount
    return () => chart.destroy();
  }, [type, data, options]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Charts;
