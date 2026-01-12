import skillStore from "../../store/skill.store";
import { useState, useEffect, useCallback, useMemo } from "react";
import useTalentList from "../talent_list/useTalentList";
import useNotificationStore from "../../store/notification.store";

function useGraph(data) {
  const { skillsMap } = skillStore();

  const [skillList, setSkillList] = useState([]);

  const [countData, setCountData] = useState([]);
  const { notification } = useNotificationStore();

  const { talents } = useTalentList(notification?.notifications);

  useEffect(() => {
    getRadarField();
  }, [data, talents, skillsMap]);

  const getRadarField = useCallback(() => {
    if (!data?.technicalSkills || !skillsMap || !talents) return [];

    const skillNames = data.technicalSkills
      .map((id) => skillsMap[id]?.name)
      .filter(Boolean);

    const skillCounts = {};
    talents.forEach((talent) => {
      (talent.skillCategories || []).forEach((skillId) => {
        skillCounts[skillId] = (skillCounts[skillId] || 0) + 1;
      });
    });

    const countData = data.technicalSkills.map(
      (skillId) => skillCounts[skillId] || 0
    );

    setSkillList([...skillNames]);
    setCountData(countData);
    return { skillNames, countData };
  }, [data, skillsMap, talents]);

  const RadarData = useMemo(() => ({
    labels: [...skillList],
    datasets: [
      {
        label: "Number of fields",
        data: countData,
        backgroundColor: "rgba(59,130,246,0.12)",
        borderColor: "rgba(59,130,246,1)",
        pointBackgroundColor: "rgba(59,130,246,1)",
        borderWidth: 2,
      },
    ],
  }), [skillList, countData]);

  const RadarOptions = useMemo(() => {
    const maxCount = Math.max(...countData, 1);
    const stepSize = Math.floor(maxCount / 10) + 1;

    return {
      responsive: true,
      elements: { line: { tension: 0 } },
      scales: {
        r: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: maxCount,
          ticks: { stepSize },
          pointLabels: { font: { size: 12 } },
        },
      },
      plugins: {
        legend: { display: false },
      },
      maintainAspectRatio: false,
    };
  }, [countData]);

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
    talents,
    countData,
  };
}

export default useGraph;
