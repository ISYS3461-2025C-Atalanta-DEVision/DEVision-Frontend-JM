import React from "react";
import { motion } from "framer-motion";
import useTalentList from "./useTalentList";
import TalentCard from "../../components/TalentCard";

function TalentList({ list, onCardClick }) {
  const { talents, loading, msg } = useTalentList(list);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-40">
        <p className="text-neutral6 text-lg">Loading talents...</p>
      </div>
    );
  }


  return (
    <div className="grid w-full grid-cols-3 gap-4">
      {talents.map((talent, index) => (
        <motion.div
          key={talent.id || index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <TalentCard talent={talent} onClick={() => onCardClick?.(talent)} />
        </motion.div>
      ))}
    </div>
  );
}

export default TalentList;
