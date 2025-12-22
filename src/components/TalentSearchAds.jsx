import React from "react";
import TalentSearch from "../assets/photo/talent_search_ads.png";
import {useNavigate} from "react-router-dom";
import Button from "./Button";

export default function TalentSearchAds({ price }) {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden rounded-3xl bg-neutral-50">
      <div
        className="absolute inset-0 pointer-events-none
    bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.35),transparent_60%)]"
      ></div>
      <div
        className="absolute inset-0 pointer-events-none
    bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.25),transparent_60%)]"
      ></div>
      <div className="w-full flex flex-row justify-start items-start gap-5 p-5">
        <div className="w-1/3 flex flex-col justify-start items-start">
          <h1 className="text-2xl text-neutral8 font-bold mb-4">
            Premium Feature
          </h1>
          <h1 className="text-5xl text-primary font-bold underlin">
            Talent Search
          </h1>
          <img
            src={TalentSearch}
            alt="Talent Search Ads"
            className=" animate-float drop-shadow-[0_20px_40px_rgba(99,102,241,0.35)]"
          />
        </div>

        <div className="w-2/3 flex flex-col justify-start items-start ">
          <h1 className="text-4xl font-semibold text-neutral8">
            Never miss <span className="text-primary">top talent</span>
          </h1>
          <h1 className="text-4xl font-semibold text-neutral8 mb-6">
            Get instant candidate alerts on DEVision
          </h1>

          <div className="flex flex-row justify-between items-end w-full mb-4">
            <ul className="space-y-2">
              <li className="flex items-start gap-3 font-medium">
                <i className="ri-notification-3-line text-primary text-lg"></i>
                <span>Instant alerts for new matching candidates</span>
              </li>

              <li className="flex items-start gap-3 font-medium">
                <i className="ri-flashlight-line text-primary text-lg"></i>
                <span>Real-time talent matching</span>
              </li>

              <li className="flex items-start gap-3 font-medium">
                <i className="ri-filter-3-line text-primary text-lg"></i>
                <span>Filter by skills, salary, location & education</span>
              </li>

              <li className="flex items-start gap-3 font-medium">
                <i className="ri-price-tag-3-line text-primary text-lg"></i>
                <span>Advanced tech tags</span>
              </li>

              <li className="flex items-start gap-3 font-medium">
                <i className="ri-briefcase-4-line text-primary text-lg"></i>
                <span>Flexible employment types in one search</span>
              </li>
            </ul>

            <h1 className="self-end text-3xl font-bold text-neutral8">
              Only <span className="text-primary">${price}</span> per month
            </h1>
          </div>

          <Button className="w-full z-999" variant="primary" onClick={() => navigate("/payment")}>
            Get it now
          </Button>
        </div>
      </div>
    </div>
  );
}
