import { React, useState } from "react";

import Button from "../../components/Button";
import { useNavbar } from "./useNavBar";
import SkillTag from "../../components/SkillTag";

import useProfileStore from "../../store/profile.store";

export default function NavBar({ activepage }) {
  const { profile } = useProfileStore();

  const { handleLogout, isActive, handleNavigate, loading } =
    useNavbar(activepage);

  return (
    <nav className="sticky top-0 z-50 bg-bgComponent shadow-sm" style={{ backgroundColor: "#98A9BB" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary" style={{ color: "#11254A" }}>DEVision</h1>
            <span className="ml-2 text-sm text-black">Job Manager</span>
          </div>

          <nav className="flex flex-1 items-center justify-center gap-12 text-xl font-medium text-white">
            {/* Dashboard */}
            <a
              className={`cursor-pointer transition-colors 
              ${isActive("dashboard")
                  ? "text-[#11254A] font-semibold"
                  : "hover:text-[#11254A]"
                }`}
              onClick={() => handleNavigate("/dashboard")}
            >
              Dashboard
            </a>

            {/* Jobs */}
            <a
              className={`cursor-pointer transition-colors 
              ${isActive("jobs")
                  ? "text-[#11254A] font-semibold"
                  : "hover:text-[#11254A]"
                }`}
              onClick={() => handleNavigate("/jobpost")}
            >
              Recruitment
            </a>

            {/* Event */}
            <a
              className={`cursor-pointer transition-colors 
              ${isActive("event")
                  ? "text-[#11254A] font-semibold"
                  : "hover:text-[#11254A]"
                }`}
              onClick={() => handleNavigate("/event")}

            >
              Events
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {loading ? (
              <span className="text-neutral7">Loading...</span>
            ) : (
              <span className="text-black">{profile?.companyName}</span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="
                        bg-transparent
                        text-[#11254A]
                        border border-[#11254A]
                        hover:bg-[#11254A]
                        hover:text-white
                        hover:border-[#11254A]
                        transition-colors
                      ">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
