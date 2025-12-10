import { React, useState } from "react";

import Button from "../../components/Button";
import { useNavbar } from "./useNavBar";
import SkillTag from "../../components/SkillTag";
import useAuthLoginStore from "../../store/auth.login.store";

export default function NavBar({ activepage }) {
  const { user } = useAuthLoginStore();
  const { handleLogout, companyName, isActive, handleNavigate, loading } =
    useNavbar(activepage, user);

  return (
    <nav className="bg-bgComponent shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">DEVision</h1>
            <span className="ml-2 text-sm text-neutral6">Job Manager</span>
          </div>

          <nav className="flex flex-1 items-center justify-center gap-12 text-xl font-medium text-gray-800">
            {/* Dashboard */}
            <a
              className={`cursor-pointer transition-colors 
              ${
                isActive("dashboard")
                  ? "text-primary font-semibold"
                  : "hover:text-primary"
              }`}
              onClick={() => handleNavigate("/dashboard")}
            >
              Dashboard
            </a>

            {/* Jobs */}
            <a
              className={`cursor-pointer transition-colors 
              ${
                isActive("jobs")
                  ? "text-primary font-semibold"
                  : "hover:text-primary"
              }`}
              onClick={() => handleNavigate("/jobpost")}
            >
              Recruitment
            </a>

            {/* Event */}
            <a
              className={`cursor-pointer transition-colors 
              ${
                isActive("event")
                  ? "text-primary font-semibold"
                  : "hover:text-primary"
              }`}
            >
              Events
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {loading ? (
              <span className="text-neutral7">Loading...</span>
            ) : (
              <span className="text-neutral7">{companyName}</span>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
