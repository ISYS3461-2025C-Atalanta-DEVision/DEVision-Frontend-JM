import React, { useEffect } from "react";
import { QUICK_STATS_CARD_CONFIG } from "../static/QuickStats";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function QuickStatsCard({ item, key }) {
  const config = QUICK_STATS_CARD_CONFIG[item.key];
  const navigate = useNavigate();

  if (!config) return null;

  const displayValue = item.value !== undefined ? item.value : null;

  return (
    <div
      className="bg-bgComponent rounded-lg shadow p-6 hover:shadow-md transition-shadow hover:cursor-pointer"
      onClick={() => navigate(config.to)}
    >
      <div className="flex items-center justify-between mb-4">
        {config.icon}
        <div className="text-2xl font-bold text-textBlack">
          {displayValue !== null ? displayValue : ""}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-textBlack">{config.title}</h3>
      <p className="text-sm text-neutral6 mb-4">{config.description}</p>
      <Link className="text-primary hover:text-primary2 text-sm font-medium">
        {config.linkText} →
      </Link>
    </div>
  );
}
