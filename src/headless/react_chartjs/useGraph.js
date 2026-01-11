function useGraph() {
  //Skill Match Radar Chart Data and Options
  const RadarData = {
    labels: ["React", "SpringBoot", "NextJs", "Colort Theory", "Python"],
    datasets: [
      {
        label: "Number of fields",
        data: [70, 90, 65, 88, 60],
        backgroundColor: "rgba(59,130,246,0.12)",
        borderColor: "rgba(59,130,246,1)",
        pointBackgroundColor: "rgba(59,130,246,1)",
        borderWidth: 2,
      },
    ],
  };

  const RadarOptions = {
    responsive: true,
    elements: { line: { tension: 0 } },
    scales: {
      r: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { stepSize: 20 },
        pointLabels: { font: { size: 12 } },
      },
    },
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  //Education Pie Chart Data and Options
  const PieData = {
    labels: ["MASTER", "PH.D", "BACHELOR", "UNGRADUATE"],
    datasets: [
      {
        label: "Number of fields",
        data: [50, 30, 20, 10],
        backgroundColor: ["#90feda", "#ffe0aa", "#fe9b9b", "#afcdff"],
      },
    ],
  };

  const PieOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "bottom" },
    },
    maintainAspectRatio: false,
  };

  //Employment Type Doughnut Chart Data and Options
  const DouhnutData = {
    labels: ["Full Time", "Part Time", "Internship", "Contract", "Fresher"],
    datasets: [
      {
        label: "Number of fields",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const DouhnutOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "bottom" },
    },
    maintainAspectRatio: false,
  };

  return {
    RadarData,
    PieData,
    RadarOptions,
    PieOptions,
    DouhnutData,
    DouhnutOptions,
  };
}

export default useGraph;
