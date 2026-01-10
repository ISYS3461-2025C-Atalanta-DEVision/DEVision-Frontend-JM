import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraphCard } from "./GraphCard";
import useGraph from "./useGraph";
import { Radar, Pie, Doughnut } from "react-chartjs-2";
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

export default function Graphs() {
  const {
    RadarData,
    PieData,
    RadarOptions,
    PieOptions,
    DouhnutData,
    DouhnutOptions,
  } = useGraph();

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="create-button"
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full"
      >
        <div className="h-full grid grid-cols-2 gap-4 auto-rows-fr">
          <GraphCard>
            <div className="h-full w-full flex flex-col justify-center items-start gap-2 p-10">
              <h1 className="text-8xl font-bold text-primary">1,245</h1>
              <p className="text-3xl text-neutral8">Applicants found</p>

              <div className="text-blacktxt text-lg font-medium flex items-center gap-2 cursor-pointer mt-12">
                View all <i class="ri-arrow-right-line"></i>
              </div>
            </div>
          </GraphCard>

          <GraphCard title="Skill Match Strength">
            <Radar data={RadarData} options={RadarOptions} />
          </GraphCard>

          <GraphCard title="Employment Type">
            <Doughnut data={DouhnutData} options={DouhnutOptions} />
          </GraphCard>

          <GraphCard title="Education Distribution">
            <Pie data={PieData} options={PieOptions} />
          </GraphCard>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
