import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraphCard } from "./GraphCard";
import useGraph from "./useGraph";
import { Radar, Pie, Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement
);

export default function Graphs({ data }) {
  const navigate = useNavigate();
  const {
    RadarData,
    PieData,
    RadarOptions,
    PieOptions,
    DouhnutData,
    DouhnutOptions,
    talents,
    countData,
  } = useGraph(data);

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      key="create-button"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      <div className="relative">
        {data === null ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-lg" />

            <div className="relative z-20 text-center">
              <p className="text-2xl font-medium text-primary">
                Create your first Talent Profile to use view statistic.
              </p>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-primary pb-2">
              Statistic Base On Your Criteria
            </h1>
          </>
        )}

        <div className="grid h-full grid-cols-2 gap-4 auto-rows-fr">
          <GraphCard onClick={() => navigate("/search_applicants/talents")}>
            <div className="w-full flex flex-col justify-center items-start gap-2 p-10">
              <h1 className="text-8xl font-bold text-primary">
                {data?.matchCount}
              </h1>
              <p className="text-3xl text-neutral8">Applicants found</p>

              <div className="text-blacktxt text-lg font-medium flex items-center gap-2 cursor-pointer mt-12">
                View all <i className="ri-arrow-right-line"></i>
              </div>
            </div>
          </GraphCard>

          <GraphCard title="Skill Match Strength">
            <Radar data={RadarData} options={RadarOptions} />
          </GraphCard>

          {/* <GraphCard title="Employment Type">
            <Doughnut data={DouhnutData} options={DouhnutOptions} />
          </GraphCard>

          <GraphCard title="Education Distribution">
            <Pie data={PieData} options={PieOptions} />
          </GraphCard> */}
        </div>
      </div>
    </motion.div>
  );
}
