import React, { useEffect } from "react";
import { QUICK_STATS_CARD_CONFIG } from "../ui_config/QuickStats";


export default function QuickStatsCard({ item, key }) {
  const config = QUICK_STATS_CARD_CONFIG[item.key];

  if (!config) return null;

  const displayValue = item.value;

  return (
    <div className="bg-bgComponent rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        {config.icon}
        <div className="text-2xl font-bold text-textBlack">
          {displayValue}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-textBlack">{config.title}</h3>
      <p className="text-sm text-neutral6 mb-4">{config.description}</p>
      <button className="text-primary hover:text-primary2 text-sm font-medium">
        {config.linkText} →
      </button>
    </div>
  );
}
