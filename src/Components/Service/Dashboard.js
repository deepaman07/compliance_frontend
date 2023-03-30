import React, { useState, useEffect, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import userContext from "../../Context/userContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const context = useContext(userContext);
  const { user } = context;
  const [Details, setDetails] = useState([]);
  const [x_axis, setX_axis] = useState([]);
  const currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  if (currentMonth <= 3) currentYear = currentYear - 1;
  useEffect(() => {
    if (Details.length === 0) {
      calculateDetails();
    }
    var records = [];
    Object.keys(Details).forEach((row) => {
      if (Details[row].Month >= 4) records.push(Details[row].TotalRecords);
    });
    Object.keys(Details).forEach((row) => {
      if (Details[row].Month < 4) records.push(Details[row].TotalRecords);
    });
    setChartData({
      labels: x_axis,
      datasets: [
        {
          label: "Leads Generated",
          data: records,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Details, chartData, x_axis]);
  var records = Array.from({ length: 12 }, () => 0); // Initialize array with 12 elements and set all values to zero
  const Token = JSON.parse(user).token.Token;
  const calculateDetails = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        FINCode: JSON.parse(localStorage.getItem("UserDetails")).FINCode,
      }),
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
    };
    var result;

    if (
      JSON.parse(localStorage.getItem("UserDetails")).FINCode !==
      process.env.REACT_APP_ADMIN_USERNAME
    ) {
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST_SERVER}/product/dashboard`,
        requestOptions
      );
      result = await response.json();
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST_SERVER}/product/dashboardall`,
        requestOptions
      );
      result = await response.json();
    }
    // result = [
    //   {
    //     TotalRecords: "12",
    //     Month: "Mar-2023",
    //   },
    //   {
    //     TotalRecords: "123",
    //     Month: "Jan-2023",
    //   },
    //   {
    //     TotalRecords: "52",
    //     Month: "Apr-2023",
    //   },
    //   {
    //     TotalRecords: "2",
    //     Month: "Sept-2023",
    //   },
    //   {
    //     TotalRecords: "121",
    //     Month: "Nov-2023",
    //   },
    //   {
    //     TotalRecords: "80",
    //     Month: "Jun-2023",
    //   },
    // ];
    const MonthDict = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };
    var x_labels = [];
    var month_labels = {};
    Object.entries(result).forEach((row) => {
      if (row[1].Month !== 1 && row[1].Month !== 2 && row[1].Month !== 3) {
        month_labels[MonthDict[row[1].Month.split("-")[0]]] = row[1].Month;
        row[1].Month = MonthDict[row[1].Month.split("-")[0]];
      }
    });
    console.log(result);
    Object.entries(result).forEach((row) => {
      x_labels.push(month_labels[row[1].Month]);
    });
    console.log(x_labels);
    setX_axis(x_labels);
    setDetails(result);
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        type: "category",
        labels: x_axis,
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };
  const [chartData, setChartData] = useState({
    labels: x_axis,
    datasets: [
      {
        label: "LeadRequests",
        data: records,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });
  return (
    <div className="card">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Dashboard;
